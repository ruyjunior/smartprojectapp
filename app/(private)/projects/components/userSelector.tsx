'use client';
import { useState, useEffect } from 'react';
import { UserIcon } from '@heroicons/react/24/outline';
import { User } from '@/app/query/users/definitions';

interface UserSelectorProps {
  users: User[];
  selectedUsers: User[];
  onUsersChange: (users: User[]) => void;
}

export default function UserSelector({
  users,
  selectedUsers,
  onUsersChange,
}: UserSelectorProps) {

  const handleUserToggle = (user: User) => {
    const newSelectedUsers = selectedUsers.some(u => u.id === user.id)
      ? selectedUsers.filter(u => u.id !== user.id)
      : [...selectedUsers, user];
    //console.log('Project Users:', newSelectedUsers);

    onUsersChange(newSelectedUsers);
  };

  return (
    <div className="mb-4">
      <label className="mb-2 block text-sm font-medium">
        Select Users
      </label>

      {/* Seleção de Usuários */}
      <div className="mb-4">
        <div className="text-sm font-medium text-gray-700 mb-2">Users:</div>
        <div className="space-y-3">
          {users.map(user => (
            <div key={user.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
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
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedUsers.some(u => u.id === user.id)}
                    onChange={() => handleUserToggle(user)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-600">{user.email}</p>
                    <p className="text-xs text-blue-600 capitalize">{user.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>   

      {/* Campos hidden para o formulário */}
      {selectedUsers.map(user => (
        <input key={`user-${user.id}`} type="hidden" name="users" value={user.id} />
      ))}
    </div>    
  );
}