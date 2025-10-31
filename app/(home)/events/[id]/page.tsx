import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaClock,
  FaGlobe,
} from "react-icons/fa";
import moment from "moment";
import Image from "next/image";
import { getEventById } from "@/actions/events/EventActions";
import EventButtons from "@/components/EventButtons";

type Props = {
  params: Promise<{ id: string }>;
};

const EventDetails = async ({ params }: Props) => {
  const { id } = await params;

  const { event } = await getEventById(id);

  return (
    <div className="text-gray-800">
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
        <Image
          fill
          src={event.bannerImage}
          alt={event.name}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{event.name}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="flex items-center gap-3 bg-base-200 rounded-box p-4">
            <FaGlobe className="text-blue-500 text-xl" />
            <span className="font-medium">{event.eventType}</span>
          </div>
          <div className="flex items-center gap-3 bg-base-200 rounded-box p-4">
            <FaCalendarAlt className="text-red-500 text-xl" />
            <span className="font-medium">
              {moment(event.date).format("MMMM D, YYYY")}
            </span>
          </div>
          <div className="flex items-center gap-3 bg-base-200 rounded-box p-4">
            <FaClock className="text-yellow-500 text-xl" />
            <span className="font-medium">
              Deadline: {moment(event.deadline).format("MMMM D, YYYY")}
            </span>
          </div>
          <div className="flex items-center gap-3 bg-base-200 rounded-box p-4">
            <FaMapMarkerAlt className="text-green-500 text-xl" />
            <span className="font-medium">{event.location}</span>
          </div>
          <div className="flex items-center gap-3 bg-base-200 rounded-box p-4 col-span-1 sm:col-span-2">
            <FaUsers className="text-purple-500 text-xl" />
            <span className="font-medium">
              Max Volunteers: {event.maxVolunteer}
            </span>
          </div>
        </div>

        <div className="prose max-w-none">
          <p>{event.description}</p>
        </div>

        <EventButtons eventId={event._id} />
      </div>
    </div>
  );
};

export default EventDetails;
