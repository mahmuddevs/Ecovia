import Link from "next/link"
import { FaArrowRight, FaHeart } from "react-icons/fa6"

const JoinOurMission = () => {
    return (
        <section className="global-padding bg-emerald-700 text-white">
            <div className="global-container text-center">
                <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
                <p className="text-lg max-w-2xl mx-auto mb-8">
                    Whether you want to volunteer your time, make a donation, or simply learn more about environmental
                    conservation, there are many ways to get involved with EcoAlliance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/dashboard/volunteer"
                        className="btn btn-lg bg-white text-emerald-700 hover:bg-emerald-100 border-none gap-2"
                    >
                        Become a Volunteer
                        <FaArrowRight className="h-5 w-5" />
                    </Link>
                    <Link href="/dashboard/donor" className="btn btn-lg btn-warning text-white hover:bg-amber-600 gap-2">
                        Make a Donation
                        <FaHeart className="h-5 w-5" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
export default JoinOurMission