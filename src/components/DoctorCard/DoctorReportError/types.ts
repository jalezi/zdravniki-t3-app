import type { CustomTypeOptions } from 'i18next';
import isMobilePhone from 'validator/lib/isMobilePhone';
import { z } from 'zod';

import type { Doctor } from '@/server/api/routers/doctors';

export type ReportErrorTranslations =
  CustomTypeOptions['resources']['dr-report-error'];

export const ADDRESS_LENGTH_LIMIT = 255 as const;
export const NOTE_LENGTH_LIMIT = 255 as const;

const websiteSchema = z
  .string()
  .refine(value => value.split(' ').length === 1 && value.split('.').length > 1)
  .or(z.literal(''))
  .or(z.string().url());

const phoneSchema = z
  .string()
  .refine(value =>
    isMobilePhone(
      value.replaceAll(' ', '').replaceAll('(', '').replaceAll(')', ''),
      'sl-SI'
    )
  );
export const formDataSchema = z.object({
  address: z.string().max(ADDRESS_LENGTH_LIMIT),
  websites: z
    .array(
      z.object({
        website: websiteSchema,
      })
    )
    .nonempty(),
  phones: z
    .array(
      z.object({
        phone: phoneSchema,
      })
    )
    .nonempty(),
  email: z.string().email().or(z.literal('')),
  orderform: z.string().email().or(z.literal('')).or(websiteSchema),
  accepts: z.enum(['y', 'n']),
  note: z.string().max(NOTE_LENGTH_LIMIT),
});

export type FormData = z.infer<typeof formDataSchema>;

export type DoctorReportErrorDataProps = {
  data: {
    fromUser: {
      address: Doctor['location']['address']['fullAddress'];
      accepts: Doctor['accepts'];
      email: Doctor['email'];
      note: Doctor['override']['note'];
      phones: Doctor['phones'];
      orderform: Doctor['orderform'];
      websites: Doctor['websites'];
    };
    fixed: {
      availability: Doctor['availability'];
      name: string;
      url: string;
      type: Doctor['type'];
      instId: string; // Doctor["institution"]["id"] does not work (TS complains)
      provider: string;
    };
  };
};

export type DoctorReportErrorProps = DoctorReportErrorDataProps & {
  onEditDone: () => void;
};
