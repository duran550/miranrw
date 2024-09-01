import { NextApiRequest } from 'next';
import dbConnect from '../../lib/dbConnect';
// import { Category, categoryType } from '../models/category';
import { NextResponse } from 'next/server';
import {
  CategoryAndReport,
  ReportAndCategoryType,
} from '../../models/ReportAndCategory';
// import { Category } from '../models/Category';
// export async function POST(request: any) {
//   let CAR: ReportAndCategoryType = await request.json();
//   await dbConnect();

//   const newCategorie = await CategoryAndReport.create(CAR);
//   return NextResponse.json(newCategorie, { status: 201 });
// }

export async function GET(request: any, { params }: any) {
  console.log(params);
  
  const { id } = params;
  await dbConnect();
  let data: any[] = await CategoryAndReport.findOne({ report: id })
    .populate('Category')
    .populate('Report')
    .exec();
  return NextResponse.json({ data });
}

export async function DELETE(request: any) {
  const id = request.nextUrl.searchParams.get('id');
  await dbConnect();
  await CategoryAndReport.findByIdAndDelete(id);
  // await Category.deleteMany()
  return NextResponse.json({ message: 'category deleted' }, { status: 200 });
}
