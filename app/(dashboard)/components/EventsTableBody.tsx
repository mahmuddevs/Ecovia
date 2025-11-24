"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { deleteEvent, getAllEvents } from "@/actions/events/EventActions";
import EventUpdateModal, { EventType } from "./EventUpdateModal";
import Pagination from "@/components/Pagination";
import Spinner from "@/components/Spinner";

export interface Event {
  _id: string;
  name: string;
  description: string;
  eventType: EventType;
  date: string;
  location: string;
  maxVolunteer: number;
  deadline: string;
  bannerImage: FileList | string;
}

const EventsTableBody = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const eventsPerPage = 12;

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  // Fetch paginated events from server
  const fetchEvents = async (page: number) => {
    try {
      setLoading(true);
      const { success, events: fetchedEvents, totalPages: serverTotalPages } =
        await getAllEvents(page, eventsPerPage);

      if (!success) {
        setEvents([]);
        setTotalPages(1);
        return;
      }

      setEvents(fetchedEvents);
      setTotalPages(serverTotalPages || 1);
    } catch (err) {
      console.error("Error fetching events:", err);
      setEvents([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleUpdate = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This event will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const { success, message } = await deleteEvent(id);

      if (!success) {
        Swal.fire("Error", message || "Something went wrong.", "error");
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: message || "Event deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchEvents(currentPage); // Refresh after deletion
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete event.", "error");
    }
  };

  const handleEventUpdated = (updatedEvent: Event) => {
    setEvents((prev) =>
      prev.map((ev) => (ev._id === updatedEvent._id ? updatedEvent : ev))
    );
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handlePageChange = (page: number) => {
    router.push(`${window.location.pathname}?page=${page}`);
  };

  if (loading) return <Spinner small />;

  return (
    <>
      <div className="overflow-x-auto shadow-lg rounded-lg border">
        <table className="table w-full">
          <thead className="bg-green-100 text-green-800 font-semibold text-sm">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Type</th>
              <th>Date</th>
              <th>Location</th>
              <th>Max Volunteers</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map((event, index) => (
                <tr key={event._id} className="hover">
                  <td>{(currentPage - 1) * eventsPerPage + (index + 1)}</td>
                  <td className="font-medium">{event.name}</td>
                  <td>{event.eventType}</td>
                  <td>{new Date(event.date).toLocaleDateString()}</td>
                  <td>{event.location}</td>
                  <td>{event.maxVolunteer}</td>
                  <td>{new Date(event.deadline).toLocaleDateString()}</td>
                  <td className="flex items-center gap-3 text-2xl">
                    <FaEdit
                      onClick={() => handleUpdate(event)}
                      className="text-blue-500 cursor-pointer hover:text-blue-700 transition"
                      title="Edit"
                    />
                    <FaTrash
                      onClick={() => handleDelete(event._id)}
                      className="text-red-500 cursor-pointer hover:text-red-700 transition"
                      title="Delete"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {selectedEvent && (
        <EventUpdateModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpdated={handleEventUpdated}
        />
      )}
    </>
  );
};

export default EventsTableBody;
