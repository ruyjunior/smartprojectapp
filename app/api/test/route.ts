import { NextResponse } from 'next/server';
import { fetchFilteredUsers, fetchUsers } from '@/app/query/users/data';
import { fetchClients } from '@/app/query/clients/data';
import { fetchTasksByProject } from '@/app/query/tasks/data';

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
  
    const id = 'aede66c3-d750-4bf0-84d5-5310285c7a5c';
    try {
      fetchTimes(id);
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

try {
  const projects = await fetchProjects_test();
  return NextResponse.json({ projects });
} catch (error) {
  console.error('Erro ao buscar projects:', error);

  return NextResponse.json(
    { error: (error as Error).message }, // Aqui forçamos `error` a ser do tipo `Error`
    { status: 500 }
  );
}
}

*/

}