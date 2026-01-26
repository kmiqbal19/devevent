'use server';

import { Event } from '@/database';
import connectDB from '../mongodb';

const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectDB();
    const event = await Event.findOne({ slug }).lean();
    const similarEvents = await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    });
    return similarEvents;
  } catch (error) {
    console.error('Error fetching similar events:', error);
    return [];
  }
};

export default getSimilarEventsBySlug;
