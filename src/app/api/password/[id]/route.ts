import { NextResponse } from "next/server";
import { rateLimitMiddleware } from "../../utils/limiter";
import User from '../../models/user';
import dbConnect from '../../lib/dbConnect';
import { TokenEmail } from '../../models/tokenEmail';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { sendEmail } from '../../utils/sendEmails';
import { reset_password_schema } from "../../validators/validate";
export async function POST(request: any, { params }: any) {
    let pass= await rateLimitMiddleware(request)
    if (!pass) return NextResponse.json({ status: 'Error', message: 'Too Many Requests.' }, { status: 400 });
    const {error, value} = await reset_password_schema.validate(await request.json())
    if(error) return NextResponse.json({ message: error.details[0].message }, { status: 400 });
    let body: any = value;
    await dbConnect();
    const user= await User.findOne({email: body.email})
    if (!user) return NextResponse.json({ status: 'Error', message: 'User Not Found.' }, { status: 400 });
    let token = await TokenEmail.findOne({ userId: user._id });
    if (token) await token.deleteOne()
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, Number(10));
    const hash_new_password = await bcrypt.hash(body.password, 12);
    await new TokenEmail({
      userId: user._id,
      token: hash,
      createdAt: Date.now(),
      new_password: hash_new_password
    }).save();
    const link = `www.kaeyros.org/api/password?token=${resetToken}&userId=${user._id}`;
    sendEmail(user.email,"Password Reset Request",{name: user.name,},link);
    return NextResponse.json({ resetLink: link, message: 'Report updated' }, { status: 200 });
  }