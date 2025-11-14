import { Message } from '@/app/query/messages/definitions';
import { User } from '@/app/query/users/definitions';
import { formatDateTimeDb, formatDateToLocal, formatDateToTimeDb } from '@/app/utils/utils';

export default function TicketMessages({
    messages,
    currentUser,
}: {
    messages: Message[];
    currentUser: User | null;
}) {
    
    const today = new Date().toISOString().split('T')[0];
    const todayDate = formatDateToLocal(today);
    return (
        <div className="max-h-64 overflow-y-auto space-y-3 p-2 bg-gray-50 rounded-xl">
            {messages.length === 0 && (
                <p className="text-gray-500 text-center">No messages found.</p>
            )}

            {messages.map((m) => (
                <div
                    key={m.id}
                    className={`p-3 rounded-xl w-fit max-w-[80%] ${m.sender === currentUser?.name
                            ? 'bg-blue-100 self-end ml-auto'
                            : 'bg-gray-200'
                        }`}
                >
                    <h2 className="text-sm font-semibold">{m.sender}</h2>
                    <p className="text-sm">{m.message}</p>
                    <span className="text-xs text-gray-500">
                        {formatDateToLocal(m.created_at) !== todayDate ? (formatDateToTimeDb(m.created_at)) :
                        ( formatDateTimeDb(m.created_at))}
                    </span>
                </div>
            ))}
        </div>
    );
}