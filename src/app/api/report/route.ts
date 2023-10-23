import { NextApiRequest } from 'next';
import dbConnect from '../lib/dbConnect';
import { Report } from '../models/Report';
import { NextResponse } from 'next/server';
import { reportType } from '@/utils/shared-types';

export async function POST(request: any) {
  let report: reportType = await request.json();
  await dbConnect();
  await Report.create(report);
  return NextResponse.json({ message: 'Report Created' }, { status: 201 });
}

export async function GET() {
  await dbConnect();
  let reports: reportType[] = await Report.find();
  return NextResponse.json({ reports });
}

export async function DELETE(request: any) {
  const id = request.nextUrl.searchParams.get('id');
  await dbConnect();
  await Report.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Report deleted' }, { status: 200 });
}
