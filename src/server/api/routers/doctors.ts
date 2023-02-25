import Papa from 'papaparse';

import { DATA_URL } from '@/lib/constants';
import { drListSchema } from '@/lib/types/doctors';
import { instListSchema } from '@/lib/types/institutions';

import { createTRPCRouter, publicProcedure } from '../trpc';

const { DOCTORS_CSV_URL, INSTITUTIONS_CSV_URL } = DATA_URL;

export const doctorsRouter = createTRPCRouter({
  get: publicProcedure.query(async () => {
    const dr = fetch(DOCTORS_CSV_URL);
    const inst = fetch(INSTITUTIONS_CSV_URL);

    const [doctorsResponse, institutionsResponse] = await Promise.all([
      dr,
      inst,
    ]);

    if (!doctorsResponse.ok || !institutionsResponse.ok) {
      return null;
    }

    const doctorsResult = await doctorsResponse.text();
    const institutionsResult = await institutionsResponse.text();

    const doctors = Papa.parse(doctorsResult, {
      header: true,
      skipEmptyLines: true,
    });
    const institutions = Papa.parse(institutionsResult, {
      header: true,
      skipEmptyLines: true,
    });

    const doctorsValidated = drListSchema.safeParse(doctors.data);
    const institutionsValidated = instListSchema.safeParse(institutions.data);

    return { doctors: doctorsValidated, institutions: institutionsValidated };
  }),
});
