import { NextResponse } from "next/server";
import { user } from "@/asset/api/user";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const foundUser = user.find(u => u.email === email && u.password === password);

  if (!foundUser) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  
  return NextResponse.json(foundUser, { status: 200 });
}
