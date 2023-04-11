// @ts-check
import { z } from 'zod';

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  GOOGLE_FORM_ID: z.string(),
  GOOGLE_FORM_INPUT_NAME: z.string(),
  GOOGLE_FORM_INPUT_URL: z.string(),
  GOOGLE_FORM_INPUT_TYPE: z.string(),
  GOOGLE_FORM_INPUT_INSTID: z.string(),
  GOOGLE_FORM_INPUT_PROVIDER: z.string(),
  GOOGLE_FORM_INPUT_ADDRESS: z.string(),
  GOOGLE_FORM_INPUT_AVAILABILITY: z.string(),
  GOOGLE_FORM_INPUT_ACCEPTS: z.string(),
  GOOGLE_FORM_INPUT_WEBSITE: z.string(),
  GOOGLE_FORM_INPUT_PHONE: z.string(),
  GOOGLE_FORM_INPUT_EMAIL: z.string(),
  GOOGLE_FORM_INPUT_ORDERFORM: z.string(),
  GOOGLE_FORM_INPUT_NOTE: z.string(),
});

/**
 * You can't destruct `process.env` as a regular object in the Next.js
 * middleware, so you have to do it manually here.
 * @type {{ [k in keyof z.input<typeof serverSchema>]: string | undefined }}
 */
export const serverEnv = {
  NODE_ENV: process.env.NODE_ENV,
  GOOGLE_FORM_ID: process.env.GOOGLE_FORM_ID,
  GOOGLE_FORM_INPUT_NAME: process.env.GOOGLE_FORM_INPUT_NAME,
  GOOGLE_FORM_INPUT_URL: process.env.GOOGLE_FORM_INPUT_URL,
  GOOGLE_FORM_INPUT_TYPE: process.env.GOOGLE_FORM_INPUT_TYPE,
  GOOGLE_FORM_INPUT_INSTID: process.env.GOOGLE_FORM_INPUT_INSTID,
  GOOGLE_FORM_INPUT_PROVIDER: process.env.GOOGLE_FORM_INPUT_PROVIDER,
  GOOGLE_FORM_INPUT_ADDRESS: process.env.GOOGLE_FORM_INPUT_ADDRESS,
  GOOGLE_FORM_INPUT_AVAILABILITY: process.env.GOOGLE_FORM_INPUT_AVAILABILITY,
  GOOGLE_FORM_INPUT_ACCEPTS: process.env.GOOGLE_FORM_INPUT_ACCEPTS,
  GOOGLE_FORM_INPUT_WEBSITE: process.env.GOOGLE_FORM_INPUT_WEBSITE,
  GOOGLE_FORM_INPUT_PHONE: process.env.GOOGLE_FORM_INPUT_PHONE,
  GOOGLE_FORM_INPUT_EMAIL: process.env.GOOGLE_FORM_INPUT_EMAIL,
  GOOGLE_FORM_INPUT_ORDERFORM: process.env.GOOGLE_FORM_INPUT_ORDERFORM,
  GOOGLE_FORM_INPUT_NOTE: process.env.GOOGLE_FORM_INPUT_NOTE,
};

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
  // NEXT_PUBLIC_CLIENTVAR: z.string(),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.input<typeof clientSchema>]: string | undefined }}
 */
export const clientEnv = {
  // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
};
