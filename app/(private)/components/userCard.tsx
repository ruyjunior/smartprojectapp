import { auth } from '@/app/lib/auth';
import { CurrentUser } from '@/app/utils/utils';
import Image from 'next/image';
import Link from "next/link";
import Logo from '@/app/ui/logo';
import logo from '@/public/images/logo.png';



export default async function UserCard() {
  const session = await auth();
  if (!session) return <p>Nenhuma sessão</p>;
  if (!session.user) return <p>Nenhum usuário logado.</p>;
  const user = await CurrentUser();

  return (
    <Link href="/settings/users" className="block group">
      <div className="flex flex-col items-center gap-2 text-blue-600 py-4">
        <span className="font-semibold text-base">{session.user.name}</span>
        <Image
          src={user.avatarurl ? user.avatarurl : logo}
          alt="Avatar"
          width={200}
          height={200}
          className="h-10 w-10 md:h-20 md:w-20 rounded-full"
        />
        <span className="text-xs text-blue-600">{session.user.role}</span>
        {/*
        <span className="text-xs text-blue-100">Ativo até {expires.toLocaleDateString('pt-BR')}</span> 
        */}
      </div>
    </Link>);
}