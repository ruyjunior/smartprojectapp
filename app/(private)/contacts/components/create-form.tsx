'use client';
import { useActionState, useTransition } from 'react';
import React, { useState } from 'react';
import { Client } from '@/app/query/clients/definitions';
import Link from 'next/link';
import {
  IdentificationIcon, PhoneIcon, TagIcon, TruckIcon, CurrencyDollarIcon,
  AtSymbolIcon, CalendarDateRangeIcon, BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createContact, State } from '@/app/query/contacts/actions';

import {
  formatDateToLocal, formatCurrency, formatCurrencyInput,
  formatCPF, formatCEP, formatPhone, formatDateBr
} from '@/app/utils/utils';


export default function Form({ clients, idcompany }: { clients: Client[], idcompany: string | undefined }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createContact, initialState);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(() => {
      formAction(new FormData(e.currentTarget));
    });
  }
  const [phone, setPhone] = useState('');
  const [cep, setCEP] = useState('');
  const [cpf, setCPF] = useState('');
  const [birth, setBirth] = useState('');

  const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhone(event.target.value);
    setPhone(formattedPhone);
  };
  const handleChangeCEP = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCEP = formatCEP(event.target.value);
    setCEP(formattedCEP);
  };
  const handleChangeCPF = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCPF = formatCPF(event.target.value);
    setCPF(formattedCPF);
  };
  const handleChangeBirth = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedBirth = formatDateBr(event.target.value);
    setBirth(formattedBirth);
  };

  return (
    <form action={formAction} onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        <input type="hidden" name="idcompany" value={idcompany} />

        {/* Client */}
        <div className="mb-4">
          <label htmlFor="idclient" className="mb-2 block text-sm font-medium">
            Choose a Client
          </label>
          <div className="relative">
            <select
              id="idclient"
              name="idclient"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="idclient-error"
            >
              <option value="" disabled>
                Select a client
              </option>
              <option value={idcompany}> Intra Contact </option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
            <BuildingOfficeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="company-error" aria-live="polite" aria-atomic="true">
            {state.errors?.idclient &&
              state.errors.idclient.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

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

        {/*
        
        <div className="mb-4">
          <label htmlFor="price" className="mb-2 block text-sm font-medium">
            Enter a price
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="price"
                name="price"
                type="currency"
                placeholder="Enter a price"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="price-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        */}

        {/* CPF */}
        <div className="mb-4">
          <label htmlFor="cpf" className="mb-2 block text-sm font-medium">
            Enter a CPF
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="cpf"
                name="cpf"
                type="text"
                value={cpf}
                maxLength={14}
                onChange={handleChangeCPF}
                placeholder="Enter a CPF"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="cpf-error"
              />
              <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* BIRTH */}
        <div className="mb-4">
          <label htmlFor="birth" className="mb-2 block text-sm font-medium">
            Enter a birth
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="birth"
                name="birth"
                type="date"
                //value={birth}
                maxLength={10}
                //onChange={handleChangeBirth}
                placeholder="Enter a birth"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="birth-error"
              />
              <CalendarDateRangeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Enter a email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Enter a email"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="email-error"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
                value={phone}
                maxLength={15}
                onChange={handleChangePhone}
                placeholder="Enter a phone"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="phone-error"
              />
              <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* CEP */}
        <div className="mb-4">
          <label htmlFor="cep" className="mb-2 block text-sm font-medium">
            Enter a CEP
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="cep"
                name="cep"
                type="text"
                value={cep}
                maxLength={9}
                onChange={handleChangeCEP}
                placeholder="Enter a CEP"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="cep-error"
              />
              <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/contacts"
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
