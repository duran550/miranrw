import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { createToken, verify } from '../../utils/decode';
import { headers } from 'next/headers';

export async function GET(request: any) {
  // const accessToken = request.headers['Authorization'];
  const accessToken = headers().get('authorization');
    if (!accessToken) {
    return NextResponse.json({ status: 'Error', message: 'Access Denied. No refresh token provided.' }, { status: 401 });
    }
    try {
      const decoded = verify(accessToken);
      const token = createToken(decoded, '1h')
      const response= NextResponse.json({success: 'Success', message: 'Login successful'},{ status: 201 })
      response.headers.set('Authorization', token)
      return response
    } catch (error) {
      return NextResponse.json({ status: 'Error', message: 'Invalid refresh token.' }, { status: 400 });
    }
}