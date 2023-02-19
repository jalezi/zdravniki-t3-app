import { z } from 'zod';

import { DATA_URL } from '@/lib/constants';

import { createTRPCRouter, publicProcedure } from '../trpc';

const timestampSchema = z.number().int().positive();
export type Timestamp = z.infer<typeof timestampSchema>;

const allTimestampsSchema = z.object({
  doctors: timestampSchema,
  institutions: timestampSchema,
});

export type AllTimestamps = z.infer<typeof allTimestampsSchema>;

export type TimestampResult<T> = T extends 'all' ? AllTimestamps : Timestamp;

export const timestampRouter = createTRPCRouter({
  all: publicProcedure.query(async () => {
    const [doctorsResponse, institutionsResponse] = await Promise.allSettled([
      fetch(DATA_URL.DOCTORS_TS_URL),
      fetch(DATA_URL.INSTITUTIONS_TS_URL),
    ]);

    if (
      doctorsResponse.status === 'rejected' ||
      institutionsResponse.status === 'rejected'
    ) {
      doctorsResponse.status === 'rejected' &&
        console.error(doctorsResponse.reason);
      institutionsResponse.status === 'rejected' &&
        console.error(institutionsResponse.reason);
      return timestampSchema.safeParse(-1);
    }

    const doctorsResult = (await doctorsResponse.value.json()) as number;
    const institutionsResult =
      (await institutionsResponse.value.json()) as number;

    return allTimestampsSchema.safeParse({
      doctors: doctorsResult,
      institutions: institutionsResult,
    });
  }),
  doctors: publicProcedure.query(async () => {
    const response = await fetch(DATA_URL.DOCTORS_TS_URL);
    if (!response.ok) {
      console.error(response.statusText);
      return timestampSchema.safeParse(-1);
    }
    const result = (await response.json()) as number;
    return timestampSchema.safeParse(result);
  }),
  institutions: publicProcedure.query(async () => {
    const response = await fetch(DATA_URL.INSTITUTIONS_TS_URL);
    if (!response.ok) {
      console.error(response.statusText);
      return timestampSchema.safeParse(-1);
    }
    const result = (await response.json()) as number;
    return timestampSchema.safeParse(result);
  }),
});
