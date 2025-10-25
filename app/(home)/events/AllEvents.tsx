"use client"
import SectionTitle from "@/components/SectionTitle"
import Spinner from "@/components/Spinner"
// import { fetchEvents } from "@/lib/features/eventSlice/eventSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { useEffect, useState } from "react"

const AllEvents = () => {
    // const dispatch = useAppDispatch();
    // const { events, isLoading } = useAppSelector((state) => state.events);
    const [query, setQuery] = useState<string>('')

    // useEffect(() => {
    //     dispatch(fetchEvents(0));
    // }, [dispatch]);

    // const filteredEvents = events.filter((event) =>
    //     event.name.toLowerCase().includes(query.toLowerCase()) ||
    //     event.location.toLowerCase().includes(query.toLowerCase())
    // );

    // const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     const sortOrder = parseInt(e.target.value);
    //     dispatch(fetchEvents(sortOrder))
    // };

    return (
        <section className="global-container global-margin">
            <SectionTitle
                heading="All Events"
                paragraph="Explore our latest events focused on making a positive impact on the environment. Join us and be part of the change."
            />
            <div>
                <div className="flex gap-4 justify-end">
                    <label className="input">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                        <input onChange={(e) => { setQuery(e.target.value) }} type="search" className="grow" placeholder="Search" />
                    </label>
                    {/* <select onChange={handleSortChange} defaultValue={0} className="select cursor-pointer">
                        <option value={0}>Sort By Date</option>
                        <option value={-1}>new - old</option>
                        <option value={1}>old - new</option>
                    </select> */}
                </div>
                {/* {
                    isLoading ? (
                        <Spinner />
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                            {
                                filteredEvents.map((event) => (
                                    <EventCard key={event._id} {...event} />
                                ))
                            }
                        </div>
                    )
                } */}
            </div>
        </section >
    )
}
export default AllEvents