import Image from "next/image";
import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const EventDetailItem = ( {iconSrc, altText, label} : {iconSrc: string, altText: string, label: string}) => (
    <div className="flex-row-gap-2 items-center">
        <Image src={iconSrc} alt={altText} width={17} height={17} />
        <p>{label}</p>
    </div>
);
const EventDetailsPage = async ( {params} : {params: { slug : string}}) => {
    const { slug } = params;
    const response = await fetch(`${BASE_URL}/api/events/${slug}`, { cache: 'no-store' });
    const {event} = await response.json();
    if (!event) return notFound();
    const {description , image, overview, date, time, location, mode, agenda, audience} = event;
  return (
    <section id ="event">
       <div className="header"> 
        <h1>Event Description</h1>
        <p className="mt-2">{description}</p>
       </div>
     <div className="details">

        {/* Left Side - Event Content */}
        <div className="content">
            <Image src={image} alt="event poster" width={800} height={600} className="banner" />
            <section className="overview">
                <h2>Event Overview</h2>
                <p>{overview}</p>
            </section>
            <section className="flex-col-gap-2">
                <h2>Event Details</h2>
                <EventDetailItem iconSrc="/icons/calendar.svg" altText="calendar icon" label={date} />
                <EventDetailItem iconSrc="/icons/clock.svg" altText="clock icon" label={time} />
                <EventDetailItem iconSrc="/icons/pin.svg" altText="location icon" label={location} />
                <EventDetailItem iconSrc="/icons/mode.svg" altText="mode icon" label={mode} />
                <EventDetailItem iconSrc="/icons/audience.svg" altText="audience icon" label={audience} />
            </section>
        </div>
        {/* Right Side - Booking Form */}
<aside className="booking">
    <p className="text-lg font-semibold">Book Event</p>
</aside>
     </div>
    </section>
  )
}

export default EventDetailsPage