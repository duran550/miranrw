import { NextApiRequest } from 'next';
import dbConnect from '../../lib/dbConnect';
import { Report } from '../../models/Report';
import { NextResponse } from 'next/server';
import { reportType } from '@/utils/shared-types';
import { authenticate } from '../../utils/decode';

export async function PUT(request: any, { params }: any) {
  let flag = await authenticate(request);
  if (!flag)
    return NextResponse.json(
      { status: 'Error', message: 'Access Denied. Invalid Token.' },
      { status: 400 }
    );
  const { id } = params;

  const report: reportType = await request.json();
  await dbConnect();
  console.log(id);
  console.log(report);
  console.log('request', params);

  await Report.findByIdAndUpdate(id, report);
  return NextResponse.json({ message: 'Report updated' }, { status: 200 });
}

export async function GET(request: any, { params }: any) {
  let flag = await authenticate(request)
  if (!flag) return NextResponse.json({ status: 'Error', message: 'Access Denied. Invalid Token.' }, { status: 400 });
  const { id } = params;
  await dbConnect();
  const report = await Report.findOne({ _id: id });
  return NextResponse.json({ report }, { status: 200 });
}
