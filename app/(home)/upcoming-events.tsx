import { getFeaturedEvents } from "@/actions/events/EventActions";
import EventCard from "@/components/EventCard";
import SectionTitle from "@/components/SectionTitle";
import Link from "next/link"

export interface EventCardProps {
    _id: string;
    bannerImage: string;
    name: string;
    date: string;
    location: string;
}

const UpcomingEvents = async () => {
    const { events } = await getFeaturedEvents() as { events: EventCardProps[] }

    return (
        <section className="global-container global-margin">
            <SectionTitle
                heading="Upcoming Events"
                paragraph="Be part of our mission for a greener future. Discover events where you can volunteer, learn, and make an impact."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    events ? (
                        events.map((event) => (
                            <EventCard key={event._id} {...event} />
                        ))
                    ) : (
                        <p className="text-black">No Events</p>
                    )
                }
            </div>
            <div className="flex justify-center my-8">
                <Link href='/events' className="btn bg-tprimary text-white">View All Events</Link>
            </div>
        </section>
    )
}

export default UpcomingEvents
