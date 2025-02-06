import { NextResponse } from 'next/server';
import { fetchClients } from '@/app/lib/data';

export async function GET() {
    try {
      const clients = await fetchClients();
      return NextResponse.json({ clients });
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
  
      return NextResponse.json(
        { error: (error as Error).message }, // Aqui forçamos `error` a ser do tipo `Error`
        { status: 500 }
      );
    }
  }
  