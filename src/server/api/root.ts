import { doctorsRouter } from './routers/doctors';
import { timestampRouter } from './routers/timestamps';
import { createTRPCRouter, publicProcedure } from './trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  healthcheck: publicProcedure.query(() => ({ ok: true })),
  timestamp: timestampRouter,
  doctors: doctorsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
