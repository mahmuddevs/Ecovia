"use client";

import EventCard from '@/components/EventCard';
import NoEventsFound from '@/components/NoEventsFound';
import Pagination from '@/components/Pagination';
import SectionTitle from '@/components/SectionTitle';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export interface EventType {
    _id: string;
    bannerImage: string;
    name: string;
    description?: string;
    location: string;
    eventType?: string;
    date: string;
    deadline?: string;
    maxVolunteer?: number;
    createdAt?: string;
    updatedAt?: string;
}

interface AllEventsProps {
    events: EventType[];
    totalPages: number;
    currentPage: number;
    initialSearchQuery?: string;
    success?: boolean;   // from server action
    message?: string;    // from server action when success: false
}

export default function AllEvents({
    events,
    totalPages,
    currentPage,
    initialSearchQuery = '',
    success,
    message,
}: AllEventsProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term.trim()) {
            params.set('search', term.trim());
            params.set('page', '1');
        } else {
            params.delete('search');
        }
        router.push(`?${params.toString()}`);
    }, 400);


    return (
        <section className="global-container global-margin">
            <SectionTitle
                heading="All Events"
                paragraph="Explore our latest events focused on making a positive impact on the environment."
            />

            <div className="flex gap-4 justify-end mb-8">
                <label className="input w-full max-w-sm">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g strokeWidth="2.5" stroke="currentColor" fill="none">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </g>
                    </svg>
                    <input
                        type="search"
                        className="grow"
                        placeholder="Search by name or location..."
                        defaultValue={initialSearchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </label>
            </div>

            {/* Events Grid */}
            {!success ? (
                <NoEventsFound message={message || 'No events found.'} />
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {events.map((event) => (
                        <EventCard key={event._id} {...event} />
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && events.length > 0 && (
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={(page) => {
                        const params = new URLSearchParams(searchParams);
                        params.set('page', page.toString());
                        router.push(`?${params.toString()}`);
                    }}
                />
            )}
        </section>
    );
}