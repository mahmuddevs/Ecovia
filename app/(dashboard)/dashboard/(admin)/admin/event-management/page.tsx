import EventForm from "@/app/(dashboard)/components/EventForm"
import EventsTable from "@/app/(dashboard)/components/EventsTable"
import { FaPlus, FaUsers } from "react-icons/fa6"

const EventManagement = () => {
    return (
        <>
            <div className="tabs tabs-lift">
                <label className="tab">
                    <input type="radio" name="my_tabs_4" />
                    <FaPlus className="me-2" />
                    Add Event
                </label>
                <div className="tab-content bg-base-100 border-base-300 p-6">
                    <EventForm />
                </div>

                <label className="tab">
                    <input type="radio" name="my_tabs_4" defaultChecked />
                    <FaUsers className="me-2" />
                    All Events
                </label>
                <div className="tab-content bg-base-100 border-base-300 p-6">
                    <EventsTable />
                </div>
            </div>
        </>
    )
}
export default EventManagement