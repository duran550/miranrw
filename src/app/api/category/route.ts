import dbConnect from '../lib/dbConnect';
import { NextResponse } from 'next/server';
import { authenticate } from '../utils/decode';
import { Category } from '../models/Category';
import { category_schema } from '../validators/validate';

export async function POST(request: any) {
  // let flag = await authenticate(request)
  // if (!flag) return NextResponse.json({ status: 'Error', message: 'Access Denied. Invalid Token.' }, { status: 400 });
  const {error, value} = await category_schema.validate(await request.json())
  if(error) return NextResponse.json({ message: error.details[0].message }, { status: 400 });
  let category: any = value;
  await dbConnect();
  await Category.create(category);
  return NextResponse.json({ message: 'Category Created' }, { status: 201 });
}

export async function GET(request: any) {
  // let flag = await authenticate(request)
  // if (!flag) return NextResponse.json({ status: 'Error', message: 'Access Denied. Invalid Token.' }, { status: 400 });
  await dbConnect();
  let categorys: any[] = await Category.find();
  return NextResponse.json({ categorys });
}

export async function DELETE(request: any) {
  // let flag = await authenticate(request)
  // if (!flag) return NextResponse.json({ status: 'Error', message: 'Access Denied. Invalid Token.' }, { status: 400 });
  const id = request.nextUrl.searchParams.get('id');
  await dbConnect();
  await Category.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Category deleted' }, { status: 200 });
}
