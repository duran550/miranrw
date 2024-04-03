import dbConnect from '../lib/dbConnect';
import { NextResponse } from 'next/server';
import { authenticate } from '../utils/decode';
import { Category } from '../models/Category';
import { category_schema } from '../validators/validate';
import { CategoryOption } from '../models/Category_Options';
import { rateLimitMiddleware } from '../utils/limiter';

export async function POST(request: any) {
  let pass= await rateLimitMiddleware(request)
  if (!pass) return NextResponse.json({ status: 'Error', message: 'Too Many Requests.' }, { status: 400 });
  let flag = await authenticate(request)
  if (!flag) return NextResponse.json({ status: 'Error', message: 'Access Denied. Invalid Token.' }, { status: 400 });
  const {error, value} = await category_schema.validate(await request.json())
  if(error) return NextResponse.json({ message: error.details[0].message }, { status: 400 });
  let category: any = value;
  await dbConnect();
  let exist = await Category.find({ 'name': category.name })
  if (exist.length) return NextResponse.json({ status: 'Error', message: 'Category already exist.' }, { status: 400 });
  await Category.create(category);
  return NextResponse.json({ message: 'Category Created' }, { status: 201 });
}

export async function GET(request: any) {
  let pass= await rateLimitMiddleware(request)
  if (!pass) return NextResponse.json({ status: 'Error', message: 'Too Many Requests.' }, { status: 400 });
  // let flag = await authenticate(request)
  // if (!flag) return NextResponse.json({ status: 'Error', message: 'Access Denied. Invalid Token.' }, { status: 400 });
  await dbConnect();
  let categorys: any[] = await Category.find()
  let arr:any=[]
  let obj:any={}
  if (categorys.length) {
    for await (let category of categorys) {
      let options = await CategoryOption.find({ category: category._id })
     
      obj['category']=category
      obj['options']=options
      arr.push(obj)
    }
    return NextResponse.json({ 'categorys': arr });
  }else{
    return NextResponse.json({ categorys});
  }
  
}

export async function DELETE(request: any) {
  let pass= await rateLimitMiddleware(request)
  if (!pass) return NextResponse.json({ status: 'Error', message: 'Too Many Requests.' }, { status: 400 });
  let flag = await authenticate(request)
  if (!flag) return NextResponse.json({ status: 'Error', message: 'Access Denied. Invalid Token.' }, { status: 400 });
  const id = request.nextUrl.searchParams.get('id');
  await dbConnect();
  await Category.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Category deleted' }, { status: 200 });
}
