import { NextApiRequest } from 'next';
import bcrypt from 'bcrypt';
import dbConnect from '../lib/dbConnect';
import User from '../models/user'
import { NextResponse } from "next/server";
import { create_user_schema, update_user_schema } from '../validators/validate';
import { authenticate } from '../utils/decode';
import { rateLimitMiddleware } from '../utils/limiter';

export async function POST(request: any) {
  let pass= await rateLimitMiddleware(request)
  if (!pass) return NextResponse.json({ status: 'Error', message: 'Too Many Requests.' }, { status: 400 });
  let flag = await authenticate(request)
  if (!flag) return NextResponse.json({ status: 'Error', message: 'Access Denied. Invalid Token.' }, { status: 400 });
  const {error, value} = await create_user_schema.validate(await request.json())
  console.log(error);
  
  if(error) return NextResponse.json({ message: error.details[0].message }, { status: 400 });
  let { fullname, password, email, role } = value;
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

export async function GET(request: any) {
  let pass = await rateLimitMiddleware(request);
  if (!pass)
    return NextResponse.json(
      { status: 'Error', message: 'Too Many Requests.' },
      { status: 400 }
    );
  let flag = await authenticate(request)
  if (!flag) return NextResponse.json({ status: 'Error', message: 'Access Denied. Invalid Token.' }, { status: 400 });
  await dbConnect();
  const users = await User.find();
  return NextResponse.json({ users });
}


export async function PUT(request: any, { params }: any) {
  let pass = await rateLimitMiddleware(request);
  if (!pass)
    return NextResponse.json(
      { status: 'Error', message: 'Too Many Requests.' },
      { status: 400 }
    );
  let flag = await authenticate(request)
  if (!flag) return NextResponse.json({ status: 'Error', message: 'Access Denied. Invalid Token.' }, { status: 400 });
  const { id } = params;

  // const user= await request.json();
  const {error, value} = await update_user_schema.validate(await request.json())
  if(error) return NextResponse.json({ message: error.details[0].message }, { status: 400 });

  await dbConnect();
  await User.findByIdAndUpdate(id, { value });
  return NextResponse.json({ message: 'User updated' }, { status: 200 });
}

export async function DELETE(request: any) {
  let pass = await rateLimitMiddleware(request);
  if (!pass)
    return NextResponse.json(
      { status: 'Error', message: 'Too Many Requests.' },
      { status: 400 }
    );
  let flag = await authenticate(request)
  if (!flag) return NextResponse.json({ status: 'Error', message: 'Access Denied. Invalid Token.' }, { status: 400 });
  const id = request.nextUrl.searchParams.get("id");
  await dbConnect();
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: "Role deleted" }, { status: 200 });
}
