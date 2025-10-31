import { upcomingEvents } from "@/actions/events/EventActions"

const UpcomingEvents = async () => {
  const eventsCount = await upcomingEvents()
  return (
    <div className="bg-info text-white p-8 space-y-6 rounded-md">
      <h4 className="text-3xl font-semibold">Upcoming Events</h4>
      <div className="text-3xl font-semibold">{eventsCount}</div>
    </div>
  )
}
export default UpcomingEvents
