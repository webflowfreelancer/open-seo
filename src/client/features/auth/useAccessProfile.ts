import { useQuery } from "@tanstack/react-query";
import { getAccessProfile } from "@/serverFunctions/access";

export function useAccessProfile() {
  return useQuery({
    queryKey: ["accessProfile"],
    queryFn: () => getAccessProfile(),
  });
}
