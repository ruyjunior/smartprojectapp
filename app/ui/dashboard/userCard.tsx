import { auth } from '@/app/lib/auth';


export default async function UserCard() {
  const session = await auth();
  const now = new Date().getTime();
  const expires = new Date(session.expires).getTime();
  const remaining = Math.max(0, expires - now);
  
  if (!session?.user) return <p>Nenhum usuário logado.</p>;

  return (
    <div>
      <div>
        <p> User: {session.user.name} Level: {session.user.role}</p>
      </div>
    </div>
  )
}
