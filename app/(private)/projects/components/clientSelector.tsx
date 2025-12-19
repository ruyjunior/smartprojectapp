'use client';
import { useState, useEffect } from 'react';
import { Client } from '@/app/query/clients/definitions';
import { Contact } from '@/app/query/contacts/definitions';
import { fetchContactsByClientId } from '@/app/query/contacts/data';
import ContactSelector from './contactSelector';

interface ClientSelectorProps {
  clients: Client[];
  contacts: Contact[];
  selectedClients: Client[];
  selectedContacts: Contact[];
  onClientsChange: (clients: Client[]) => void;
  onContactsChange: (contacts: Contact[]) => void;
}

export default function ClientSelector({
  clients,
  contacts,
  selectedClients,
  selectedContacts,
  onClientsChange,
  onContactsChange,
}: ClientSelectorProps) {

  const handleClientToggle = (client: Client) => {
    const newSelectedClients = selectedClients.some(c => c.id === client.id)
      ? selectedClients.filter(c => c.id !== client.id)
      : [...selectedClients, client];
    //console.log('Project Clients:', newSelectedClients);

    onClientsChange(newSelectedClients);
  };

  return (
    <div className="mb-4">
      <label className="mb-2 block text-sm font-medium">
        Select Clients
      </label>

      {/* Seleção de Clientes */}
      <div className="mb-4">
        <div className="text-sm font-medium text-gray-700 mb-2">Clients:</div>
        <div className="space-y-3">
          {clients.map(client => (
            <div key={client.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
              <label className="flex items-center space-x-2 flex-1">
                <input
                  type="checkbox"
                  checked={selectedClients.some(c => c.id === client.id)}
                  onChange={() => handleClientToggle(client)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-900">{client.name}</span>
              </label>
              <div className="flex-1 ml-4">
                <ContactSelector client={client} contacts={contacts} selectedContacts={selectedContacts} onContactsChange={onContactsChange} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Campos hidden para o formulário */}
      {selectedClients.map(client => (
        <input key={`client-${client.id}`} type="hidden" name="clients" value={client.id} />
      ))}

    </div>
  );
}