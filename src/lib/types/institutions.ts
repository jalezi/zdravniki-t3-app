import { z } from 'zod';

export const instProperties = [
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
];

export const instSchema = z.object({
  address: z.string().optional(),
  city: z.string().optional(),
  id_inst: z.string().optional(),
  lat: z.coerce.number().optional(),
  lon: z.coerce.number().optional(),
  municipality: z.string().optional(),
  municipalityPart: z.string().optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
  post: z.string().optional(),
  unit: z.string().optional(),
  website: z.string().optional(),
  zzzSt: z.string().optional(),
});

export const instTransformedSchema = instSchema.transform(inst => {
  const { post } = inst;
  const [postalCode, ...postalName] = post?.split(' ') ?? ['', ''];

  return {
    ...inst,
    post: postalName.join(' '),
    postalCode: Number(postalCode),
  };
});

export const instListSchema = z.array(instTransformedSchema);
