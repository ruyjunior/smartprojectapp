import React from 'react';
import { UpdatePayment, DeletePayment } from '@/app/(private)/payments/components/buttons';
import { UpdateSprint, DeleteSprint, CreateSprintBasic } from '@/app/(private)/sprints/components/buttons';
import PaymentStatus from '@/app/(private)/payments/components/status';
import { CurrentUser, formatCurrency, formatDateToLocal, formatTime } from '@/app/utils/utils';
import { fetchFilteredPayments, fetchPaymentById } from '@/app/query/payments/data';
import { fetchProjects } from '@/app/query/projects/data';
import { fetchContacts } from '@/app/query/contacts/data';
import { fetchSprints } from '@/app/query/sprints/data';
import { DeleteButtonPayment, DeleteButtonSprint } from './deletebutton';
import { fetchUsers } from '@/app/query/users/data';
import { Payment } from '@/app/query/payments/definitions';


export default async function PaymentsTable({
    query,
    currentPage,
    idproject
}: {
    query: string | undefined | null;
    currentPage: number | undefined | null;
    idproject: string | undefined | null;
}) {
    const users = await fetchUsers();
    const projects = await fetchProjects();
    const sprints = await fetchSprints();
    const currentUser = await CurrentUser();
    let payments: Payment[] = [];
    if (currentUser?.role === 'admin') {
        payments = await fetchFilteredPayments(query, currentPage, idproject);
    } else {
        const allPayments = await fetchFilteredPayments(query, currentPage, idproject);
        payments = allPayments.filter((payment) => payment.iduser === currentUser.id);
    }

    return (
        <div className="w-full p-4">
            <div className="mt-6 flow-root">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden rounded-lg bg-white shadow-md p-4 md:pt-0">
                            {/* Mobile Card View */}
                            <div className="md:hidden space-y-4">
                                {payments?.map((payment) => {
                                    const user = users.find((e) => e.id === payment.iduser);
                                    return (
                                        <div key={payment.id} className="p-4 rounded-lg bg-blue-100 shadow-md">
                                            <div className="flex flex-col gap-2 border-b pb-2">
                                                <p className="font-semibold text-gray-700">{payment.title}</p>
                                                <div className="text-xs text-gray-600">
                                                    <p><span className="font-medium"></span> {formatDateToLocal(payment.date)}</p>
                                                    <p className="text-sm text-gray-600">{formatCurrency(Number(payment.amount))}</p>
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-700 pt-2">
                                                <p><span className="font-medium">Who:</span> {user?.name}</p>
                                                <p><span className="font-medium">Comments:</span> {payment.comments}</p>
                                            </div>
                                            <div className="flex justify-end mt-2 gap-2">
                                                {user && user.id === currentUser?.id && (
                                                    <>
                                                        <UpdatePayment id={payment.id} />
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Desktop Table View */}
                            <table className="hidden min-w-full text-gray-900 md:table">
                                <thead className="bg-blue-100 text-left text-xs font-medium uppercase">
                                    <tr>
                                        {['Edit', 'Date', 'Title', 'Comments', 'Amount', 'User', 'Delete'].map((header) => (
                                            <th key={header} className="px-1 py-1">{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {payments?.map((payment) => {
                                        const user = users.find((e) => e.id === payment.iduser);
                                        return (
                                            <React.Fragment key={payment.id}>
                                                <tr className="hover:bg-gray-400">
                                                    <td className="py-2 px-2">
                                                        <div className="flex gap-2 items-center">
                                                            {user && user.id === currentUser?.id && (
                                                                <>
                                                                    <UpdatePayment id={payment.id} />
                                                                    <CreateSprintBasic id={payment.id} />
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-1 py-1 text-xs text-gray-700">{formatDateToLocal(payment.date)}</td>
                                                    <td className="px-1 py-1 text-xs text-gray-700">
                                                        <p className="font-bold text-sm text-gray-900" >{payment.title}</p>
                                                    </td>
                                                    <td className="px-1 py-1 text-xs text-gray-700">{payment.comments} </td>

                                                    <td className="px-1 py-1 text-xs text-gray-700">
                                                        <p className="text-sm text-gray-600">{formatCurrency(Number(payment.amount))}</p>
                                                    </td>
                                                    <td className="px-1 py-1 text-xs font-medium">{user?.name}</td>
                                                    <td className="px-1 py-1">
                                                        {user && user.id === currentUser?.id && (
                                                            <DeleteButtonPayment id={payment.id} />
                                                        )}
                                                    </td>
                                                </tr>
                                            </React.Fragment>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}