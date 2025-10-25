const ContactForm = () => {
    return (
        <form className="space-y-6 bg-gray-50 p-6 rounded-2xl shadow-md" >
            <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-xl p-2" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" className="mt-1 block w-full border border-gray-300 rounded-xl p-2" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-xl p-2" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea rows={5} className="mt-1 block w-full border border-gray-300 rounded-xl p-2 resize-none" required></textarea>
            </div>
            <button
                type="submit"
                className="bg-emerald-500 text-white px-6 py-2 rounded-xl hover:bg-emerald-600 transition"
            >
                Send Message
            </button>
        </form >
    )
}
export default ContactForm