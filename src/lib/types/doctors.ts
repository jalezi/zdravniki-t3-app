import { z } from 'zod';

import { idInstSchema, trimmedStringSchema } from '../utils/zod';

export const drCSVHeader = [
  'accepts',
  'accepts_override',
  'address',
  'availability',
  'availability_override',
  'city',
  'date_override',
  'doctor',
  'email',
  'id_inst',
  'lat',
  'load',
  'lon',
  'municipality',
  'municipalityPart',
  'note_override',
  'orderform',
  'phone',
  'post',
  'type',
  'website',
] as const;

export const drCSVSchema = z.object({
  accepts: z.enum(['y', 'n']),
  accepts_override: z.enum(['y', 'n', '']),
  address: trimmedStringSchema,
  availability: z.coerce.number(),
  availability_override: trimmedStringSchema.or(z.coerce.number()),
  city: trimmedStringSchema,
  date_override: trimmedStringSchema,
  doctor: trimmedStringSchema,
  email: trimmedStringSchema,
  id_inst: idInstSchema,
  lat: z.coerce.number(),
  load: z.coerce.number(),
  lon: z.coerce.number(),
  municipality: trimmedStringSchema,
  municipalityPart: trimmedStringSchema,
  note_override: trimmedStringSchema,
  orderform: trimmedStringSchema,
  phone: trimmedStringSchema,
  post: trimmedStringSchema,
  type: z.enum(['gp', 'gp-x', 'ped', 'ped-x', 'den', 'den-y', 'den-s', 'gyn']),
  website: trimmedStringSchema,
});

const drCSVSchemaKeys = drCSVSchema.keyof();

drCSVHeader.forEach(key => {
  const keyInSchema = drCSVSchemaKeys.safeParse(key);
  if (!keyInSchema.success) {
    throw new Error(`Key ${key} is not in schema`);
  }
});

export const drCSVTypeSchema = drCSVSchema.shape.type;
export type DrCSVType = z.infer<typeof drCSVTypeSchema>;

export const drPageType = drCSVTypeSchema.transform(type => {
  if (type === 'gp-x') return 'gp';
  if (type === 'ped-x') return 'ped';
  return type;
});
export type DrPageType = z.infer<typeof drPageType>;

export const drTransformedSchema = drCSVSchema.transform(dr => {
  const { post, id_inst, ...rest } = dr;
  const [postalCode, ...postalName] = post?.split(' ') ?? ['', ''];

  return {
    ...rest,
    idInst: id_inst,
    post: postalName.join(' '),
    postalCode: Number(postalCode),
  };
});

export const drListSchema = z.array(drTransformedSchema);
export type DrListSchema = z.infer<typeof drListSchema>;
