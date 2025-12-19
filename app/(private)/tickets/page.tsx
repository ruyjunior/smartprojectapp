import TicketList from "./components/List";
import { fetchTickets } from "@/app/query/tickets/data";
import { lusitana } from "@/app/ui/fonts";
import { Create } from "@/app/ui/buttons";
import { CurrentUser } from "@/app/utils/utils";

export default async function TicketsPage() {
    const currentUser = await CurrentUser();
    const Alltickets = await fetchTickets();
    const tickets = currentUser?.role === 'admin' ? Alltickets : Alltickets.filter(ticket => ticket.iduser === currentUser?.id);
    //console.log('Atual User ID:', currentUser?.id);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between mb-4">
                <h1 className={`${lusitana.className} text-2xl`}>Support Tickets</h1>
            </div>

            <Create href="/tickets/create" />
            <TicketList tickets={tickets} />
        </div>
    );
}