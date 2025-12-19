'use client';
import { useActionState, useTransition } from 'react';
import React, { useState } from 'react';
import { File } from '@/app/query/files/definitions';
import {
  ClockIcon, UserCircleIcon, CalendarDateRangeIcon,
  TagIcon, DocumentTextIcon, HandThumbUpIcon, ExclamationTriangleIcon, DocumentCheckIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateFile, State } from '@/app/query/files/actions';
import { upload } from '@vercel/blob/client';


export default function EditFileForm({
  file,
}: {
  file: File;
}) {
  const initialState: State = { message: '', errors: {} };
  const updateFileWithId = (state: State = initialState, formData: FormData) => updateFile(file.id, state, formData);
  const [state, formAction] = useActionState(updateFileWithId, initialState);
  const [isPending, startTransition] = useTransition();
  const [fileUrl, setFileUrl] = useState<string | null>(file.url ?? null);
  const [uploading, setUploading] = useState(false);


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(() => {
      formAction(new FormData(e.currentTarget));
    });
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const newBlob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      });
      setFileUrl(newBlob.url);
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={formAction} onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <input type="hidden" name="idproject" value={file.idproject} />

        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Enter a title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                defaultValue={file.title}
                placeholder="Enter a title"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="title-error"
              />
              <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="title-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.title &&
                state.errors.title.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="mb-4">
          <label htmlFor="comments" className="mb-2 block text-sm font-medium">
            Enter a comments
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="comments"
                name="comments"
                type="text"
                defaultValue={file.comments}
                placeholder="Enter a comments"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="comments-error"
              />
              <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="comments-error" aria-live="polite" aria-atomic="true">
              {state.errors?.comments &&
                state.errors.comments.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* File Url */}
        <div className="mb-4">
          <label htmlFor="avatar" className="mb-2 block text-sm font-medium">
            File
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="file"
                name="file"
                type="file"
                accept="application/pdf"
                className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-200"
                onChange={handleFileChange}
                disabled={uploading}
              />
              <span className='text-sm '>
                Documments
              </span>
            </div>
            <div>
              {uploading && <p className="text-xs text-blue-600 mt-1">Enviando file...</p>}
              {fileUrl && (
                <div className="mt-2">
                  <span className="text-xs text-green-600">File uploaded successfully!</span>
                  <input type="hidden" name="url" value={fileUrl} />
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={'/projects/' + file.idproject + '/files'}
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
