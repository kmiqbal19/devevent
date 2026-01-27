import EventCard from '@/components/EventCard';
import ExploreBtn from '@/components/ExploreBtn';
import { IEvent } from '@/database';

export default async function Home() {
 const baseUrl =
  process.env.VERCEL_URL ||
  'http://localhost:3000';

const events: IEvent[] = await fetch(`${baseUrl}/api/events`, {
  cache: 'no-store',
})
  .then(res => res.json())
  .then(data => data.events);
  return (
    <section>
      <h1 className="text-center">
        More Than a Meetup <br /> It&apos;s a Community
      </h1>
      <p className="text-center mt-5">
        Meet new people, share stories, and build meaningful connections.
      </p>
      <ExploreBtn />

      <div className="mt-20 space-y-12 z-10" >
        <h3>Upcoming Gatherings</h3>
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
