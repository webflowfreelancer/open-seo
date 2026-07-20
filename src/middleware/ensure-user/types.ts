import type { ProjectRepository } from "@/server/features/projects/repositories/ProjectRepository";
import type { AccessRole } from "@/shared/access";

export type EnsuredProject = NonNullable<
  Awaited<ReturnType<typeof ProjectRepository.getProjectForOrganization>>
>;

export type EnsuredUserContext = {
  userId: string;
  userEmail: string;
  // True when the user's email is verified (hosted) or auth is delegated
  // (Cloudflare Access / local), where there is no unverified state. Used to
  // gate paid onboarding spend behind verification.
  emailVerified: boolean;
  organizationId: string;
  role: AccessRole;
  project?: EnsuredProject;
};
