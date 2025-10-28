import { Suspense } from 'react';
import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import NavLinks from './components/nav-links';

export const metadata: Metadata = {
  title: 'Settings',
};

export default async function Page() {

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Settings</h1>
      </div>
      <div className="w-full flex-none md:w-60">
        <NavLinks />
      </div>
    </div>
  );
}