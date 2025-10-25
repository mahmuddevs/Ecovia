import { FaCalendar, FaChevronRight, FaUsers } from "react-icons/fa6"
import Slider from "./slider"
import Link from "next/link"

const Hero = () => {
    return (
        <section className="relative">
            <Slider />
            <div className="bg-black/10 absolute top-0 z-5 w-full">
                <div>
                    <div className="global-container slider-height flex justify-start items-center text-white gap-4">
                        <div className="w-11/12 sm:w-full max-w-4xl space-y-4">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight md:w-8/12">
                                Together for a <span className="text-emerald-400">Greener</span> Tomorrow
                            </h1>
                            <p className="!text-xl text-shadow-lg md:w-10/12">Join us in protecting the planet through community-driven events, volunteer programs, and impactful donations.</p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href='/events' className="btn btn-success btn-lg gap-2 text-white">
                                    <FaCalendar className="h-5 w-5" />
                                    View Upcoming Events
                                    <FaChevronRight className="h-4 w-4" />
                                </Link>

                                <Link href='/dashboard/volunteer' className="btn btn-outline btn-lg
                                bg-black/40 border-emerald-400 text-emerald-400 hover:bg-black-20 hover:border-emerald-500  gap-2">
                                    <FaUsers className="h-5 w-5" />
                                    Become a Volunteer
                                </Link>
                                {/* <button className="btn btn-warning btn-lg text-white gap-2 hover:bg-amber-600">
                                    <FaHeart className="h-5 w-5" />
                                    Donate Now
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
export default Hero