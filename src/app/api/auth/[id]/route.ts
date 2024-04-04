import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { createToken, verify } from '../../utils/decode';
import { rateLimitMiddleware } from '../../utils/limiter';

export async function GET(request: any) {
  let pass = await rateLimitMiddleware(request);
  if (!pass)
    return NextResponse.json(
      { status: 'Error', message: 'Too Many Requests.' },
      { status: 400 }
    );
  const accessToken = request.headers['Authorization'];
    if (!accessToken) {
    return NextResponse.json({ status: 'Error', message: 'Access Denied. No refresh token provided.' }, { status: 401 });
    }
    try {
      const user: any = verify(accessToken);
      const token = createToken({id: user[0]._id, fullname: user[0]?.fullname, email: user[0]?.email, role: user[0]?.role}, '1h')
      const response= NextResponse.json({success: 'Success', message: 'Login successful'},{ status: 201 })
      response.headers.set('Authorization', token)
      return response
    } catch (error) {
      return NextResponse.json({ status: 'Error', message: 'Invalid refresh token.' }, { status: 400 });
    }
}