import { NextResponse, NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event from '@/database/event.model';
import { v2 as cloudinary } from 'cloudinary';
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const formData = await request.formData();
    let event;
    try {
      event = Object.fromEntries(formData.entries());
    } catch (error) {
      return NextResponse.json(
        {
          message: 'Invalid JSON data',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        { status: 400 }
      );
    }
    const file = formData.get('image') as File;
    if (!file) return NextResponse.json({ message: 'Image file is required' }, { status: 400 });
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    interface CloudinaryUploadResult {
      secure_url: string;
      public_id: string;
    }
    const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      cloudinary.uploader.upload_stream({
        resource_type: 'image',
        folder: 'Devevents/events',
      }, (error, result) => {
        if (error) return reject(error);
        if (!result?.secure_url) return reject(new Error('Upload failed: no secure_url returned'));
        resolve(result);
      }).end(buffer);
    });
    event.image = uploadResult.secure_url;
    const createdEvent = await Event.create(event);
    return NextResponse.json(
      { message: 'Event created successfully', event : createdEvent },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Event creation failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 });
    return NextResponse.json(
      { message: 'Events fetched successfully', events },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to fetch events',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
};