import { z } from 'zod';

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

const instCSVSchemaKeys = instCSVSchema.keyof();

instCSVHeader.forEach(key => {
  const keyInSchema = instCSVSchemaKeys.safeParse(key);
  if (!keyInSchema.success) {
    throw new Error(`Key ${key} is not in schema`);
  }
});

export const instTransformedSchema = instCSVSchema.transform(inst => {
  const { post } = inst;
  const [postalCode, ...postalName] = post?.split(' ') ?? ['', ''];

  const { id_inst, ...rest } = inst;

  return {
    ...rest,
    id: id_inst,
    post: postalName.join(' '),
    postalCode: Number(postalCode),
  };
});

export const instListSchema = z.array(instTransformedSchema);
