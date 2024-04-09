import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { createToken, verify } from '../../utils/decode';
import { rateLimitMiddleware } from '../../utils/limiter';
import { headers } from 'next/headers';


export async function GET(request: any) {
  let pass = await rateLimitMiddleware(request);
  if (!pass)
    return NextResponse.json(
      { status: 'Error', message: 'Too Many Requests.' },
      { status: 400 }
    );
  // const accessToken = request.headers['Authorization'];
   const accessToken = headers().get('authorization');
  if (!accessToken) {
      // console.log('accessToken', accessToken);
      
    return NextResponse.json({ status: 'Error', message: 'Access Denied. No refresh token provided.' }, { status: 401 });
    }
    try {
      const user: any = verify(accessToken);
      const token = createToken({id: user.id, fullname: user?.fullname, email: user?.email, role: user?.role}, '1h')
      const response= NextResponse.json({success: 'Success', message: 'Login successful'},{ status: 201 })
      response.headers.set('Authorization', token)
      return response
  } catch (error) {
      console.log('accessToken222', error);
    
      return NextResponse.json({ status: 'Error', message: 'Invalid refresh token.' }, { status: 400 });
    }
}

