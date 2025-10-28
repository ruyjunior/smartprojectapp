import { auth } from '@/app/lib/auth';


export default async function UserCard() {
  const session = await auth();
  if (!session) return <p>Nenhuma sessão</p>;  
  if (!session.user) return <p>Nenhum usuário logado.</p>;

  return (
    <div>
      <div>
        <p> {session.user.name} | {session.user.role}</p>
      </div>
    </div>
  )
}
