import { z } from 'zod';

import type { DrListSchema } from '@/lib/types/doctors';
import { drListSchema } from '@/lib/types/doctors';
import type { PageDrType } from '@/lib/types/dr-type-page';
import { pageDrTypeSchema } from '@/lib/types/dr-type-page';
import { instListSchema } from '@/lib/types/institutions';
import type { RouterOutputs } from '@/lib/utils/api';
import {
  fetchDrAndInstDataAndParse,
  getDrLocation,
} from '@/lib/utils/fetch-and-parse';

import { createTRPCRouter, publicProcedure } from '../trpc';

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

      const doctors = doctorsFiltered.map(doctor => {
        const {
          location,
          phone: drPhone,
          website: drWebsite,
          ...rest
        } = doctor;

        const _institution = institutionsParsedFromCsv.data.find(
          institution => institution.id_inst === doctor.idInst
        );

        const institution = instListSchema.parse([_institution])[0];
        const institutionLocation = institution?.location;

        const {
          address,
          geoLocation,
          meta: drLocationMeta,
        } = getDrLocation(location, institutionLocation);

        const phone = (drPhone || institution?.phone) ?? null;
        const website = (drWebsite || institution?.website) ?? null;

        const phones = [...(phone?.split(',') ?? [])].map(val => val.trim());
        const websites = [...(website?.split(',') ?? [])].map(val =>
          val.trim()
        );

        const drMeta = { ...drLocationMeta, hasInst: !!institution } as const;

        return {
          ...rest,
          phones,
          website,
          websites,
          provider: institution?.name ?? null,
          institution: institution ?? null,
          location: {
            address,
            geoLocation,
          },
          meta: drMeta,
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
