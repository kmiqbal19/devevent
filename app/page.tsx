import EventCard from '@/components/EventCard';
import ExploreBtn from '@/components/ExploreBtn';
import { IEvent } from '@/database';

export default async function Home() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const events: IEvent[] = await fetch(`${BASE_URL}/api/events`, {
    next: {
      revalidate: 60,
    },
  })
    .then((res) => res.json())
    .then((data) => data.events);
  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev <br /> Event You Can&apos;t Miss
      </h1>
      <p className="text-center mt-5">
        hackathons, Meetups and Conferences - All in One Place
      </p>
      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3> Featured Events</h3>
        <ul className="events">
          {events.map((event: IEvent, idx) => (
            <li key={idx} className="list-none">
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
