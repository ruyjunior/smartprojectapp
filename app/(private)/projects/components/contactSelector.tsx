'use client';
import { useState, useEffect } from 'react';
import { Client } from '@/app/query/clients/definitions';
import { Contact } from '@/app/query/contacts/definitions';
import { fetchContactsByClientId } from '@/app/query/contacts/data';

interface ContactSelectorProps {
  client: Client;
  contacts: Contact[];
  selectedContacts: Contact[];
  onContactsChange: (contacts: Contact[]) => void;
}

export default function ContactSelector({
  client,
  contacts,
  selectedContacts,
  onContactsChange,
}: ContactSelectorProps) {
  const handleContactToggle = (contact: Contact) => {
    const newSelectedContacts = selectedContacts.includes(contact)
      ? selectedContacts.filter(c => c.id !== contact.id)
      : [...selectedContacts, contact];

    onContactsChange(newSelectedContacts);
  };

  const clientContacts = contacts.filter(contact => contact.idclient === client.id);

  return (
    <div className="mb-4">
      {clientContacts.length > 0 ? (
        <>
          <label className="mb-2 block text-sm font-medium">
            Select Contacts
          </label>

          {/* Seleção de Contatos por Cliente */}
          <div>
            <div className="space-y-4">
              <div key={client.id} className="border rounded-lg p-3 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {clientContacts.map(contact => (
                    <label key={contact.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedContacts.some(c => c.id === contact.id)}
                        onChange={() => handleContactToggle(contact)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm">{contact.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Campos hidden para o formulário */}
            {selectedContacts.map(contact => (
              <input key={`contact-${contact.id}`} type="hidden" name="contacts" value={contact.id} />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}