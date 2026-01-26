import BookEvent from '@/components/BookEvent';
import EventCard, { EventDTO } from '@/components/EventCard';
import getSimilarEventsBySlug from '@/lib/actions/event.actions';
import { cacheLife } from 'next/cache';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const EventDetailItem = ({
  iconSrc,
  altText,
  label,
}: {
  iconSrc: string;
  altText: string;
  label: string;
}) => (
  <div className="flex-row-gap-2 items-center">
    <Image src={iconSrc} alt={altText} width={17} height={17} />
    <p>{label}</p>
  </div>
);
const EventAgendaItem = ({ agendaItems }: { agendaItems: string[] }) => {
  return (
    <div className="agenda">
      <h2>Event Agenda</h2>
      <ul>
        {agendaItems.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
const EventTags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-row gap-1.5 flex-wrap">
      {tags.map((tag, idx) => (
        <div key={idx} className="pill">
          {tag}
        </div>
      ))}
    </div>
  );
};
const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const response = await fetch(`${BASE_URL}/api/events/${slug}`, {
    next: {
      revalidate: 60,
    },
  });
  const { event } = await response.json();
  if (!event) return notFound();
  const {
    description,
    organizer,
    image,
    overview,
    date,
    time,
    location,
    mode,
    agenda,
    audience,
    tags,
  } = event;
  const bookings = 10;
  const similarEvents = await getSimilarEventsBySlug(slug);
  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p className="mt-2">{description}</p>
      </div>
      <div className="details">
        {/* Left Side - Event Content */}
        <div className="content">
          <Image
            src={image}
            alt="event poster"
            width={800}
            height={600}
            className="banner"
          />
          <section className="overview">
            <h2>Event Overview</h2>
            <p>{overview}</p>
          </section>
          <section className="flex-col-gap-2">
            <h2>Event Details</h2>
            <EventDetailItem
              iconSrc="/icons/calendar.svg"
              altText="calendar icon"
              label={date}
            />
            <EventDetailItem
              iconSrc="/icons/clock.svg"
              altText="clock icon"
              label={time}
            />
            <EventDetailItem
              iconSrc="/icons/pin.svg"
              altText="location icon"
              label={location}
            />
            <EventDetailItem
              iconSrc="/icons/mode.svg"
              altText="mode icon"
              label={mode}
            />
            <EventDetailItem
              iconSrc="/icons/audience.svg"
              altText="audience icon"
              label={audience}
            />
          </section>
          <EventAgendaItem agendaItems={JSON.parse(agenda[0])} />
          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
          </section>
          <EventTags tags={JSON.parse(tags[0])} />
        </div>
        {/* Right Side - Booking Form */}
        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot Now!</h2>
            {bookings > 0 ? (
              <p className="text-sm">
                Join {bookings} others who have already booked their spot for
                this event.
              </p>
            ) : (
              <p className="text-sm">
                Be the first to book your spot for this event.
              </p>
            )}
            <BookEvent eventId={event._id} slug={event.slug} />
          </div>
        </aside>
      </div>
      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>Similar Events</h2>
        <div className="events">
          {similarEvents.length > 0 &&
            similarEvents.map((simEvent: EventDTO, idx: number) => {
              return (
                <EventCard
                  key={idx}
                  title={simEvent.title}
                  image={simEvent.image}
                  slug={simEvent.slug}
                  location={simEvent.location}
                  date={simEvent.date}
                  time={simEvent.time}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default EventDetailsPage;
