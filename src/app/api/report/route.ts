import { NextApiRequest } from 'next';
import dbConnect from '../lib/dbConnect';
import { Report } from '../models/Report';
import { NextResponse } from 'next/server';
import { reportType } from '@/utils/shared-types';
// import { middleware_1 } from '@/middleware/middleware';
import { authenticate } from '../utils/decode';
import {rateLimitMiddleware} from '../utils/limiter';
import UpdateReport from '../models/UpdateReport';

export async function POST(request: any) {
  let pass= await rateLimitMiddleware(request)
  if (!pass) return NextResponse.json({ status: 'Error', message: 'Too Many Requests.' }, { status: 400 });
  let report: reportType = await request.json();
  await dbConnect();
  await Report.create(report);
  return NextResponse.json({ message: 'Report Created' }, { status: 201 });
}

export async function GET(request: any) {
  // let pass= await rateLimitMiddleware(request)
  // if (!pass) return NextResponse.json({ status: 'Error', message: 'Too Many Requests.' }, { status: 400 });
  // let user:any = await authenticate(request)
  // if (!user) return NextResponse.json({ status: 'Error', message: 'Access Denied. Invalid Token.' }, { status: 400 });
  await dbConnect();
 let data: any = await UpdateReport.find();
  // let role = user.role
   let reports: reportType[] = await Report.find({
    $or: [
      { status: 'pending' },
      { status: 'Irrelevant' },
      { status: 'cleaned' }
    ],
  }).populate('updatereport');
  return NextResponse.json(reports);
  //  let reports: reportType[] = await Report.
//   if (role == 4) {
   
//     let reports: reportType[] = await Report.find(
//     { $or:[ { status: 'Dangerous' },
//       { status: 'Managed' }],}
//     ).populate('updatereport');
  
    
//   return NextResponse.json(reports);
//  }
//  if(role==3){
//   let reports: reportType[] = await Report.find({
//     $or: [
//       { status: 'pending' },
//       { status: 'Irrelevant' },
//       { status: 'cleaned' }
//     ],
//   }).populate('updatereport');
//   return NextResponse.json(reports);
//  }

//  if(role==1 || role==2){
//   let reports: reportType[] = await Report.find({
//     $nor: [{ status: 'pending' }],
//   }).populate('updatereport');
//   return NextResponse.json(reports);
//  }
 return NextResponse.json({ status: 'Error', message: 'Access Denied.' }, { status: 400 });
 
}

export async function DELETE(request: any) {
  let pass= await rateLimitMiddleware(request)
  if (!pass) return NextResponse.json({ status: 'Error', message: 'Too Many Requests.' }, { status: 400 });
  let user = await authenticate(request)
  if (!user) return NextResponse.json({ status: 'Error', message: 'Access Denied. Invalid Token.' }, { status: 400 });
  const id = request.nextUrl.searchParams.get('id');
  await dbConnect();
  // await Report.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Access Denied..' }, { status: 400 });
}
