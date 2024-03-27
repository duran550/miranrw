import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { createToken, verify } from '../../utils/decode';

export async function GET(request: NextApiRequest) {
    const refreshToken = request.cookies['refreshToken'];
    if (!refreshToken) {
    return NextResponse.json({ status: 'Error', message: 'Access Denied. No refresh token provided.' }, { status: 401 });
    }
    try {
      const decoded = verify(refreshToken);
      const token = createToken(decoded, '1h')
      const response= NextResponse.json({success: 'Success', message: 'Login successful'},{ status: 201 })
      response.headers.set('Authorization', token)
      return response
    } catch (error) {
      return NextResponse.json({ status: 'Error', message: 'Invalid refresh token.' }, { status: 400 });
    }
}