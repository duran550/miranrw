import { NextApiRequest } from 'next';
import bcrypt from 'bcrypt';
import dbConnect from '../lib/dbConnect';
import User from '../models/user'
import { NextResponse } from "next/server";

export async function POST(request: any) {
  let { password, email} = await request.json();
  await dbConnect();

  try {
    // Get the user with the provided email
    const user= await User.find({email: email})
    if (user.length > 0) {
      const passwordMatches = await bcrypt.compare(password, user[0].password);

      if (passwordMatches) {
        return NextResponse.json({status: 'Success', message: 'Login successful'}, { status: 201 });
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
