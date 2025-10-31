import Link from "next/link";
import { FaCalendarDay, FaMapPin } from "react-icons/fa6";
import Image from "next/image";
import { EventType } from "@/app/(home)/events/AllEvents";

const EventCard = ({ _id, bannerImage, name, date, location }: EventType) => {
    return (
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden transition hover:shadow-xl flex flex-col h-full">
            <div className="flex-shrink-0">
                <Image
                    src={bannerImage}
                    alt={name}
                    width={500}
                    height={200}
                    className="w-full h-48 object-cover"
                />
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <div className="space-y-3">
                    <h2 className="text-xl font-semibold text-gray-800">{name}</h2>

                    <div className="flex items-center text-sm text-gray-600 gap-2">
                        <FaCalendarDay className="w-4 h-4" />
                        <span>{date}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600 gap-2">
                        <FaMapPin className="w-4 h-4" />
                        <span>{location}</span>
                    </div>
                </div>
                <div className="mt-auto pt-4">
                    <Link
                        href={`/events/${_id}`}
                        className="inline-block w-full text-center bg-tprimary hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                        Learn More
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default EventCard;