import Image from "next/image"
import storyImage from '@/public/assets/images/our-story.jpg'
import SectionTitle from "@/components/SectionTitle"

const OurStory = () => {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <SectionTitle heading="Our Story" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                        <Image
                            src={storyImage}
                            alt="EcoVia team working on conservation project"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div>
                        <p className="text-gray-600 mb-6">
                            EcoVia was founded in 2010 by a group of passionate environmentalists who saw the need for a
                            community-based approach to conservation. What began as a small local initiative has grown into a
                            nationwide movement with thousands of volunteers and supporters.
                        </p>
                        <p className="text-gray-600 mb-6">
                            Over the years, we've planted over 10,000 trees, cleaned countless beaches and waterways, established
                            community gardens, and educated thousands of people about sustainable living practices. Our growth has
                            been fueled by the dedication of our volunteers and the generosity of our donors.
                        </p>
                        <p className="text-gray-600">
                            Today, EcoVia continues to expand its reach and impact, developing innovative programs and
                            partnerships to address the most pressing environmental challenges of our time.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default OurStory