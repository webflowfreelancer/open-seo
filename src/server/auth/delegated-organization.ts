import { AuthRepository } from "@/server/auth/repositories/AuthRepository";
import { slugify } from "./org-slug";

export async function ensureDelegatedOrganization(input: {
  id: string;
  name: string;
}) {
  const slug = `delegated-${slugify(input.id)}`;

  await AuthRepository.upsertDelegatedOrganization({
    id: input.id,
    name: input.name,
    slug,
  });

  return input.id;
}
