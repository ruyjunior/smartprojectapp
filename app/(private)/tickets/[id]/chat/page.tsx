import Breadcrumbs from '@/app/ui/breadcrumbs';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchTicketById } from '@/app/query/tickets/data';
import { fetchMessagesByTicket } from '@/app/query/messages/data';
import ChatContainer from '../../components/chatContainer';

export const metadata: Metadata = {
  title: 'Tickets Chats',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  
  const ticket = await fetchTicketById(id);
  if (!ticket) notFound();

  const messages = await fetchMessagesByTicket(id);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tickets', href: '/tickets' },
          {
            label: `Chat: ${ticket.subject}`,
            href: `/tickets/${id}/chat`,
            active: true,
          },
        ]}
      />
      <ChatContainer ticket={ticket} messages={messages} ticketId={id} />
    </main>
  );
}