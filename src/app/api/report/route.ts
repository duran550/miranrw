import { NextApiRequest } from 'next';
import dbConnect from '../lib/dbConnect';
import { Report } from '../models/Report';
import { NextResponse } from 'next/server';
import { reportType } from '@/utils/shared-types';
import { middleware_1 } from '@/middleware/middleware';
import { authenticate } from '../utils/decode';

export async function POST(request: any) {
  let flag = await authenticate(request)
  if (!flag) return NextResponse.json({ status: 'Error', message: 'Access Denied. Invalid Token.' }, { status: 400 });
  let report: reportType = await request.json();
  await dbConnect();
  await Report.create(report);
  return NextResponse.json({ message: 'Report Created' }, { status: 201 });
}

export async function GET(request: any) {
  // let flag = await authenticate(request)
  // if (!flag) return NextResponse.json({ status: 'Error', message: 'Access Denied. Invalid Token.' }, { status: 400 });
  await dbConnect();
  let reports: reportType[] = await Report.find();
  return NextResponse.json({ reports });
}

export async function DELETE(request: any) {
  let flag = await authenticate(request)
  if (!flag) return NextResponse.json({ status: 'Error', message: 'Access Denied. Invalid Token.' }, { status: 400 });
  const id = request.nextUrl.searchParams.get('id');
  await dbConnect();
  await Report.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Report deleted' }, { status: 200 });
}
