import EventCard from '@/components/EventCard';
import { IEvent } from '@/database';
import { getAllEvents } from '@/lib/actions/event.actions';

const EventsPage = async () => {
  const events = await getAllEvents();
  return events?.length > 0 ? (
    <div className="mt-20 space-y-15">
      <h3>Upcoming Gatherings</h3>
      <ul className="events">
        {events.map((event: IEvent, idx) => (
          <li key={idx} className="list-none">
            <EventCard {...event} />
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <p>No events found</p>
  );
};

export default EventsPage;
