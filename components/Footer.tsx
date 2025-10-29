import Link from "next/link"
import { FaLeaf } from "react-icons/fa6"

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="global-container">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <FaLeaf className="h-6 w-6 text-emerald-400" />
                            <span className="font-bold text-xl">EcoVia</span>
                        </div>
                        <p className="text-gray-400">
                            A mission-driven environmental organization dedicated to promoting sustainability, conservation, and
                            climate action.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {["Home", "About Us", "Events", "Donate", "Contact Us"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Get Involved</h3>
                        <ul className="space-y-2">
                            {["Volunteer", "Donate", "Partner With Us", "Corporate Sponsorship", "Events"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <address className="text-gray-400 not-italic">
                            <p>123 Green Street</p>
                            <p>Eco City, EC 12345</p>
                            <p className="mt-2">info@ecovia.org</p>
                            <p>(123) 456-7890</p>
                        </address>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>© {new Date().getFullYear()} EcoVia. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
export default Footer