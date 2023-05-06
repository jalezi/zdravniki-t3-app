import slugify from 'slugify';
import { z } from 'zod';

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

export const drTypeSchema = z.enum([
  'gp',
  'gp-x',
  'gp-f',
  'ped',
  'ped-x',
  'den',
  'den-y',
  'den-s',
  'gyn',
]);

export const drPersonalPageSchema = z.object({
  type: drTypeSchema,
  slugName: slugSchema,
  idInst: idInstSchema,
});
