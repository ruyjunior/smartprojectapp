'use client';
import { useActionState, useTransition, useEffect, useState } from 'react';
import { User } from '@/app/query/users/definitions';
import { TagIcon, AtSymbolIcon, KeyIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateUser, State } from '@/app/query/users/actions';
import { upload } from '@vercel/blob/client';

export default function EditUserForm({
  user, currentUser
}: {
  user: User;
  currentUser: User | null;
}) {
  
  const initialState: State = { message: null, errors: {} };
  const updateUserWithId = updateUser.bind(null, user.id);
  const [state, formAction] = useActionState(updateUserWithId, initialState);
  const [isPending, startTransition] = useTransition();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(user.avatarurl ?? null);
  const [uploading, setUploading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(() => {
      formAction(new FormData(e.currentTarget));
    });
  }

    async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const newBlob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      });
      setAvatarUrl(newBlob.url);
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={formAction} onSubmit={handleSubmit} className="mt-6">
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* NAME */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Edit name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter a name"
                defaultValue={user.name}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-error"
              />
              <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name &&
                state.errors.name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* EMAIL */}
        <input type="hidden" name="email" value={user.email} />

        {/* PASSWORD */}
        <div className="mb-4">
          <label htmlFor="password" className="mb-2 block text-sm font-medium">
            Change password
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter a password"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="password-error"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="password-error" aria-live="polite" aria-atomic="true">
              {state.errors?.password &&
                state.errors.password.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Role */}
        <div className="mb-4">
          <label htmlFor="role" className="mb-2 block text-sm font-medium">
            Choose Role
          </label>
          <div className="relative">
            <select
              id="role"
              name="role"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={user.role}
              aria-describedby="role-error"
            >
              {currentUser?.role === 'admin' ? (
                <>
                  <option value="oper"> Operator</option>
                  <option value="admin"> Administrator</option>
                </>
              ) : (
                <option value="oper"> Operator</option>
              )}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="role-error" aria-live="polite" aria-atomic="true">
            {state.errors?.role &&
              state.errors.role.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Avatar */}
        <div className="mb-4">
          <label htmlFor="avatar" className="mb-2 block text-sm font-medium">
            Avatar
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="avatar"
                name="avatar"
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-200"
                onChange={handleAvatarChange}
                disabled={uploading}
              />
              <span className='text-sm '>
                Imagens jpg, jpeg, png com tamanho de no máximo 1MB - 200x200
              </span>
            </div>
            <div>
              {uploading && <p className="text-xs text-blue-600 mt-1">Enviando avatar...</p>}
              {avatarUrl && (
                <div className="mt-2">
                  <img src={avatarUrl} alt="Preview" className="h-20 rounded-md" />
                  <input type="hidden" name="avatarurl" value={avatarUrl} />
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/settings/users"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit" disabled={isPending} aria-disabled={isPending} isPending={isPending}>
          Salvar
        </Button>
      </div>
    </form>
  );
}
