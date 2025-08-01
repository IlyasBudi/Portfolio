import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import validator from 'validator';

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json();

  // Tambahkan validasi di server
  if (!validator.isEmail(email)) {
    return NextResponse.json({ success: false, error: 'Invalid email address' }, { status: 400 });
  }

  if (!name || !subject || !message) {
    return NextResponse.json({ success: false, error: 'Missing fields' }, { status: 400 });
  }

  // Buat transporter SMTP (contoh Gmail)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER, // Kirim ke email kamu
      cc: email,
      replyTo: email,
      subject: subject,
      text: message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
