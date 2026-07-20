import type { AccessRole } from "@/shared/access";
import { AppError } from "@/server/lib/errors";

export function requireAdminAccess(context: { role: AccessRole }) {
  if (context.role !== "admin") {
    throw new AppError("FORBIDDEN");
  }
}
