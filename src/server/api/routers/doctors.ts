import Papa from 'papaparse';
import { z } from 'zod';

import { DATA_URL } from '@/lib/constants';
import type { DrListSchema, DrPageType } from '@/lib/types/doctors';
import { drListSchema, drPageType } from '@/lib/types/doctors';
import { instListSchema } from '@/lib/types/institutions';

import { createTRPCRouter, publicProcedure } from '../trpc';

const { DOCTORS_CSV_URL, INSTITUTIONS_CSV_URL } = DATA_URL;

const filterDoctors = (
  doctors: DrListSchema,
  { type }: { type: DrPageType }
) => {
  return doctors.filter(doctor => drPageType.parse(doctor.type) === type);
};

export const doctorsRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ type: drPageType }))
    .query(async ({ input }) => {
      const dr = fetch(DOCTORS_CSV_URL);
      const inst = fetch(INSTITUTIONS_CSV_URL);

      const [doctorsResponse, institutionsResponse] = await Promise.all([
        dr,
        inst,
      ]);

      if (!doctorsResponse.ok || !institutionsResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const doctorsResult = await doctorsResponse.text();
      const institutionsResult = await institutionsResponse.text();

      const doctorsParsedFromCsv = Papa.parse(doctorsResult, {
        header: true,
        skipEmptyLines: true,
      });
      const institutionsParsedFromCsv = Papa.parse(institutionsResult, {
        header: true,
        skipEmptyLines: true,
      });

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

      const filteredDoctors = filterDoctors(doctorsValidated.data, {
        type: input.type,
      });

      const instIds = new Set(filteredDoctors.map(doctor => doctor.idInst));

      const institutionsFiltered = institutionsValidated.data
        .filter(institution => instIds.has(institution.id))
        .reduce(
          (acc, institution) => {
            const { id, ...rest } = institution;

            return { ...acc, [id]: rest };
          },
          { noId: [] }
        );

      return {
        doctors: filteredDoctors,
        institutions: institutionsFiltered,
        meta: {
          doctorsCount: filteredDoctors.length,
          institutionsCount: Object.keys(institutionsFiltered).length,
        },
      };
    }),
});
