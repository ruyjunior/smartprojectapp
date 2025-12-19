import React from 'react';
import { UpdateFile, DeleteFile, DownloadFile, CreateFile } from '@/app/(private)/files/components/buttons';
import { fetchFilteredFiles, fetchFileById } from '@/app/query/files/data';
import { CurrentUser, formatDateDb, formatDateToLocal } from '@/app/utils/utils';
import { DeleteButton } from './deletebutton';

export default async function FilesTable({
    query,
    currentPage,
    idproject
}: {
    query: string | undefined | null;
    currentPage: number | undefined | null;
    idproject: string | undefined | null;
}) {
    const files = await fetchFilteredFiles(query, currentPage, idproject);
    //console.log('Files in Table:', files);
    const user = await CurrentUser();

    return (
        <div className="w-full p-4">
            <div className="mt-6 flow-root">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden rounded-lg bg-white shadow-md p-4 md:pt-0">
                            {/* Mobile Card View */}
                            <div className="md:hidden space-y-4">
                                {files?.map((file) => {
                                    return (
                                        <div key={file.id} className="p-4 rounded-lg bg-blue-100 shadow-md">
                                            <div className="flex flex-col gap-2 border-b pb-2">
                                                <p className="font-semibold text-gray-700">{file.title}</p>
                                                <div className="text-xs text-gray-600">
                                                    <p><span className="font-medium">Comments:</span> {file.comments}</p>
                                                    <p><span className="font-medium">Date:</span> {formatDateToLocal(file.creat_at)}</p>
                                                    <p><span className="font-medium">Url:</span> {file.url}</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-end mt-2 gap-2">
                                                <UpdateFile id={file.id} />
                                                <DownloadFile url={file.url} />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Desktop Table View */}
                            <table className="hidden min-w-full text-gray-900 md:table">
                                <thead className="bg-blue-100 text-left text-xs font-medium uppercase">
                                    <tr>
                                        {['Edit', 'Title', 'Comments', 'Date', 'Delete'].map((header) => (
                                            <th key={header} className="px-1 py-1">{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {files?.map((file) => {
                                        return (
                                            <React.Fragment key={file.id}>
                                                <tr className="hover:bg-gray-400">
                                                    <td className="py-2 px-2">
                                                        <div className="flex gap-2 items-center">
                                                            <UpdateFile id={file.id} />
                                                            <DownloadFile url={file.url} />
                                                        </div>
                                                    </td>
                                                    {/* Details Column */}
                                                    <td className="px-1 py-1 text-xs text-gray-700">{file.title}</td>
                                                    <td className="px-1 py-1 text-xs text-gray-700">{file.comments}</td>
                                                    <td className="px-1 py-1 text-xs text-gray-700">{formatDateToLocal(file.creat_at)}</td>
                                                    <td className="px-1 py-1">
                                                        {user?.role === 'admin' && (
                                                            <DeleteButton id={file.id} />
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
        </div>
    );
}