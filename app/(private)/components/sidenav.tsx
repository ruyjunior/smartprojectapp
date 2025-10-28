import Link from 'next/link';
import NavLinks from '@/app/(private)/components/nav-links';
import LogoApp from '@/app/ui/logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/app/lib/auth';
import UserCard from '@/app/(private)/components/userCard';

export default async function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link className="m-1 flex h-12 items-center justify-center rounded-md bg-white-400 p-6 md:h-12" href="/">
        <div className="w-28 text-white md:w-25">
          <LogoApp />
        </div>
      </Link>

      <div className="m-2 flex text-xs h-6 items-center justify-center rounded-md bg-blue-100 p-2 md:h-8">
        <UserCard />
      </div>

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-200 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
