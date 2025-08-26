// app/api/send/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Validate email format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate the request data
const validateData = (name: string, email: string, message: string): string | null => {
  if (!name || !email || !message) {
    return 'All fields are required';
  }
  
  if (name.length < 2) {
    return 'Name must be at least 2 characters long';
  }
  
  if (!isValidEmail(email)) {
    return 'Please provide a valid email address';
  }
  
  if (message.length < 10) {
    return 'Message must be at least 10 characters long';
  }
  
  return null;
};

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate the input data
    const validationError = validateData(name, email, message);
    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      );
    }

    // Check if environment variables are set
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS || !process.env.YOUR_EMAIL) {
      console.error('Missing environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
    } catch (error) {
      console.error('Transporter verification failed:', error);
      return NextResponse.json(
        { error: 'Email service configuration error' },
        { status: 500 }
      );
    }

    // Send email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.YOUR_EMAIL,
      replyTo: email,
      subject: `New message from ${name} - Portfolio Contact Form`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #4F46E5;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 5px; border-left: 4px solid #4F46E5;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <br>
          <p style="font-size: 12px; color: #6b7280;">
            This message was sent from your portfolio contact form on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true,
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}

// Add OPTIONS handler for CORS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}