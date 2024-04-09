import dbConnect from '../lib/dbConnect';
import { NextResponse } from 'next/server';
import { authenticate } from '../utils/decode';
import { Category } from '../models/Category';
import { CategoryOption } from '../models/Category_Options';
import { category_option_schema } from '../validators/validate';
import { rateLimitMiddleware } from '../utils/limiter';

export async function POST(request: any) {
  let pass= await rateLimitMiddleware(request)
  if (!pass) return NextResponse.json({ status: 'Error', message: 'Too Many Requests.' }, { status: 400 }); 
  let flag = await authenticate(request)
  if (!flag) return NextResponse.json({ status: 'Error', message: 'Access Denied. Invalid Token.' }, { status: 400 });
  const {error, value} = await category_option_schema.validate(await request.json())
  if(error) return NextResponse.json({ message: error.details[0].message }, { status: 400 });
  let options: any =  value;
  await dbConnect();
  await CategoryOption.create(options);
  return NextResponse.json({ message: 'Options Created' }, { status: 201 });
}

export async function GET(request: any) {
  let pass= await rateLimitMiddleware(request)
  if (!pass) return NextResponse.json({ status: 'Error', message: 'Too Many Requests.' }, { status: 400 });
  let flag = await authenticate(request)
  if (!flag) return NextResponse.json({ status: 'Error', message: 'Access Denied. Invalid Token.' }, { status: 400 });
  await dbConnect();
  let options: any[] = await CategoryOption.find().populate('category');
  return NextResponse.json({ options });
}

export async function DELETE(request: any) {
  let pass= await rateLimitMiddleware(request)
  if (!pass) return NextResponse.json({ status: 'Error', message: 'Too Many Requests.' }, { status: 400 });
  let flag = await authenticate(request)
  if (!flag) return NextResponse.json({ status: 'Error', message: 'Access Denied. Invalid Token.' }, { status: 400 });
  const id = request.nextUrl.searchParams.get('id');
  await dbConnect();
  await CategoryOption.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Options deleted' }, { status: 200 });
}