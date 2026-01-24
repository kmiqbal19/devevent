import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event, { IEvent } from '@/database/event.model';

/**
 * Type definition for the route context containing dynamic params
 */
type RouteContext = {
  params: Promise<{ slug: string }>;
};

/**
 * GET /api/events/[slug]
 * Fetches a single event by its unique slug identifier
 *
 * @param request - Next.js request object
 * @param context - Route context containing dynamic params
 * @returns JSON response with event data or error message
 */
export async function GET(
  request: NextRequest,
  context: RouteContext
): Promise<NextResponse> {
  try {
    // Extract and validate slug parameter
    const { slug } = await context.params;

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        {
          message: 'Invalid slug parameter',
          error: 'Slug must be a non-empty string',
        },
        { status: 400 }
      );
    }

    // Validate slug format (alphanumeric, hyphens only)
    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(slug)) {
      return NextResponse.json(
        {
          message: 'Invalid slug format',
          error: 'Slug can only contain lowercase letters, numbers, and hyphens',
        },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Query event by slug with proper typing
    const event: IEvent | null = await Event.findOne({ slug }).lean();

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        {
          message: 'Event not found',
          error: `No event exists with slug: ${slug}`,
        },
        { status: 404 }
      );
    }

    // Return successful response with event data
    return NextResponse.json(
      {
        message: 'Event fetched successfully 🎉',
        event,
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle database connection errors
    if (error instanceof Error && error.message.includes('MONGODB_URI')) {
      return NextResponse.json(
        {
          message: 'Database configuration error',
          error: 'Unable to connect to database',
        },
        { status: 503 }
      );
    }

    // Handle unexpected errors
    return NextResponse.json(
      {
        message: 'Failed to fetch event',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}
