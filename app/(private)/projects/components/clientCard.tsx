import { fetchClientsProjects } from "@/app/query/clients/data";
import { fetchClientById } from "@/app/query/clients/data";
import { fetchContactsProjects } from "@/app/query/contacts/data";
import { fetchContactById } from "@/app/query/contacts/data";
import { Project } from "@/app/query/projects/definitions";

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
                            className="flex flex-col gap-1 rounded-lg bg-blue-100 px-3 py-2 text-xs font-medium text-gray-900"
                        >
                            <span className="font-semibold">{client.name}</span>
                            <div className="flex flex-wrap gap-1">
                                {allContacts
                                    .filter((contact) => contact && contact.idclient === client.id)
                                    .map((contact) => (
                                        <span key={contact.id} className="rounded bg-blue-200 px-1 py-0.5 text-xs">
                                            {contact.name}
                                        </span>
                                    ))}
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