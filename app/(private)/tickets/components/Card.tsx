'use client';
import React from "react";
import { Ticket } from '@/app/query/tickets/definitions';
import { formatDateToLocal } from '@/app/utils/utils';
import Link from "next/link";


export default function TicketCard({ ticket }: { ticket: Ticket }) {
    return (
        <Link href={`/tickets/${ticket.id}/chat`}>
            <div
                className="rounded-2xl mt-4 p-4 shadow-md border bg-white hover:shadow-lg cursor-pointer transition"
            >
                <div className="flex justify-between">
                    <h2 className="font-semibold text-lg">{ticket.subject}</h2>
                    <span
                        className={`px-3 py-1 rounded-full text-sm capitalize ${ticket.status === "open"
                            ? "bg-green-100 text-green-700"
                            : ticket.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-200 text-gray-600"
                            }`}
                    >
                        {ticket.status}
                    </span>
                </div>
                <p className="text-gray-600 mt-2 line-clamp-2">{ticket.message}</p>
                <p className="text-xs text-gray-400 mt-3">{formatDateToLocal(ticket.created_at)}</p>
            </div>
        </Link>
    );
}