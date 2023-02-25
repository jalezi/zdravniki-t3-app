import { z } from 'zod';

export const doctorProperties = [
  'accepts',
  'accepts_override',
  'address',
  'availability',
  'availability_override',
  'city',
  'date_override',
  'email',
  'doctor',
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

export const drSchema = z.object({
  accepts: z.enum(['y', 'n']).or(z.unknown()),
  accepts_override: z.enum(['y', 'n']).or(z.unknown()),
  address: z.string().optional(),
  availability: z.string().optional(),
  availability_override: z.string().optional(),
  city: z.string().optional(),
  date_override: z.string().optional(),
  doctor: z.string().optional(),
  email: z.string().optional(),
  id_inst: z.string().optional(),
  lat: z.coerce.number().optional(),
  load: z.string().optional(),
  lon: z.coerce.number().optional(),
  municipality: z.string().optional(),
  municipalityPart: z.string().optional(),
  note_override: z.string().optional(),
  orederform: z.string().optional(),
  phone: z.string().optional(),
  post: z.string().optional(),
  type: z.enum(['gp', 'ped', 'den', 'den-y', 'den-s', 'gyn']).or(z.unknown()),
  website: z.string().optional(),
});

export const drTransformedSchema = drSchema.transform(dr => {
  const { post } = dr;
  const [postalCode, ...postalName] = post?.split(' ') ?? ['', ''];

  return {
    ...dr,
    post: postalName.join(' '),
    postalCode: Number(postalCode),
  };
});

export const drListSchema = z.array(drTransformedSchema);
