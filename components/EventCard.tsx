import Image from 'next/image';
import Link from 'next/link';
import { EventType } from '@/lib/constants';

const EventCard = ({
  title,
  imageUrl,
  slug,
  location,
  date,
  time,
}: EventType) => {
  return (
    <Link href={`/events/${slug}`} id="event-card">
      <Image
        src={imageUrl}
        alt={title}
        width={410}
        height={300}
        className="poster"
      />
      <div className="flex flex-row gap-2">
        <Image src="/icons/pin.svg" alt="pin icon" width={14} height={14} />
        <p>{location}</p>
      </div>
      <p className="title">{title}</p>

      <div className="datetime">
        <div>
          <Image
            src="/icons/calendar.svg"
            alt="calender icon"
            width={14}
            height={14}
          />
          <p>{date}</p>
        </div>
        <div>
          <Image
            src="/icons/clock.svg"
            alt="clock icon"
            width={14}
            height={14}
          />
          <p>{time}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
