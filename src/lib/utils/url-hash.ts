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

export const acceptsHashValueSchema = z.enum(['all', 'y', 'n']);
export type AcceptsHashValueSchema = z.infer<typeof acceptsHashValueSchema>;

const hashSchema = z.tuple([
  acceptsHashValueSchema,
  z.tuple([z.number(), z.number(), z.number()]),
  z.string(),
]);

export type HashSchema = z.infer<typeof hashSchema>;

export const parseHash = (hash: string) => {
  const intermediateHash = hash.split('|');

  if (intermediateHash.length < 4 || intermediateHash.length > 5)
    return hashSchema.safeParse(new Error('Invalid hash').message);

  const newHashList =
    intermediateHash.length === 4
      ? intermediateHash.slice(1)
      : intermediateHash.slice(1, -1);

  const attributeNames = newHashList.map(item => item.split('=')[0]);

  if (!hashAttributeNamesSchema.safeParse(attributeNames).success) {
    return hashSchema.safeParse(null);
  }

  const [accepts, map, search] = newHashList.map(item => item.split('=')[1]);

  return hashSchema.safeParse([accepts, map?.split('/').map(Number), search]);
};

export const stringifyHash = (hash: HashSchema) => {
  const [accepts, map, search] = hash;
  return `#|accepts=${accepts}|map=${map?.join('/')}|search=${search}|`;
};
