import { fetchClientsProjects } from "@/app/query/clients/data";
import { fetchClientById } from "@/app/query/clients/data";
import { fetchContactsProjects } from "@/app/query/contacts/data";
import { fetchContactById } from "@/app/query/contacts/data";
import { Project } from "@/app/query/projects/definitions";
import { BuildingOfficeIcon } from '@heroicons/react/24/outline';

export default async function ClientCard({ project }: { project: Project }) {
    try {
        const clientsProjects = await fetchClientsProjects();
        const contactsProjects = await fetchContactsProjects();
        const projectClients = clientsProjects.filter((cp) => cp.idproject === project.id);
        
        const clients = await Promise.all(
            projectClients.map(async (cp) => await fetchClientById(cp.idclient))
        );

        // Buscar todos os contatos associados aos clientes do projeto
        const allContacts = await Promise.all(
            contactsProjects
                .filter((cp) => cp.idproject === project.id)
                .map(async (cp) => await fetchContactById(cp.idcontact))
        );

        return (
            <div className="flex flex-col gap-2">
                {clients.map((client) =>
                    client ? (
                        <div
                            key={client.id}
                            className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                            <div className="flex-shrink-0">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                                    <BuildingOfficeIcon className="h-5 w-5 text-green-600" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 mb-2">{client.name}</p>
                                <div className="flex flex-wrap gap-2">
                                    {allContacts
                                        .filter((contact) => contact && contact.idclient === client.id)
                                        .map((contact) => (
                                            <span key={contact.id} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {contact.name}
                                            </span>
                                        ))}
                                </div>
                            </div>
                        </div>
                    ) : null
                )}
            </div>
        );
    } catch (error) {
        console.error('Error in ClientCard:', error);
        return <div className="text-red-500">Error loading clients</div>;
    }
}