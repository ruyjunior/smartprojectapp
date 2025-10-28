"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SessionTimer() {
  const { data: session } = useSession();
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!session?.expires) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const expires = new Date(session.expires).getTime();
      const remaining = Math.max(0, expires - now);

      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [session]);

  if (!session) return <p>Você não está autenticado.</p>;
  if (timeLeft === null) return <p>Carregando...</p>;

  // Convertendo tempo para minutos e segundos
  const hours = Math.floor(timeLeft / 1000 / 60 / 60);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div>
      <h2></h2>
      <p>
        Time remaining: {hours}:{minutes}:{seconds}
      </p>
    </div>
  );
}
