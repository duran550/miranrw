import { NextApiRequest } from 'next';
import dbConnect from '../lib/dbConnect';
// import { Category, categoryType } from '../models/category';
import { NextResponse } from 'next/server';
import {
  CategoryAndReport,
  ReportAndCategoryType,
} from '../models/ReportAndCategory';
import { Report } from '../models/Report';
// import { Category } from '../models/Category';
export async function POST(request: any) {
  let CAR: ReportAndCategoryType = await request.json();
  await dbConnect();
  console.log(CAR, 'car1111111111111111');

  const newCategorie = await CategoryAndReport.create(CAR);

  const rep = await Report.findByIdAndUpdate(
    CAR.report,
    { $push: { categoryandreports: newCategorie._id } },
    { new: true }
  );

  console.log('rep==========', rep);

  return NextResponse.json(newCategorie, { status: 201 });
}

export async function GET() {
  await dbConnect();
  let data: any[] = await CategoryAndReport.find({ status: true })
    .populate('category')
    .populate('report')
    .exec();
  return NextResponse.json({ data });
}

export async function DELETE(request: any) {
  const id = request.nextUrl.searchParams.get('id');
  await dbConnect();
  //  const reportAndCategory= await CategoryAndReport.findById(id);

  const deletd = await CategoryAndReport.findByIdAndDelete(id);
  if (deletd) {
    const rep = await Report.findByIdAndUpdate(
      deletd.report,
      { $pull: { categoryandreports: id } },
      { new: true } // Renvoie le document mis à jour
    );
    console.log('rep==========', rep);
  }
  console.log('deletd========', deletd);

  // await CategoryAndReport.deleteMany()
  return NextResponse.json(
    { message: 'categorization deleted' },
    { status: 200 }
  );
}
