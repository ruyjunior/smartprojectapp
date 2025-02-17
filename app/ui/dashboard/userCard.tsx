import { auth } from '@/app/lib/auth';


export default async function UserCard() {
  const session = await auth();
  if (!session) return <p>Nenhum usuário logado.</p>;  
  if (!session.user) return <p>Nenhum usuário logado.</p>;

  return (
    <div>
      <div>
        <p> User: {session.user.name} Level: {session.user.role}</p>
      </div>
    </div>
  )
}
