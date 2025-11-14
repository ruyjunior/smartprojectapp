'use client';
import TicketCard from "./Card";
import { Ticket } from "@/app/query/tickets/definitions";


export default function TicketList({ tickets }: { tickets: Ticket[] }) {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.length === 0 && (
                <p className="text-gray-500 col-span-full text-center">No tickets found.</p>
            )}
            {tickets.map((ticket) => (
                <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                />
            )
            )}

        </div>
    );
}