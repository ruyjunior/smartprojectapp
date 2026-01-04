import { NextResponse } from "next/server";
import { fetchToken } from "@/app/query/tokens/data";
import { updateUserPassword } from "@/app/query/users/actions";
import { deleteToken } from "@/app/query/tokens/actions";

export async function POST(req: Request) {
  const { token, password } = await req.json();

  if (!token || password.length < 6) {
    return NextResponse.json({ error: "Token inválido ou senha muito curta." }, { status: 400 });
  }

  const tokenData = await fetchToken(token);

  if (!tokenData || new Date(tokenData.expires_at) < new Date()) {
    return NextResponse.json({ error: "Token expirado ou inválido." }, { status: 400 });
  }
  await updateUserPassword(tokenData.iduser, password);
  await deleteToken(tokenData.id);

  return NextResponse.json({ success: true });
}
