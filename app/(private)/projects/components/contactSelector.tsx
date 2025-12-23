'use client';
import { useState, useEffect } from 'react';
import { Client } from '@/app/query/clients/definitions';
import { Contact } from '@/app/query/contacts/definitions';
import { UserGroupIcon } from '@heroicons/react/24/outline';

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
    <div className="flex flex-wrap gap-2">
      {clientContacts.map(contact => (
        <label key={contact.id} className="flex items-center space-x-2 p-1 rounded hover:bg-gray-50">
          <input
            type="checkbox"
            checked={selectedContacts.some(c => c.id === contact.id)}
            onChange={() => handleContactToggle(contact)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm">{contact.name}</span>
        </label>
      ))}
      {/* Campos hidden para o formulário */}
    </div>
  );
}