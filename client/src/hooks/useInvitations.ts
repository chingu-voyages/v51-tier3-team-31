import { useQuery } from '@tanstack/react-query';
import { getInvitations } from '@/functions/functions';
import { Invitation } from '@/types/invitation';

export default function useInvitations(email?: string) {
  return useQuery<Invitation[]>({
    queryKey: ['invitations', email],
    queryFn: () => getInvitations(email!),
    enabled: !!email,
  });
}
