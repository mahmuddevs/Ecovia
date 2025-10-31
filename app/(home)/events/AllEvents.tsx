"use client"
import EventCard from "@/components/EventCard"
import Pagination from "@/components/Pagination"
import SectionTitle from "@/components/SectionTitle"
import Spinner from "@/components/Spinner"
import { useState, useMemo } from "react"

export interface EventType {
    _id: string
    bannerImage: string
    name: string
    description: string
    location: string
    eventType: string
    date: string
    deadline: string
    maxVolunteer: number
    createdAt: string
    updatedAt: string
}

interface AllEventsProps {
    events: EventType[]
    totalPages?: number
    currentPage?: number
}

const AllEvents = ({ events, totalPages, currentPage }: AllEventsProps) => {
    const [query, setQuery] = useState("")

    // Filter events by name or location
    const filteredEvents = useMemo(() => {
        return events.filter(
            (event) =>
                event.name.toLowerCase().includes(query.toLowerCase()) ||
                event.location.toLowerCase().includes(query.toLowerCase())
        )
    }, [query, events])

    return (
        <section className="global-container global-margin">
            <SectionTitle
                heading="All Events"
                paragraph="Explore our latest events focused on making a positive impact on the environment. Join us and be part of the change."
            />

            <div>
                <div className="flex gap-4 justify-end">
                    <label className="input">
                        <svg
                            className="h-[1em] opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input
                            onChange={(e) => setQuery(e.target.value)}
                            type="search"
                            className="grow"
                            placeholder="Search"
                        />
                    </label>
                </div>

                {events.length === 0 ? (
                    <Spinner />
                ) : filteredEvents.length > 0 ? (
                    <>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                            {filteredEvents.map((event) => (
                                <EventCard key={event._id} {...event} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages && currentPage && (
                            <Pagination totalPages={totalPages} currentPage={currentPage} />
                        )}
                    </>
                ) : (
                    <p className="text-center text-gray-500 mt-8">No events found.</p>
                )}
            </div>
        </section>
    )
}

export default AllEvents
