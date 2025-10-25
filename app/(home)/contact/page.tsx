
import ContactForm from "./ContactForm"
import ContactInfo from "./ContactInfo"
import contactBanner from "@/public/assets/images/contact-banner.jpg"
import PageBanner from "@/components/PageBanner"

const Contact = () => {
  return (
    <>
      <PageBanner
        image={contactBanner}
        heading="Get in Touch"
        paragraph="We'd love to hear from you. Whether you have a question, suggestion, or just want to say hello."
      />
      <section className="global-container global-margin grid grid-cols-1 md:grid-cols-2 gap-10">
        <ContactForm />
        <ContactInfo />
      </section>
    </>
  )
}
export default Contact
