import { z } from 'zod';

import type { DrListSchema } from '@/lib/types/doctors';
import { drListSchema } from '@/lib/types/doctors';
import type { DrTypePage } from '@/lib/types/dr-type-page';
import { drTypePageSchema } from '@/lib/types/dr-type-page';
import type { InstTransformed } from '@/lib/types/institutions';
import { instListSchema } from '@/lib/types/institutions';
import type { RouterOutputs } from '@/lib/utils/api';
import { fetchDrAndInstDataAndParse } from '@/lib/utils/fetch-and-parse';

import { createTRPCRouter, publicProcedure } from '../trpc';

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

      const instIds = new Set(doctorsFiltered.map(doctor => doctor.idInst));

      const institutionsFiltered: Record<string, InstTransformed> =
        institutionsValidated.data
          .filter(institution => instIds.has(institution.id))
          .reduce((acc, institution) => {
            const { id, ...rest } = institution;

            return { ...acc, [id]: rest };
          }, {});

      const doctors = doctorsFiltered.map(doctor => {
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
