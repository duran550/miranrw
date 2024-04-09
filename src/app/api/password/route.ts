import { NextResponse } from "next/server";
import { rateLimitMiddleware } from "../utils/limiter";
import { TokenEmail } from "../models/tokenEmail";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { parse } from "url";
import dbConnect from "../lib/dbConnect";
import User from "../models/user";
export async function GET(request: any) {
    let pass= await rateLimitMiddleware(request)
    if (!pass) return NextResponse.json({ status: 'Error', message: 'Too Many Requests.' }, { status: 400 });

    try {
        const { query } = parse(request.url, true);
        const {userId} =  query
        const resetToken: any= query['resetToken']
        await dbConnect();
        let passwordResetToken = await TokenEmail.findOne({ userId });
        if (!passwordResetToken) return NextResponse.json({ status: 'Error', message: 'Invalid or expired password reset token' }, { status: 500});
          //  throw new Error("Invalid or expired password reset token")
        const isValid = await bcrypt.compare(resetToken, passwordResetToken.token);
        if (!isValid) {
          throw new Error("Invalid or expired password reset token");
        }
        const result = await User.findByIdAndUpdate(userId, { password: passwordResetToken.new_password });
        const response= NextResponse.json({success: 'Success', message: 'Logout successful'},{ status: 201 })
      return response
    } catch (error) {
      // return NextResponse.json({ status: 'Error', message: 'something wrong' }, { status: 500});
    }
  }
  