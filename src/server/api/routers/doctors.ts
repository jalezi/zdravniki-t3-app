import { z } from 'zod';

import type { DrListSchema } from '@/lib/types/doctors';
import { drListSchema } from '@/lib/types/doctors';
import type { PageDrType } from '@/lib/types/dr-type-page';
import { pageDrTypeSchema } from '@/lib/types/dr-type-page';
import { instListSchema } from '@/lib/types/institutions';
import type { RouterOutputs } from '@/lib/utils/api';
import { fakePromise } from '@/lib/utils/common';
import {
  createDoctor,
  fetchDrAndInstDataAndParse,
} from '@/lib/utils/fetch-and-parse';

import { createTRPCRouter, publicProcedure } from '../trpc';

const sendReportInputSchema = z.object({
  accepts: z.enum(['y', 'n']),
  address: z.string(),
  availability: z.string(),
  email: z.string(),
  note: z.string(),
  phone: z.string(),
  orderform: z.string(),
  website: z.string(),
});

export type SendReportInput = z.infer<typeof sendReportInputSchema>;

const filterDoctors = (
  doctors: DrListSchema,
  { type }: { type: PageDrType }
) => {
  return doctors.filter(doctor => type === doctor.typePage);
};

export const doctorsRouter = createTRPCRouter({
  get: publicProcedure
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

      const doctorsFiltered = filterDoctors(doctorsValidated.data, {
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
  // add { input } to the mutation function
  sendReport: publicProcedure
    .input(sendReportInputSchema)
    .mutation(async () => {
      return fakePromise();
    }),
});

export type Doctor = RouterOutputs['doctors']['get']['doctors'][number];
