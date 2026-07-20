import {
  archiveProject,
  createProject,
  getProjectForOrganization,
  listArchivedProjects,
  listProjects,
  listProjectsForRole,
  listProjectsEnsuringOne,
  restoreProject,
  setProjectDomain,
  setProjectMarket,
  updateProject,
} from "@/server/features/projects/services/projects";

export const ProjectService = {
  listProjects,
  listProjectsForRole,
  listProjectsEnsuringOne,
  createProject,
  updateProject,
  setProjectDomain,
  setProjectMarket,
  archiveProject,
  restoreProject,
  listArchivedProjects,
  getProjectForOrganization,
} as const;
