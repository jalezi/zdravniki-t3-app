import { z } from 'zod';

import { env } from '@/env/server.mjs';
import type { DrListSchema } from '@/lib/types/doctors';
import { drCSVTypeSchema, drListSchema } from '@/lib/types/doctors';
import type { PageDrType } from '@/lib/types/dr-type-page';
import { pageDrTypeSchema } from '@/lib/types/dr-type-page';
import { instListSchema } from '@/lib/types/institutions';
import type { RouterOutputs } from '@/lib/utils/api';
import {
  createDoctor,
  fetchDrAndInstDataAndParse,
} from '@/lib/utils/fetch-and-parse';

import { createTRPCRouter, publicProcedure } from '../trpc';

const {
  GOOGLE_FORM_ID,
  GOOGLE_FORM_INPUT_ACCEPTS,
  GOOGLE_FORM_INPUT_ADDRESS,
  GOOGLE_FORM_INPUT_AVAILABILITY,
  GOOGLE_FORM_INPUT_EMAIL,
  GOOGLE_FORM_INPUT_INSTID,
  GOOGLE_FORM_INPUT_NAME,
  GOOGLE_FORM_INPUT_NOTE,
  GOOGLE_FORM_INPUT_ORDERFORM,
  GOOGLE_FORM_INPUT_PHONE,
  GOOGLE_FORM_INPUT_PROVIDER,
  GOOGLE_FORM_INPUT_TYPE,
  GOOGLE_FORM_INPUT_URL,
  GOOGLE_FORM_INPUT_WEBSITE,
} = env;

const GOOGLE_FORM_INPUTS = {
  accepts: GOOGLE_FORM_INPUT_ACCEPTS,
  address: GOOGLE_FORM_INPUT_ADDRESS,
  availability: GOOGLE_FORM_INPUT_AVAILABILITY,
  email: GOOGLE_FORM_INPUT_EMAIL,
  instId: GOOGLE_FORM_INPUT_INSTID,
  name: GOOGLE_FORM_INPUT_NAME,
  note: GOOGLE_FORM_INPUT_NOTE,
  orderform: GOOGLE_FORM_INPUT_ORDERFORM,
  phone: GOOGLE_FORM_INPUT_PHONE,
  provider: GOOGLE_FORM_INPUT_PROVIDER,
  type: GOOGLE_FORM_INPUT_TYPE,
  url: GOOGLE_FORM_INPUT_URL,
  website: GOOGLE_FORM_INPUT_WEBSITE,
} as const;

const FORM_URL = `https://docs.google.com/forms/d/${GOOGLE_FORM_ID}/formResponse`;

const sendReportInputSchema = z.object({
  fromUser: z.object({
    accepts: z.enum(['y', 'n']).nullable(),
    address: z.string().nullable(),
    email: z.string().nullable(),
    note: z.string().nullable(),
    phone: z.string().nullable(),
    orderform: z.string().nullable(),
    website: z.string().nullable(),
  }),
  fixed: z.object({
    name: z.string(),
    url: z.string(),
    type: drCSVTypeSchema,
    instId: z.string(),
    provider: z.string(),
    availability: z.number(),
  }),
});

export type SendReportInput = z.infer<typeof sendReportInputSchema>;

export type SendReportInputFromUser = SendReportInput['fromUser'];
export type SendReportInputFixed = SendReportInput['fixed'];
export type SendReportInputUserNotNull = {
  [key in keyof SendReportInputFromUser]: Exclude<
    SendReportInputFromUser[key],
    null
  >;
};

const filterDoctorsByTypePage = (
  doctors: DrListSchema,
  { type }: { type: PageDrType }
) => {
  return doctors.filter(doctor => type === doctor.typePage);
};

export const doctorsRouter = createTRPCRouter({
  getByTypePage: publicProcedure
    .input(
      z.object({
        type: pageDrTypeSchema,
      })
    )
    .query(async ({ input }) => {
      const { doctorsParsedFromCsv, institutionsParsedFromCsv } =
        await fetchDrAndInstDataAndParse();

      const doctorsValidated = drListSchema.safeParse(
        doctorsParsedFromCsv.data
      );
      if (!doctorsValidated.success) {
        console.error(doctorsValidated.error);
        throw new Error('Doctors data is not valid');
      }
      const institutionsValidated = instListSchema.safeParse(
        institutionsParsedFromCsv.data
      );
      if (!institutionsValidated.success) {
        console.error(institutionsValidated.error);
        throw new Error('Institutions data is not valid');
      }

      const doctorsFiltered = filterDoctorsByTypePage(doctorsValidated.data, {
        type: input.type,
      });

      const doctors = doctorsFiltered.map(
        createDoctor(institutionsParsedFromCsv.data)
      );

      return {
        doctors,
        meta: {
          length: doctors.length,
        },
      };
    }),
  sendReport: publicProcedure
    .input(sendReportInputSchema)
    .mutation(async ({ input }) => {
      const { fromUser, fixed } = input;
      const reportData = { ...fromUser, ...fixed } as const;

      const formData = new FormData();

      Object.entries(reportData).forEach(([key, value]) => {
        return formData.append(
          `entry.${
            GOOGLE_FORM_INPUTS[`${key as keyof typeof GOOGLE_FORM_INPUTS}`]
          }`,
          value?.toString() ?? ''
        );
      });

      const FORM_FETCH_OPTIONS = {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'unsafe-url',
        body: formData,
      } as const;

      const response = await fetch(FORM_URL, FORM_FETCH_OPTIONS);
      if (response.ok) {
        return { success: true };
      }

      console.error(response);
      throw new Error(
        `Failed to send report to Google Form with status: ${response.status} ${response.statusText}`,
        { cause: response }
      );
    }),
});

export type Doctor =
  RouterOutputs['doctors']['getByTypePage']['doctors'][number];
