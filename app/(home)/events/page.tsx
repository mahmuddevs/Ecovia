
import PageBanner from '@/components/PageBanner'
import eventsBanner from '@/public/assets/images/events-banner.jpg'
import AllEvents from "./AllEvents"

const Events = () => {
    return (
        <>
            <PageBanner
                image={eventsBanner}
                heading="Every Action Counts — Join Our Upcoming Events!"
                paragraph="Join a community of changemakers taking small steps toward a healthier planet. Find events near you and get involved today."
            />
            <AllEvents />
        </>
    )
}
export default Events