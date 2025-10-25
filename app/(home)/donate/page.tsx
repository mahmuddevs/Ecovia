
import donateBanner from "@/public/assets/images/contact-banner.jpg"
import EventCard from "./EventCard"
import PageBanner from "@/components/PageBanner"
import SectionTitle from "@/components/SectionTitle"

export interface Event {
  _id: string
  name: string
  description: string
  eventType: string
  date: string
  location: string
  maxVolunteer: number
  deadline: string
  bannerImage: string
}

const Donate = async () => {
  // const { events } = (await getAllEvents()) as { events: Event[] }
  return (
    <>
      <PageBanner
        image={donateBanner}
        heading="Support a Greener Tomorrow"
        paragraph="Your donation helps us organize clean-up drives, tree plantations, and awareness events that protect our planet. Every contribution counts."
      />
      <section className="global-container global-margin">
        <SectionTitle
          heading="Donate"
          paragraph="Your support powers our environmental events and community impact."
        />
        <div className="grid lg:grid-cols-2 gap-4">
          {/* {events.map((event) => (
            <EventCard key={event._id} {...event} />
          ))} */}
        </div>
      </section>
    </>
  )
}
export default Donate
