import { z } from 'zod';

const acceptsAttributeName = z.literal('accepts');
const mapAttributeName = z.literal('map');
const searchAttributeName = z.literal('search');

const hashAttributeNamesSchema = z.tuple(
  [acceptsAttributeName, mapAttributeName, searchAttributeName],
  {
    invalid_type_error: 'Invalid hash attribute name',
  }
);

const hashSchema = z.tuple([
  z.enum(['all', 'y', 'n']),
  z.tuple([z.number(), z.number(), z.number()]),
  z.string(),
]);

export type HashSchema = z.infer<typeof hashSchema>;

export const parseHash = (hash: string) => {
  const rest = hash.split('|').slice(1);
  if (rest.length !== 3) return hashSchema.safeParse(null);
  const attributeNames = rest.map(item => item.split('=')[0]);

  if (!hashAttributeNamesSchema.safeParse(attributeNames).success) {
    return hashSchema.safeParse(null);
  }

  const [accepts, map, search] = rest.map(item => item.split('=')[1]);
  return hashSchema.safeParse([accepts, map?.split('/').map(Number), search]);
};

export const stringifyHash = (hash: HashSchema) => {
  const [accepts, map, search] = hash;
  return `#|accepts=${accepts}|map=${map?.join('/')}|search=${search}`;
};
