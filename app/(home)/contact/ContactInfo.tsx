import { FaEnvelope, FaMapPin, FaPhone } from "react-icons/fa6"

const ContactInfo = () => {
    return (
        <div className="flex flex-col justify-between bg-gray-50 p-6 rounded-2xl shadow-md">
            <div className="space-y-4">
                <h2 className="text-3xl font-bold text-tprimary">Contact Information</h2>
                <p className="text-gray-700 flex gap-3 items-center !text-xl"><FaMapPin /> Mannerheimintie 20 B, 00100 Helsinki, Finland</p>
                <p className="text-gray-700 flex gap-3 items-center !text-xl"><FaPhone /> +1 (234) 567-8901</p>
                <p className="text-gray-700 flex gap-3 items-center !text-xl"><FaEnvelope /> contact@ecovia.org</p>
            </div>
            <div className="mt-8">
                <iframe
                    src="https://maps.google.com/maps?q=Mannerheimintie%2020%20B%2C%2000100%20Helsinki%2C%20Finland&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-64 rounded-xl border-0"
                    allowFullScreen
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    )
}
export default ContactInfo