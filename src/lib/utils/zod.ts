import slugify from 'slugify';
import { z } from 'zod';

import { baseDrTypeSchema } from '@/lib/types/dr-type-page';

export const trimmedStringSchema = z
  .string()
  .transform(s => s.replace(/\s+/g, ' ').trim());

export const idInstSchema = trimmedStringSchema;

export const toSlug = function toSlug(
  text = '',
  options = { lower: true, remove: /[*+~.()'"!:@]/g }
) {
  return slugify(text, options);
};

export const slugSchema = trimmedStringSchema.transform(value => toSlug(value));

export const drPersonalPageSchema = z.object({
  type: baseDrTypeSchema,
  slugName: slugSchema,
  idInst: idInstSchema,
});
