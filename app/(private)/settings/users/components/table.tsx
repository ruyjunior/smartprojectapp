import { Update } from '@/app/ui/buttons';
import { DeleteButton } from './deletebutton';
import { fetchFilteredUsers } from '@/app/query/users/data';

export default async function UsersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const users = await fetchFilteredUsers(query, currentPage);
  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-lg bg-gray-50 shadow-md p-4 md:pt-0">
              {/* Mobile View */}
              <div className="md:hidden">
                {users?.map((user) => (
                  <div key={user.id} className="mb-6 w-full rounded-lg bg-blue-300 p-4 shadow-sm">
                    <div className="border-b pb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-600">Email: {user.email}</p>
                      <p className="text-sm text-gray-600">Role: {user.role}</p>
                    </div>
                    <div className="flex justify-end gap-3 pt-3">
                      <Update href={`/settings/users/${user.id}/edit`} />
                      <DeleteButton id={user.id} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop View */}
              <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="bg-green-100 text-left text-xs font-medium">
                  <tr>
                    <th className="px-2 py-2">EDIT</th>
                    <th className="px-2 py-2">NAME</th>
                    <th className="px-2 py-2">EMAIL</th>
                    <th className="px-2 py-2">ROLE</th>
                    <th className="px-2 py-2">DELETE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-300">
                      <td className="py-2 px-2 flex gap-2">
                        <Update href={`/settings/users/${user.id}/edit`} />
                      </td>
                      <td className="px-2 py-2 text-xs">{user.name}</td>
                      <td className="px-2 py-2 text-xs">{user.email}</td>
                      <td className="px-2 py-2 text-xs">{user.role}</td>
                      <td className="py-2 px-2 flex justify-end">
                        <DeleteButton id={user.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
