import { NextApiRequest } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dbConnect from '../lib/dbConnect';
import User from '../models/user'
import { NextResponse } from "next/server";
import { user_login_schema } from '../validators/validate';

export async function POST(request: any) {
  // Validate the request body

  const {error, value} = await user_login_schema.validate(await request.json())
  if(error) return NextResponse.json({ message: error.details[0].message }, { status: 400 });
  
  let { password, email} = value;
  await dbConnect();
  try {
    // Get the user with the provided email
    const user= await User.find({email: email})
    if (user.length > 0) {
      const passwordMatches = await bcrypt.compare(password, user[0].password);
      // console.log(user[0]);
      

      if (passwordMatches) {
        const tokenData = {
          id: user[0]._id,
          fullname: user[0]?.fullname,
          email: user[0]?.email
          }
          const token = jwt.sign(tokenData, process.env.JWT_SECRET as string, { expiresIn: '1d' });
        const response= NextResponse.json({success: 'Success', message: 'Login successful'},{ status: 201 })
        response.cookies.set('token', token, {httpOnly: true});
        return response
      } else {
        return NextResponse.json({ status: 'Error', message: 'Invalid password' }, { status: 403 });
      }
    } else {
      return NextResponse.json({ status: 'Error', message: 'User not found' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ status: 'Error', message: 'something wrong' }, { status: 500});
  }
}

export async function GET() {
  try {
    const response= NextResponse.json({success: 'Success', message: 'Logout successful'},{ status: 201 })
    response.cookies.set('token', '', {httpOnly: true, expires: new Date(0)});
    return response
  } catch (error) {
    return NextResponse.json({ status: 'Error', message: 'something wrong' }, { status: 500});
  }
}
