import { NextApiRequest } from 'next';
import dbConnect from '../lib/dbConnect';
import Roles from '../models/role'
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const { role, description } = await request.json();
  await dbConnect();
  await Roles.create({ role, description });
  return NextResponse.json({ message: "Role Created" }, { status: 201 });
}

export async function GET() {
  await dbConnect();
  const roles = await Roles.find();
  return NextResponse.json({ roles });
}

export async function DELETE(request: any) {
  const id = request.nextUrl.searchParams.get("id");
  await dbConnect();
  await Roles.findByIdAndDelete(id);
  return NextResponse.json({ message: "Role deleted" }, { status: 200 });
}
