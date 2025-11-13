import SideNav from '@/app/(private)/components/sidenav';
import { SessionProvider } from "next-auth/react";

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | SMART PROJECT',
    default: 'SMART PROJECT',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-60">
          <SideNav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          {children}
        </div>
      </div>
    </SessionProvider>
  );
}