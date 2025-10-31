import { FaEdit, FaTrash } from "react-icons/fa";
import { getAllEvents } from "@/actions/events/EventActions";

interface Event {
  _id: string;
  name: string;
  eventType: string;
  date: string;
  location: string;
  maxVolunteer: number;
  deadline: string;
}

const EventsTableBody = async () => {
  // Server-side fetch
  const { events } = await getAllEvents();

  // Client-side state for modal
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // const handleUpdate = (event: Event) => {
  //   setSelectedEvent(event);
  //   setIsModalOpen(true);
  // };

  // const handleDelete = async (id: string) => {
  //   const result = await Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   });

  //   if (result.isConfirmed) {
  //     const { success, message } = await deleteEvent(id);

  //     if (!success) {
  //       Swal.fire({
  //         position: "top-end",
  //         icon: "error",
  //         title: "Delete failed",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //       return;
  //     }

  //     Swal.fire({
  //       title: "Deleted!",
  //       text: message,
  //       icon: "success",
  //     });
  //   }
  // };

  return (
    <>
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
            events.map((event: Event, index: number) => (
              <tr key={event._id} className="hover">
                <td>{index + 1}</td>
                <td className="font-medium">{event.name}</td>
                <td>{event.eventType}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{event.location}</td>
                <td>{event.maxVolunteer}</td>
                <td>{new Date(event.deadline).toLocaleDateString()}</td>
                <td className="flex items-center gap-3 text-2xl">
                  <FaEdit
                    // onClick={() => handleUpdate(event)}
                    className="text-blue-500 cursor-pointer"
                    title="Edit"
                  />
                  <FaTrash
                    // onClick={() => handleDelete(event._id)}
                    className="text-red-500 cursor-pointer"
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

      {/* Modal */}
      {/* {selectedEvent && (
        <EventUpdateModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )} */}
    </>
  );
};

export default EventsTableBody;
