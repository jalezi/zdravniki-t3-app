import { z } from 'zod';

import { addressSchema } from './doctors';
import type { LatLngLiteral } from './Map';
import { idInstSchema, trimmedStringSchema } from '../utils/zod';

export const instCSVHeader = [
  'address',
  'id_inst',
  'city',
  'lat',
  'lon',
  'municipality',
  'municipalityPart',
  'name',
  'phone',
  'post',
  'unit',
  'website',
  'zzzsSt',
] as const;

export const instCSVSchema = z.object({
  address: trimmedStringSchema,
  city: trimmedStringSchema,
  id_inst: idInstSchema,
  lat: z.coerce.number(),
  lon: z.coerce.number(),
  municipality: trimmedStringSchema,
  municipalityPart: trimmedStringSchema,
  name: trimmedStringSchema,
  phone: trimmedStringSchema,
  post: trimmedStringSchema,
  unit: trimmedStringSchema,
  website: trimmedStringSchema,
  zzzsSt: z.string(),
});

export type InstCSV = z.infer<typeof instCSVSchema>;

const instCSVSchemaKeys = instCSVSchema.keyof();

instCSVHeader.forEach(key => {
  const keyInSchema = instCSVSchemaKeys.safeParse(key);
  if (!keyInSchema.success) {
    throw new Error(`Key ${key} is not in schema`);
  }
});

export const instTransformedSchema = instCSVSchema.transform(inst => {
  const {
    address,
    city,
    id_inst,
    municipality,
    municipalityPart,
    lat,
    lon,
    post,
    ...rest
  } = inst;

  const addressObject = addressSchema.parse({
    address,
    city,
    post,
    municipality,
    municipalityPart,
  });

  const geoLocation: LatLngLiteral | null =
    lat === 0 || lon === 0 ? null : { lat, lng: lon };

  return {
    id: id_inst,
    location: { address: addressObject, geoLocation },
    ...rest,
  };
});

export const instListSchema = z.array(instTransformedSchema);

export type InstTransformed = z.infer<typeof instTransformedSchema>;

export type InstLocation = InstTransformed['location'];
export type InstAddress = InstTransformed['location']['address'];
