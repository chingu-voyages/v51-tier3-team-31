import { serverBaseUrl } from '@/config';
import { useAuth } from '@/hooks/useAuth';
import { Invitation } from '@/types/invitation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface InvitationNotificationCard {
  invitation: Invitation;
}

const InvitationNotificationCard = ({
  invitation,
}: InvitationNotificationCard) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const userId = user?.id ? Number(user.id) : undefined;
  const email = user?.email ?? undefined;

  // Accept or decline invitation
  async function replyToInvitation(
    invitationId: number,
    reply: 'Accepted' | 'Declined'
  ) {
    const url = `${serverBaseUrl}/api/v1/expense-groups/reply-invitation`;

    const response = await axios.post(url, { invitationId, reply });
    return response.data;
  }

  // React Query mutation
  const mutation = useMutation({
    mutationFn: (payload: {
      invitationId: number;
      reply: 'Accepted' | 'Declined';
    }) => replyToInvitation(payload.invitationId, payload.reply),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitations', email] });
      queryClient.invalidateQueries({ queryKey: ['expense-groups', userId] });
    },
  });

  return (
    <div className="flex flex-col border-b-[1px] py-3 border-gray-200">
      <p className="text-base font-normal text-center text-gray-600 border-gray-100 p-3">
        You've been invited to
        <span className="font-medium"> {invitation.expenseGroup.name} </span>
        by
        <span className="font-medium"> {invitation.sender.email}. </span>
      </p>
      <div className="flex w-full text-center text-sm">
        <button
          onClick={() =>
            mutation.mutate({
              invitationId: invitation.id,
              reply: 'Accepted',
            })
          }
          className={`w-1/2 border-[1px] py-1 border-r-0 border-gray-100 cursor-pointer hover:bg-blue-600 hover:text-white ${
            mutation.isPending ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={mutation.isPending}
        >
          Accept
        </button>
        <button
          onClick={() =>
            mutation.mutate({ invitationId: invitation.id, reply: 'Declined' })
          }
          className={`w-1/2 border-[1px] py-1 cursor-pointer border-gray-100 hover:bg-gray-100 ${
            mutation.isPending ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={mutation.isPending}
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default InvitationNotificationCard;
