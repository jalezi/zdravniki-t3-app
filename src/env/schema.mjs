// @ts-check
import { z } from 'zod';

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
});

/**
 * You can't destruct `process.env` as a regular object in the Next.js
 * middleware, so you have to do it manually here.
 * @type {{ [k in keyof z.input<typeof serverSchema>]: string | undefined }}
 */
export const serverEnv = {
  NODE_ENV: process.env.NODE_ENV,
};

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
  // NEXT_PUBLIC_CLIENTVAR: z.string(),
  NEXT_PUBLIC_GOOGLE_FORM_ID: z.string(),
  NEXT_PUBLIC_GOOGLE_FORM_INPUT_ADDRESS: z.string(),
  NEXT_PUBLIC_GOOGLE_FORM_INPUT_AVAILABILITY: z.string(),
  NEXT_PUBLIC_GOOGLE_FORM_INPUT_ACCEPTS: z.string(),
  NEXT_PUBLIC_GOOGLE_FORM_INPUT_WEBSITE: z.string(),
  NEXT_PUBLIC_GOOGLE_FORM_INPUT_PHONE: z.string(),
  NEXT_PUBLIC_GOOGLE_FORM_INPUT_EMAIL: z.string(),
  NEXT_PUBLIC_GOOGLE_FORM_INPUT_ORDERFORM: z.string(),
  NEXT_PUBLIC_GOOGLE_FORM_INPUT_NOTE: z.string(),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.input<typeof clientSchema>]: string | undefined }}
 */
export const clientEnv = {
  // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  NEXT_PUBLIC_GOOGLE_FORM_ID: process.env.NEXT_PUBLIC_GOOGLE_FORM_ID,
  NEXT_PUBLIC_GOOGLE_FORM_INPUT_ADDRESS:
    process.env.NEXT_PUBLIC_GOOGLE_FORM_INPUT_ADDRESS,
  NEXT_PUBLIC_GOOGLE_FORM_INPUT_AVAILABILITY:
    process.env.NEXT_PUBLIC_GOOGLE_FORM_INPUT_AVAILABILITY,
  NEXT_PUBLIC_GOOGLE_FORM_INPUT_ACCEPTS:
    process.env.NEXT_PUBLIC_GOOGLE_FORM_INPUT_ACCEPTS,
  NEXT_PUBLIC_GOOGLE_FORM_INPUT_WEBSITE:
    process.env.NEXT_PUBLIC_GOOGLE_FORM_INPUT_WEBSITE,
  NEXT_PUBLIC_GOOGLE_FORM_INPUT_PHONE:
    process.env.NEXT_PUBLIC_GOOGLE_FORM_INPUT_PHONE,
  NEXT_PUBLIC_GOOGLE_FORM_INPUT_EMAIL:
    process.env.NEXT_PUBLIC_GOOGLE_FORM_INPUT_EMAIL,
  NEXT_PUBLIC_GOOGLE_FORM_INPUT_ORDERFORM:
    process.env.NEXT_PUBLIC_GOOGLE_FORM_INPUT_ORDERFORM,
  NEXT_PUBLIC_GOOGLE_FORM_INPUT_NOTE:
    process.env.NEXT_PUBLIC_GOOGLE_FORM_INPUT_NOTE,
};
