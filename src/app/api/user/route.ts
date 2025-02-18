import { NextResponse } from "next/server";
import { user, addUser, findUserByEmail } from "@/asset/api/user";

// 📌 GET: ดึงข้อมูลผู้ใช้ทั้งหมด
export async function GET() {
  return NextResponse.json(user);
}

// 📌 POST: สมัครสมาชิก
export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  // ตรวจสอบว่าอีเมลนี้มีอยู่แล้วหรือไม่
  if (findUserByEmail(email)) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  // เพิ่มผู้ใช้ใหม่
  const newUser = addUser(name, email, password);
  return NextResponse.json(newUser, { status: 201 });
}
