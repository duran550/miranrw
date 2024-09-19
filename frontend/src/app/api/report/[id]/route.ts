import mongoose from 'mongoose';
import { NextApiRequest } from 'next';
import dbConnect from '../../lib/dbConnect';
import { Report } from '../../models/Report';
import { NextResponse } from 'next/server';
import { reportType } from '@/utils/shared-types';
import { authenticate } from '../../utils/decode';
import { rateLimitMiddleware } from '../../utils/limiter';
import UpdateReport from '../../models/UpdateReport';
// import UpdateReport from '../../models/UpdateReport';

export async function PUT(request: any, { params }: any) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const pass = await rateLimitMiddleware(request);
    if (!pass) {
      return NextResponse.json(
        { status: 'Error', message: 'Too Many Requests.' },
        { status: 400 }
      );
    }

    const user = await authenticate(request);
    if (!user) {
      return NextResponse.json(
        { status: 'Error', message: 'Access Denied. Invalid Token.' },
        { status: 400 }
      );
    }

    const role = user.role;
    if (role === 2) {
      return NextResponse.json(
        { status: 'Error', message: 'Access Denied. Invalid Role.' },
        { status: 400 }
      );
    }

    const { id } = params;
    const report: reportType = await request.json();

    await dbConnect();

    let updateReport = await UpdateReport.create(report);
    const updatedReport = await Report.findByIdAndUpdate(
      id,
      { updatereport: updateReport._id, status: report.status },
      { new: true, session }
    );

    if (!updatedReport) {
      throw new Error('Report not found');
    }

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json({ message: 'Report updated' }, { status: 200 });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    if (error instanceof Error) {
      console.error('PUT Error:', error.message);
      return NextResponse.json(
        { status: 'Error', message: error.message },
        { status: 500 }
      );
    } else {
      console.error('PUT Error:', error);
      return NextResponse.json(
        { status: 'Error', message: 'An unknown error occurred' },
        { status: 500 }
      );
    }
  }
}

export async function GET(request: any, { params }: any) {
  let pass = await rateLimitMiddleware(request);
  if (!pass)
    return NextResponse.json(
      { status: 'Error', message: 'Too Many Requests.' },
      { status: 400 }
    );
  let flag = await authenticate(request);
  if (!flag)
    return NextResponse.json(
      { status: 'Error', message: 'Access Denied. Invalid Token.' },
      { status: 400 }
    );
  const { id } = params;
  await dbConnect();
  const report = await Report.findOne({ _id: id });
  return NextResponse.json({ report }, { status: 200 });
}
