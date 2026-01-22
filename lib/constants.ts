export type EventType = {
    imageUrl: string;
    title: string;
    slug: string;
    location: string;
    date: string;
    time: string;
}
export const events : EventType[] = [
    {
        imageUrl: '/images/event1.png',
        title: 'DevConf 2023',
        slug: 'devconf-2023',
        location: 'San Francisco, CA',
        date: '2023-11-15',
        time: '09:00 AM'
    },
    {
        imageUrl: '/images/event2.png',
        title: 'Global Hackathon 2023',
        slug: 'global-hackathon-2023',
        location: 'New York, NY',
        date: '2023-12-01',
        time: '10:00 AM'
    },
    {
        imageUrl: '/images/event3.png',
        title: 'Tech Meetup 2023',
        slug: 'tech-meetup-2023',
        location: 'Austin, TX',
        date: '2023-11-20',
        time: '06:00 PM'
    },
    {
        imageUrl: '/images/event4.png',
        title: 'JSConf 2023',
        slug: 'jsconf-2023',
        location: 'Berlin, Germany',
        date: '2023-10-30',
        time: '08:00 AM'
    },
    {
        imageUrl: '/images/event5.png',
        title: 'AI Summit 2023',
        slug: 'ai-summit-2023',
        location: 'London, UK',
        date: '2023-11-10',
        time: '09:30 AM'
    }
];