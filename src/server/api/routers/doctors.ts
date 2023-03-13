import { z } from 'zod';

import { SL_CENTER } from '@/lib/constants/map';
import type { DrAddress, DrListSchema, DrLocation } from '@/lib/types/doctors';
import { drListSchema } from '@/lib/types/doctors';
import type { PageDrType } from '@/lib/types/dr-type-page';
import { pageDrTypeSchema } from '@/lib/types/dr-type-page';
import type {
  InstAddress,
  InstLocation,
  InstTransformed,
} from '@/lib/types/institutions';
import { instListSchema } from '@/lib/types/institutions';
import type { LatLngLiteral } from '@/lib/types/Map';
import type { RouterOutputs } from '@/lib/utils/api';
import { fetchDrAndInstDataAndParse } from '@/lib/utils/fetch-and-parse';

import { createTRPCRouter, publicProcedure } from '../trpc';

const filterDoctors = (
  doctors: DrListSchema,
  { type }: { type: PageDrType }
) => {
  return doctors.filter(doctor => type === doctor.typePage);
};

type Source = 'dr' | 'inst' | 'dummy';
type Address = NonNullable<DrAddress & InstAddress>;

const DummyAddress = {
  street: '',
  city: '',
  fullAddress: '',
  municipality: '',
  municipalityPart: '',
  postalCode: 0,
  postalName: '',
  searchAddress: '',
  post: '',
} satisfies Address;

const getDoctorsAddress = (
  drAddress: DrAddress,
  instAddress: InstAddress | undefined
): { address: Address; source: Source } => {
  if (drAddress) {
    return { address: drAddress, source: 'dr' };
  }
  if (instAddress) {
    return { address: instAddress, source: 'inst' };
  }
  return { address: DummyAddress, source: 'dummy' };
};

const DummyGeoLocation = {
  lat: SL_CENTER[0],
  lng: SL_CENTER[1],
} satisfies LatLngLiteral;

const getDoctorsGeoLocation = (
  drGeoLocation: LatLngLiteral | null,
  instGeoLocation: LatLngLiteral | null | undefined
): {
  geoLocation: LatLngLiteral;
  source: Source;
} => {
  if (drGeoLocation) {
    return { geoLocation: drGeoLocation, source: 'dr' };
  }
  if (instGeoLocation) {
    return { geoLocation: instGeoLocation, source: 'inst' };
  }
  return {
    geoLocation: DummyGeoLocation,
    source: 'dummy',
  };
};

const getDrLocation = (
  drLocation: DrLocation,
  instLocation: InstLocation | undefined
) => {
  const address = getDoctorsAddress(drLocation.address, instLocation?.address);
  const geoLocation = getDoctorsGeoLocation(
    drLocation.geoLocation,
    instLocation?.geoLocation
  );

  return {
    address: address.address,
    geoLocation: geoLocation.geoLocation,
    meta: { address: address.source, geoLocation: geoLocation.source },
  };
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

      const instIds = new Set(doctorsFiltered.map(doctor => doctor.idInst));

      const institutionsFiltered: Record<string, InstTransformed> =
        institutionsValidated.data
          .filter(institution => instIds.has(institution.id))
          .reduce((acc, institution) => {
            const { id, ...rest } = institution;

            return { ...acc, [id]: rest };
          }, {});

      const doctors = doctorsFiltered.map(doctor => {
        const {
          location,
          phone: drPhone,
          website: drWebsite,
          ...rest
        } = doctor;
        const { idInst } = doctor;

        const institution = institutionsFiltered[`${idInst}`];
        const institutionLocation = institution?.location;

        const {
          address,
          geoLocation,
          meta: drLocationMeta,
        } = getDrLocation(location, institutionLocation);

        const phone = (drPhone || institution?.phone) ?? null;
        const website = (drWebsite || institution?.website) ?? null;

        const drMeta = { ...drLocationMeta, hasInst: !!institution } as const;

        return {
          ...rest,
          phone,
          website,
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
