import SectionTitle from "@/components/SectionTitle"


const VolunteerTestimonial = () => {
    return (
        <section className="global-container global-margin">
            <SectionTitle
                heading="Voices of Change"
                paragraph=" Hear from our amazing volunteers who are making a real impact in their communities."
            />
            <div className="grid gap-8 md:grid-cols-3">
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <p className="text-gray-700 mb-4">
                        “Volunteering here has been life-changing. I feel like I&apos;m finally part of something that truly matters.”
                    </p>
                    <div className="flex items-center gap-4">
                        <img
                            src="https://randomuser.me/api/portraits/women/68.jpg"
                            alt="Volunteer"
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="text-left">
                            <p className="font-semibold text-gray-900">Aisha R.</p>
                            <p className="text-sm text-gray-500">Volunteer - Tree Planting</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <p className="text-gray-700 mb-4">
                        “Being part of the cleanup events connected me with like-minded people who care about the planet.”
                    </p>
                    <div className="flex items-center gap-4">
                        <img
                            src="https://randomuser.me/api/portraits/men/75.jpg"
                            alt="Volunteer"
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="text-left">
                            <p className="font-semibold text-gray-900">Daniel M.</p>
                            <p className="text-sm text-gray-500">Volunteer - Beach Cleanup</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <p className="text-gray-700 mb-4">
                        “I love educating kids about sustainability! This platform gives me the tools and support to do it right.”
                    </p>
                    <div className="flex items-center gap-4">
                        <img
                            src="https://randomuser.me/api/portraits/women/44.jpg"
                            alt="Volunteer"
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="text-left">
                            <p className="font-semibold text-gray-900">Mira K.</p>
                            <p className="text-sm text-gray-500">Volunteer - Eco Workshops</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default VolunteerTestimonial