import { signOut } from '@/app/lib/auth';
import { PowerIcon } from '@heroicons/react/24/outline';


export default function LogoutButton() {
    return (
        <form
            action={async () => {
                'use server';
                await signOut({ redirectTo: '/' });
            }}
        >
            <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-red-100 p-3 text-sm font-medium hover:bg-red-200 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3">
                <PowerIcon className="w-6" />
                <div className="hidden md:block">Sign Out</div>
            </button>
        </form>
    );
}