import { NextResponse } from "next/server";
import { user } from "@/asset/api/user";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  const existingUser = user.find(user => user.email === email);

  if (existingUser) {
    return NextResponse.json({ error: "Email already in use" }, { status: 400 });
  }

  const newUser = { name, email, password };
  user.push(newUser);

  return NextResponse.json(newUser, { status: 201 });
}
