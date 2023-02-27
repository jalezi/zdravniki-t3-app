import Papa from 'papaparse';
import { z } from 'zod';

import { DATA_URL } from '@/lib/constants';
import type { DrListSchema } from '@/lib/types/doctors';
import { drListSchema } from '@/lib/types/doctors';
import type { DrTypePage } from '@/lib/types/dr-type-page';
import { drTypePageSchema } from '@/lib/types/dr-type-page';
import type { InstTransformed } from '@/lib/types/institutions';
import { instListSchema } from '@/lib/types/institutions';
import type { RouterOutputs } from '@/lib/utils/api';

import { createTRPCRouter, publicProcedure } from '../trpc';

const { DOCTORS_CSV_URL, INSTITUTIONS_CSV_URL } = DATA_URL;

const filterDoctors = (
  doctors: DrListSchema,
  { type }: { type: DrTypePage }
) => {
  return doctors.filter(doctor => type === doctor.typePage);
};

export const doctorsRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      z.object({
        type: drTypePageSchema,
      })
    )
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

      const institutionsFiltered: Record<string, InstTransformed> =
        institutionsValidated.data
          .filter(institution => instIds.has(institution.id))
          .reduce((acc, institution) => {
            const { id, ...rest } = institution;

            return { ...acc, [id]: rest };
          }, {});

      const doctors = filteredDoctors.map(doctor => {
        const { idInst } = doctor;
        return {
          ...doctor,
          provider: institutionsFiltered[`${idInst}`]?.name ?? '',
          institution: institutionsFiltered[`${idInst}`],
        };
      });

      return {
        doctors,
        meta: {
          length: doctors.length,
        },
      };
    }),
});

export type Doctor = RouterOutputs['doctors']['get']['doctors'][number];
