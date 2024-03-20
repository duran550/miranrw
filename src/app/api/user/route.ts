import { NextApiRequest } from 'next';
import bcrypt from 'bcrypt';
import dbConnect from '../lib/dbConnect';
import User from '../models/user'
import { NextResponse } from "next/server";
import { create_user_schema } from '../validators/validate';

export async function POST(request: any) {
  const {error, value} = await create_user_schema.validate(await request.json())
  if(error) return NextResponse.json({ message: error.details[0].message }, { status: 400 });
  let { fullname, password, email, role } = await request.json();
  await dbConnect();
   const is_exist=  await User.find({email: email})
   
   if (is_exist.length) {
    return NextResponse.json({ message: "This email is use please provide another one" }, { status: 401 });
   }
  const hash= await bcrypt.hash(password, 12)
  password= hash
  await User.create({ fullname,role,password, email });
  return NextResponse.json({ message: "Role Created" }, { status: 201 });
}

export async function GET() {
  await dbConnect();
  const users = await User.find();
  return NextResponse.json({ users });
}

export async function DELETE(request: any) {
  
  
  const id = request.nextUrl.searchParams.get("id");
  await dbConnect();
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: "Role deleted" }, { status: 200 });
}
