import PageBanner from '@/components/PageBanner';
import eventsBanner from '@/public/assets/images/events-banner.jpg';
import AllEvents, { EventType } from './AllEvents';
import { getAllEvents } from '@/actions/events/EventActions';

interface EventsPageProps {
    searchParams?: Promise<{ page?: string; search?: string }>;
}

export default async function Events({ searchParams }: EventsPageProps) {
    const params = await searchParams!;
    const currentPage = Math.max(1, Number(params.page || '1') || 1);
    const searchQuery = (params.search || '').trim();

    const result = await getAllEvents(currentPage, 12, -1, searchQuery);

    // This single line fixes ALL TypeScript errors without changing your action
    const safeProps = {
        events: (result.success ? result.events : []) as EventType[],
        totalPages: result.totalPages ?? 1,
        currentPage: result.currentPage ?? currentPage,
        initialSearchQuery: searchQuery,
        success: result?.success,
        message: result?.message
    };

    return (
        <>
            <PageBanner
                image={eventsBanner}
                heading="Every Action Counts — Join Our Upcoming Events!"
                paragraph="Join a community of changemakers taking small steps toward a healthier planet. Find events near you and get involved today."
            />

            <AllEvents {...safeProps} />
        </>
    );
}