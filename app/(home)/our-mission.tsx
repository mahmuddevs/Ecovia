import { PiPlantFill } from "react-icons/pi"
import { TbHeartHandshake } from "react-icons/tb"
import { IoBookSharp } from "react-icons/io5"
import SectionTitle from "@/components/SectionTitle"

const OurMission = () => {
    return (
        <section className="bg-gray-100">
            <div className="global-container global-padding">
                <SectionTitle
                    heading="What Drives Us"
                    paragraph="We believe meaningful change starts at the grassroots. Through sustainability, education, and community engagement, we work together to create a healthier planet for future generations."
                    textColor="emerald-400"
                />
                <div className="grid md:grid-cols-3 gap-6 mb-10 text-center">
                    <div className="bg-emerald-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                        <div className="text-4xl mb-4 flex justify-center text-success"><PiPlantFill /></div>
                        <h3 className="text-lg font-semibold text-emerald-600 mb-2">Sustainability</h3>
                        <p className="text-gray-600 text-sm">Promoting eco-friendly practices to preserve natural resources.</p>
                    </div>

                    <div className="bg-emerald-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                        <div className="text-4xl mb-4 flex justify-center text-success"><TbHeartHandshake /></div>
                        <h3 className="text-lg font-semibold text-emerald-600 mb-2">Community Engagement</h3>
                        <p className="text-gray-600 text-sm">Empowering local actions for collective impact and resilience.</p>
                    </div>

                    <div className="bg-emerald-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                        <div className="text-4xl mb-4 flex justify-center text-success"><IoBookSharp /></div>
                        <h3 className="text-lg font-semibold text-emerald-600 mb-2">Education & Awareness</h3>
                        <p className="text-gray-600 text-sm">Spreading environmental knowledge to inspire conscious living.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default OurMission