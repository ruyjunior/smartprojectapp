import { fetchClientsProjects } from "@/app/query/clients/data";
import { fetchClientById } from "@/app/query/clients/data";
import { fetchContactsProjects } from "@/app/query/contacts/data";
import { fetchContactById } from "@/app/query/contacts/data";
import { Project } from "@/app/query/projects/definitions";
import { fetchUserById, fetchUsersProjects } from "@/app/query/users/data";
import { UserIcon } from '@heroicons/react/24/outline';

export default async function UserCard({ project }: { project: Project }) {
    try {
        const usersProjects = await fetchUsersProjects();
        const projectUsers = usersProjects.filter((up) => up.idproject === project.id);

        const users = await Promise.all(
            projectUsers.map(async (up) => await fetchUserById(up.iduser))
        );

        return (
            <div className="flex flex-col gap-3">
                {users.map((user) =>
                    user ? (
                        <div
                            key={user.id}
                            className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                            <div className="flex-shrink-0">
                                {user.avatarurl ? (
                                    <img
                                        src={user.avatarurl}
                                        alt={user.name}
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                        <UserIcon className="h-5 w-5 text-blue-600" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                                <p className="text-xs text-gray-600 truncate">{user.email}</p>
                                <p className="text-xs text-blue-600 capitalize">{user.role}</p>
                            </div>
                        </div>
                    ) : null
                )}
            </div>
        );
    } catch (error) {
        console.error('Error in UserCard:', error);
        return <div className="text-red-500">Error loading users</div>;
    }
}