import { NextApiRequest } from 'next';
import bcrypt from 'bcrypt';
import dbConnect from '../lib/dbConnect';
import User from '../models/user';
import { NextResponse } from 'next/server';

export async function POST(request: any) {
  let { fullname, password, email, role } = await request.json();
  // console.log(fullname, password, email, role, '99999999900000000');
  await dbConnect();
  const is_exist = await User.find({ email: email });

  if (is_exist.length) {
    return NextResponse.json(
      { message: 'This email is use please provide another one' },
      { status: 401 }
    );
  }
  const hash = await bcrypt.hash(password, 12);
  password = hash;
  const result = await User.create({ fullname, role, password, email });
  return NextResponse.json(
    { message: 'Role Created', result: result },
    { status: 201 }
  );
}

export async function GET() {
  await dbConnect();
  const users = await User.find();
  return NextResponse.json({ users });
}
