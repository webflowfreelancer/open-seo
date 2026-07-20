import { createMiddleware } from "@tanstack/react-start";
import { z } from "zod";
import { AppError } from "@/server/lib/errors";
import { errorHandlingMiddleware } from "@/middleware/errorHandling";
import type { EnsuredUserContext } from "@/middleware/ensure-user/types";
import { ensureUserMiddleware } from "@/middleware/ensureUser";
import { ACCESS_ROLES } from "@/shared/access";
import { requireAdminAccess } from "@/server/auth/authorization";

const ensuredUserContextSchema: z.ZodType<EnsuredUserContext> = z.object({
  userId: z.string(),
  userEmail: z.string(),
  emailVerified: z.boolean(),
  organizationId: z.string(),
  role: z.enum(ACCESS_ROLES),
  project: z.any().optional(),
});

function getAuthenticatedContext(context: unknown): EnsuredUserContext {
  const result = ensuredUserContextSchema.safeParse(context);
  if (!result.success) {
    throw new AppError(
      "INTERNAL_ERROR",
      "Authenticated server function context missing",
    );
  }
  return result.data;
}

function getProjectContext(context: unknown) {
  const authenticatedContext = getAuthenticatedContext(context);

  if (!authenticatedContext.project) {
    throw new AppError(
      "INTERNAL_ERROR",
      "Project context missing from authenticated server function",
    );
  }

  return {
    ...authenticatedContext,
    project: authenticatedContext.project,
    projectId: authenticatedContext.project.id,
  };
}

export const globalServerFunctionMiddleware = [
  errorHandlingMiddleware,
  ensureUserMiddleware,
] as const;

export const requireAuthenticatedContext = [
  createMiddleware({ type: "function" }).server(async ({ next, context }) => {
    const authenticatedContext = getAuthenticatedContext(context);

    return next({
      context: authenticatedContext,
    });
  }),
] as const;

export const requireProjectContext = [
  createMiddleware({ type: "function" }).server(async ({ next, context }) => {
    return next({
      context: getProjectContext(context),
    });
  }),
] as const;

export const requireAdminContext = [
  createMiddleware({ type: "function" }).server(async ({ next, context }) => {
    const authenticatedContext = getAuthenticatedContext(context);
    requireAdminAccess(authenticatedContext);

    return next({
      context: authenticatedContext,
    });
  }),
] as const;

export const requireAdminProjectContext = [
  createMiddleware({ type: "function" }).server(async ({ next, context }) => {
    const projectContext = getProjectContext(context);
    requireAdminAccess(projectContext);

    return next({
      context: projectContext,
    });
  }),
] as const;
