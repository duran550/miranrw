import { NextApiRequest } from 'next';
import dbConnect from '../lib/dbConnect';
// import { Category, categoryType } from '../models/category';
import { NextResponse } from 'next/server';
import { categoryType, Category } from '../models/Category';
import {
  CategoryAndReport,
  ReportAndCategoryType,
} from '../models/ReportAndCategory';
import { promises } from 'dns';
import mongoose from 'mongoose';
// import { Category } from '../models/Category';
export async function POST(request: any) {
  console.log('cat');

  let category: categoryType = await request.json();
  await dbConnect();
  const existingCategory = await Category.findOne({ name: category.name, status:true });

  if (existingCategory) {
    // Si la catégorie existe, renvoyer une erreur
    return NextResponse.json(
      { message: 'Category with this name already exists' },
      { status: 409 } // 409 Conflict
    );
  }
  const newCategorie = await Category.create(category);
  return NextResponse.json(newCategorie, { status: 201 });
}

export async function GET() {
  console.log(1234);

  await dbConnect();
  let categorys: categoryType[] = await Category.find({status:true})
    .populate('parent')
    .populate('children')
    .exec();
  console.log(categorys);
  
  return NextResponse.json({ categorys });
}

export async function DELETE(request: any) {
  const id = request.nextUrl.searchParams.get('id');
  await dbConnect();

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let categorys: categoryType[] = await Category.find({ parent: id })
      .session(session)
      .exec();
    if (categorys.length > 0) {
      await Promise.all(
        categorys.map(async (item) => {
          let categorys2: categoryType[] = await Category.find({
            parent: item._id,
          })
            .session(session)
            .exec();
          if (categorys2.length > 0) {
            await Promise.all(
              categorys2.map(async (items2) => {
              //   await CategoryAndReport.updateMany({
                 
                //  })
                 await CategoryAndReport.updateMany(
                   { category: items2._id! },
                   { $set: { status: false } }
                 ).session(session);
                // await CategoryAndReport.deleteMany({
                //   category: items2._id!,
                // }).session(session);
                // await Category.findByIdAndDelete(items2._id).session(session);
              })
            );
            // await Category.deleteMany({ parent: item._id }).session(session);
             await Category.updateMany(
               { parent: item._id },
               { $set: { status: false } }
             ).session(session);
            
          }
           await CategoryAndReport.updateMany(
             { category: item._id! },
             { $set: { status: false } }
           ).session(session);
          // await CategoryAndReport.deleteMany({ category: item._id }).session(
          //   session
          // );
        })
      );
      // await Category.deleteMany({ parent: id }).session(session);
       await Category.updateMany(
         { parent: id },
         { $set: { status: false } }
       ).session(session);
    }
 await CategoryAndReport.updateMany(
   { category: id },
   { $set: { status: false } }
 ).session(session);
    // await CategoryAndReport.deleteMany({ category: id }).session(session);
    await Category.findByIdAndUpdate(id, { $set: { status: false } }).session(
      session
    );

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json({ message: 'category deleted' }, { status: 200 });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json(
      { message: 'An error occurred during deletion', error: error },
      { status: 500 }
    );
  }
}
