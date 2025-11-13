import NavLinks from '@/app/(private)/components/nav-links';
import Logo, { LogoCompany } from '@/app/ui/logo';
import UserCard from '@/app/(private)/components/userCard';
import LogoutButton from '@/app/(private)/components/logoutButton';

export default async function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <LogoCompany />
      <NavLinks />
      {/* Espaço Vazio */}
      <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
      <UserCard />
      <LogoutButton />
      <Logo />
    </div>
  );
}