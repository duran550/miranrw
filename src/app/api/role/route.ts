import { NextApiRequest } from 'next';
import dbConnect from '../lib/dbConnect';
import Roles from '../models/role'
import { NextResponse } from "next/server";
import { authenticate } from '../utils/decode';

export async function POST(request: any) {
  let flag = await authenticate(request)
  if (!flag) return NextResponse.json({ status: 'Error', message: 'Access Denied. Invalid Token.' }, { status: 400 });
  const { role, description } = await request.json();
  await dbConnect();
  await Roles.create({ role, description });
  return NextResponse.json({ message: "Role Created" }, { status: 201 });
}

export async function GET(request: any) {
  let flag = await authenticate(request)
  if (!flag) return NextResponse.json({ status: 'Error', message: 'Access Denied. Invalid Token.' }, { status: 400 });
  await dbConnect();
  const roles = await Roles.find();
  return NextResponse.json({ roles });
}

export async function DELETE(request: any) {
  let flag = await authenticate(request)
  if (!flag) return NextResponse.json({ status: 'Error', message: 'Access Denied. Invalid Token.' }, { status: 400 });
  const id = request.nextUrl.searchParams.get("id");
  await dbConnect();
  await Roles.findByIdAndDelete(id);
  return NextResponse.json({ message: "Role deleted" }, { status: 200 });
}
