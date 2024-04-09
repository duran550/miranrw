import nodemailer from 'nodemailer';
// import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
export const sendEmail = async (
  email: any,
  subject: any,
  payload: any,
  link: any
) => {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.ionos.de',
      service: 'ionos',
      secure: false,
      port: 465,
      auth: {
        user: 'test@kaeyros-analytics.de',
        pass: '@@Test$$',
      },
    });
    const options = () => {
      return {
        from: 'kaeyros@kaeyros-analytics.de',
        to: email,
        subject: subject,
        html: `<a href="${link}"> Click Here To Reset Password </a>`,
      };
    };

    // Send email
    transporter.sendMail(options(), (error, info) => {
      if (error) {
        console.log(error);

        return error;
      } else {
        return true;
      }
    });
  } catch (error) {
    return error;
  }
};
