import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export const decode = (token: string) => {
    return jwt.decode(token) as any;
}

export const verify = (token: any) => {
    return jwt.verify(token, process.env.JWT_SECRET as string);
}

export const createToken= (tokenData:any, time:string) => {
    return jwt.sign(tokenData, process.env.JWT_SECRET as string, { expiresIn: time });
}

export const authenticate = async (req: NextApiRequest) => {
    return new Promise<boolean>((resolve, reject) => {
        const accessToken = req.headers['Authorization'];
  // const refreshToken = req.cookies['refreshToken'];
  if (!accessToken) {
    // return NextResponse.json({ status: 'Error', message: 'Access Denied. No refresh token provided.' }, { status: 401 });
    resolve(false)
  }

  try {
    const decoded = verify(accessToken);
   resolve(true)
  } catch (error) {
    resolve(false)
    // if (!refreshToken) {
    //     resolve(false)
    //     // return NextResponse.json({ status: 'Error', message: 'Access Denied. No refresh token provided.' }, { status: 401 });
    // }

    // try {
    //   const decoded = verify(refreshToken);
    //   resolve(true)
    // } catch (error) {
    //     // return NextResponse.json({ status: 'Error', message: 'Access Denied. Invalid Token.' }, { status: 400 });
    //     resolve(false)
    // }
  }
    
    })

  };
  