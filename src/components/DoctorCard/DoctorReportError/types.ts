import type { CustomTypeOptions } from 'i18next';
import { z } from 'zod';

import type { Doctor } from '@/server/api/routers/doctors';

export type ReportErrorTranslations =
  CustomTypeOptions['resources']['dr-report-error'];

export const ADDRESS_LENGTH_LIMIT = 255;
export const NOTE_LENGTH_LIMIT = 255;
export const formDataSchema = z.object({
  address: z.string().max(ADDRESS_LENGTH_LIMIT),
  websites: z
    .array(
      z.object({
        website: z.string(),
      })
    )
    .nonempty(),
  phones: z
    .array(
      z.object({
        phone: z.string(),
      })
    )
    .nonempty(),
  email: z.string(),
  orderform: z.string(),
  accepts: z.enum(['y', 'n']),
  availability: z.string(),
  note: z.string().max(NOTE_LENGTH_LIMIT),
});

export type FormData = z.infer<typeof formDataSchema>;

export type DoctorReportErrorDataProps = {
  data: {
    address: Doctor['location']['address']['fullAddress'];
    accepts: Doctor['accepts'];
    availability: Doctor['availability'];
    email: Doctor['email'];
    note: Doctor['override']['note'];
    phones: Doctor['phones'];
    orderform: Doctor['orderform'];
    websites: Doctor['websites'];
  };
};

export type DoctorReportErrorProps = DoctorReportErrorDataProps & {
  onEditDone: () => void;
};
