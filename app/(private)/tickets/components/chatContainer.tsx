import { Ticket } from '@/app/query/tickets/definitions';
import { Message } from '@/app/query/messages/definitions';
import { CurrentUser } from '@/app/utils/utils';
import TicketCard from './Card';
import TicketMessages from './ticketMessages';
import SendMessageForm from './sendMessage-form';
export default async function ChatContainer({
  ticket,
  messages,
  ticketId,
}: {
  ticket: Ticket;
  messages: Message[];
  ticketId: string;
}) {
  const currentUser = await CurrentUser();

  return (
    <div className="space-y-6">
      <TicketCard ticket={ticket} />
      <TicketMessages messages={messages} currentUser={currentUser} />
      <SendMessageForm ticketId={ticketId} sender={currentUser?.name || ''} />
    </div>
  );
}