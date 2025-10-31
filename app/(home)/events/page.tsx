import PageBanner from '@/components/PageBanner';
import eventsBanner from '@/public/assets/images/events-banner.jpg';
import AllEvents from "./AllEvents";
import { getAllEvents } from '@/actions/events/EventActions';

interface EventsPageProps {
    searchParams?: { page?: string };
}

const Events = async ({ searchParams }: EventsPageProps) => {
    const page = Number(searchParams?.page) || 1;
    const limit = 6;

    // Fetch paginated events
    const { events, totalPages, currentPage } = await getAllEvents(page, limit);

    return (
        <>
            <PageBanner
                image={eventsBanner}
                heading="Every Action Counts — Join Our Upcoming Events!"
                paragraph="Join a community of changemakers taking small steps toward a healthier planet. Find events near you and get involved today."
            />

            <AllEvents
                events={events}
                totalPages={totalPages}
                currentPage={currentPage}
            />
        </>
    );
};

export default Events;
