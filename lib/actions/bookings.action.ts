'use server';
import { Booking } from '@/database';
import connectDB from '../mongodb';

export const createBooking = async ({
  eventId,
  slug,
  email,
}: {
  eventId: string;
  slug: string;
  email: string;
}) => {
  try {
    await connectDB();
    await Booking.create({ eventId, slug, email });

    return {
      success: true,
      message: 'Booking created successfully',
    };
  } catch (error) {
    console.log('Error creating booking:', error);
    return {
      success: false,
      message: 'Error creating booking',
    };
  }
};
