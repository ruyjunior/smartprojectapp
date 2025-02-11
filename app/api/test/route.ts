import { NextResponse } from 'next/server';
import { fetchClients, fetchClientById } from '@/app/lib/clients/data';
import { fetchFilteredUsers, fetchUsers } from '@/app/lib/users/data';
import { fetchCosts, fetchFilteredCosts } from '@/app/lib/costs/data';
import { fetchFilteredPlans } from '@/app/lib/plans/data';

export async function GET() {
   /* try {
      const clients = await fetchClients();
      return NextResponse.json({ clients });
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
  
      return NextResponse.json(
        { error: (error as Error).message }, // Aqui forçamos `error` a ser do tipo `Error`
        { status: 500 }
      );
    }
  
    const id = 'ea3e07e7-035d-4bd2-9623-3f36ac7d706d';
    try {
      const client = await fetchClientById(id);
      return NextResponse.json({ client });
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
  
      return NextResponse.json(
        { error: (error as Error).message }, // Aqui forçamos `error` a ser do tipo `Error`
        { status: 500 }
      );
    }
  }
  

  try {
    const users = await fetchFilteredUsers('r', 1);
    return NextResponse.json({ users });
  } catch (error) {
    console.error('Erro ao buscar users:', error);

    return NextResponse.json(
      { error: (error as Error).message }, // Aqui forçamos `error` a ser do tipo `Error`
      { status: 500 }
    );
  }
}
  

try {
  const costs = await fetchFilteredCosts("36", 1);
  return NextResponse.json({ costs });
} catch (error) {
  console.error('Erro ao buscar users:', error);

  return NextResponse.json(
    { error: (error as Error).message }, // Aqui forçamos `error` a ser do tipo `Error`
    { status: 500 }
  );
}
}
*/
try {
  const plans = await fetchFilteredPlans("", 1);
  return NextResponse.json({ plans });
} catch (error) {
  console.error('Erro ao buscar plans:', error);

  return NextResponse.json(
    { error: (error as Error).message }, // Aqui forçamos `error` a ser do tipo `Error`
    { status: 500 }
  );
}
}

  