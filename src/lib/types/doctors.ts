import { z } from 'zod';

import { idInstSchema, slugSchema, trimmedStringSchema } from '@/lib/utils/zod';

import type { LatLngLiteral } from './Map';

const drAcceptsSchema = z.enum(['y', 'n']);

export type DrAccepts = z.infer<typeof drAcceptsSchema>;

const drAvailabilityOverrideTransformSchema = trimmedStringSchema.transform(
  availability => (availability ? Number(availability) : '')
);

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
  availability_override: drAvailabilityOverrideTransformSchema,
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
  type: z.enum([
    'gp',
    'gp-x',
    'gp-f',
    'ped',
    'ped-x',
    'den',
    'den-y',
    'den-s',
    'gyn',
  ]),
  website: trimmedStringSchema,
});

export type DrCSV = z.infer<typeof drCSVSchema>;

const drCSVSchemaKeys = drCSVSchema.keyof();

drCSVHeader.forEach(key => {
  const keyInSchema = drCSVSchemaKeys.safeParse(key);
  if (!keyInSchema.success) {
    throw new Error(`Key ${key} is not in schema`);
  }
});

export const drCSVTypeSchema = drCSVSchema.shape.type;
export type DrCSVType = z.infer<typeof drCSVTypeSchema>;

export const drTypeCoerceSchema = drCSVTypeSchema.transform(type => {
  return type;
});

export const addressSchema = z
  .object({
    address: trimmedStringSchema,
    city: trimmedStringSchema,
    post: trimmedStringSchema,
    municipality: trimmedStringSchema,
    municipalityPart: trimmedStringSchema,
  })
  .transform(({ address, city, post, municipality, municipalityPart }) => {
    if (!post || !address) return null;

    const [postalCode, ...postalName] = post?.split(' ') ?? ['', ''];

    return {
      street: address,
      city,
      post,
      postalCode: Number(postalCode),
      postalName: postalName.join(' '),
      municipality,
      municipalityPart,
      fullAddress: `${address}, ${post}`,
      searchAddress: `${address}, ${city} ${post} ${municipality} ${municipalityPart}`,
    };
  });

export const clinicSchema = z.enum(['default', 'extra', 'floating']);
export type Clinic = z.infer<typeof clinicSchema>;

const getClinicSchema = z
  .function()
  .args(drCSVSchema.shape['type'])
  .returns(clinicSchema)
  .implement(type => {
    let result: Clinic = 'default';
    if (type.endsWith('-x')) {
      result = 'extra';
    }
    if (type.endsWith('-f')) {
      result = 'floating';
    }
    return result;
  });

const isAcceptsOverrideSchema = z
  .function()
  .args(z.string().or(z.number()))
  .returns(z.boolean())
  .implement(accepts_override => accepts_override !== '');

const isAvailabilityOverrideSchema = z
  .function()
  .args(z.string().or(z.number()))
  .returns(z.boolean())
  .implement(availability_override => availability_override !== '');

const isDateOverrideSchema = z
  .function()
  .args(z.string().or(z.number()))
  .returns(z.boolean())
  .implement(date_override => date_override !== '');

export const drTransformedSchema = drCSVSchema.transform(dr => {
  const {
    accepts,
    availability,
    accepts_override,
    address,
    availability_override,
    city,
    doctor,
    date_override,
    id_inst,
    lat,
    lon,
    municipality,
    municipalityPart,
    note_override,
    post,
    type,
    ...rest
  } = dr;

  const addressObject = addressSchema.parse({
    address,
    city,
    post,
    municipality,
    municipalityPart,
  });

  const geoLocation: LatLngLiteral | null =
    lat === 0 || lon === 0 ? null : { lat, lng: lon };

  const slugNameParsed = slugSchema.safeParse(doctor);
  const slugName = slugNameParsed.success ? slugNameParsed.data : '';
  const typePage = drTypeCoerceSchema.parse(`${type}`);
  const idInst = idInstSchema.parse(id_inst);
  const href = `/${typePage}/${slugName}/${idInst}`;

  return {
    accepts: drAcceptsSchema.parse(accepts_override || accepts),
    availability: z.coerce
      .number()
      .parse(availability_override || availability),
    clinic: getClinicSchema(type),
    fakeId: `${type}-${slugName}-${id_inst}`,
    href,
    idInst,
    location: { address: addressObject, geoLocation },
    name: doctor,
    slugName,
    type,
    typePage,
    override: {
      accepts: accepts_override,
      availability: availability_override,
      date: date_override,
      isAcceptsOverride: isAcceptsOverrideSchema(accepts_override),
      isAvailabilityOverride: isAvailabilityOverrideSchema(
        availability_override.toString()
      ),
      isDateOverride: isDateOverrideSchema(date_override),
      note: note_override,
    },
    zzzs: {
      accepts,
      availability,
    },
    ...rest,
  };
});

export const drListSchema = z.array(drTransformedSchema);
export type DrListSchema = z.infer<typeof drListSchema>;

export type DrLocation = DrListSchema[0]['location'];
export type DrAddress = DrListSchema[0]['location']['address'];

const urlSchema = z.string().url();
export const urlTransformSchema = urlSchema.transform(value => {
  return new URL(value);
});
const emailSchema = z.string().email();
const urlOrEmailSchema = z.union([urlSchema, emailSchema]);
export const urlOrEmailTransformSchema = urlOrEmailSchema.transform(
  (value, ctx) => {
    if (emailSchema.safeParse(value).success) {
      return { value, type: 'email' as const };
    }

    if (urlSchema.safeParse(value).success) {
      return { value, type: 'url' as const };
    }

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Not an email or an url',
    });
    return z.NEVER;
  }
);

export type UrlOrEmailTransformSchema = z.infer<
  typeof urlOrEmailTransformSchema
>;
