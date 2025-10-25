import Achievements from "./achievements"
import Hero from "./hero"
import OurMission from "./our-mission"
import UpcomingEvents from "./upcoming-events"
import VolunteerTestimonial from "./volunteer-testimonials"

const Home = () => {
    return (
        <>
            <Hero />
            <Achievements />
            <UpcomingEvents />
            <OurMission />
            <VolunteerTestimonial />
        </>
    )
}
export default Home