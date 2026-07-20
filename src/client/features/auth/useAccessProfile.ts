import { queryOptions, useQuery } from "@tanstack/react-query";
import { getAccessProfile } from "@/serverFunctions/access";

export const accessProfileQueryOptions = () =>
  queryOptions({
    queryKey: ["accessProfile"],
    queryFn: () => getAccessProfile(),
    staleTime: Infinity,
  });

export function useAccessProfile() {
  return useQuery(accessProfileQueryOptions());
}
