import { NextResponse } from 'next/server';
import { fetchClients, fetchClientById } from '@/app/lib/clients/data';

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
  */
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



  