'use client';
import { useActionState, useTransition } from 'react';
import React, { useState } from 'react';
import { Companies } from '@/app/query/companies/definitions';
import { IdentificationIcon, TagIcon, PhoneIcon, AtSymbolIcon, GlobeAltIcon, TruckIcon, ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateCompany, State } from '@/app/query/companies/actions';
import { formatCNPJ, formatPhone } from '@/app/utils/utils';
import { upload } from '@vercel/blob/client';
import Loading from './loading';


export default function EditCompanyForm({
  company,
}: {
  company: Companies;
}) {
  const initialState: State = { message: null, errors: {} };
  const updateCompanyWithId = updateCompany.bind(null, company.id);
  const [state, formAction] = useActionState(updateCompanyWithId, initialState);
  const [cnpj, setCNPJ] = useState(formatCNPJ(company.cnpj));
  const [phone, setPhone] = useState(formatPhone(company.phone));
  const [isPending, startTransition] = useTransition();
  const [logoUrl, setLogoUrl] = useState<string | null>(company.logourl ?? null);
  const [uploading, setUploading] = useState(false);


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(() => {
      formAction(new FormData(e.currentTarget));
    });
  }

  const handleChangeCNPJ = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCNPJ = formatCNPJ(event.target.value);
    setCNPJ(formattedCNPJ);
  };

  const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhone(event.target.value);
    setPhone(formattedPhone);
  }

  // Upload avatar ao selecionar arquivo
  async function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const newBlob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      });
      setLogoUrl(newBlob.url);
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={formAction} onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* NAME */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Enter a name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter a name"
                defaultValue={company.name}
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

        {/* CNPJ */}
        <div className="mb-4">
          <label htmlFor="cnpj" className="mb-2 block text-sm font-medium">
            Enter a cnpj
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="cnpj"
                name="cnpj"
                type="text"
                placeholder="Enter a cnpj"
                value={cnpj}
                maxLength={18}
                onChange={handleChangeCNPJ}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="cnpj-error"
              />
              <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="cnpj-error" aria-live="polite" aria-atomic="true">
              {state.errors?.cnpj &&
                state.errors.cnpj.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* PHONE */}
        <div className="mb-4">
          <label htmlFor="phone" className="mb-2 block text-sm font-medium">
            Enter a phone
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="phone"
                name="phone"
                type="text"
                placeholder="Enter a phone"
                value={phone}
                maxLength={15}
                onChange={handleChangePhone}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="phone-error"
              />
              <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="phone-error" aria-live="polite" aria-atomic="true">
              {state.errors?.phone &&
                state.errors.phone.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Enter an email
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter an email"
              defaultValue={company.email}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            <div id="email-error" aria-live="polite" aria-atomic="true">
              {state.errors?.email &&
                state.errors.email.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Url Site */}
        <div className="mb-4">
          <label htmlFor="siteurl" className="mb-2 block text-sm font-medium">
            Enter a URL
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="siteurl"
              name="siteurl"
              type="text"
              placeholder="Enter a URL"
              defaultValue={company.siteurl}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <GlobeAltIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            <div id="siteurl-error" aria-live="polite" aria-atomic="true">
              {state.errors?.siteurl &&
                state.errors.siteurl.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Local Address */}
        <div className="mb-4">
          <label htmlFor="localaddress" className="mb-2 block text-sm font-medium">
            Enter a local address
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="localaddress"
              name="localaddress"
              type="text"
              placeholder="Enter a local address"
              defaultValue={company.localaddress}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            <div id="localaddress-error" aria-live="polite" aria-atomic="true">
              {state.errors?.localaddress &&
                state.errors.localaddress.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Slogan */}
        <div className="mb-4">
          <label htmlFor="slogan" className="mb-2 block text-sm font-medium">
            Enter a Slogan
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="slogan"
              name="slogan"
              type="text"
              placeholder="Enter a slogan phrafe"
              defaultValue={company.slogan}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <ChatBubbleOvalLeftIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            <div id="slogan-error" aria-live="polite" aria-atomic="true">
              {state.errors?.slogan &&
                state.errors.slogan.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Company Logo */}
        <div className="mb-4">
          <label htmlFor="logourl" className="mb-2 block text-sm font-medium">
            Comapany Logo 
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="url"
                name="url"
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-200"
                onChange={handleLogoChange}
                disabled={uploading}
              />
              <span className='text-sm '>
                Imagens jpg, jpeg, png com tamanho de no máximo 1MB - 200x200
              </span>
            </div>
            <div>
              {uploading && <p className="text-xs text-blue-600 mt-1">Enviando avatar...</p>}
              {logoUrl && (
                <div className="mt-2">
                  <img src={logoUrl} alt="Preview" className="h-20 rounded-md" />
                  <input type="hidden" name="logourl" value={logoUrl} />
                </div>
              )}
            </div>
          </div>
        </div>


      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/settings/company"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit" disabled={isPending} aria-disabled={isPending} isPending={isPending}>
          Salvar
        </Button>
      </div>
    </form >
  );
}
