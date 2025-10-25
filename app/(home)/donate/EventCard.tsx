"use client"

import { FaHeart, FaMapPin, FaUsers } from "react-icons/fa6"
import { Event } from "./page"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import PaymentModal from "./PaymentModal"
import DonateModal from "@/app/(dashboard)/components/DonateModal"

const EventCard = ({
  _id,
  name,
  description,
  eventType,
  location,
  date,
  bannerImage,
}: Event) => {
  const paymentModalRef = useRef<HTMLDialogElement>(null)
  const donateModalRef = useRef<HTMLDialogElement>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const openDonateModal = () => {
    donateModalRef.current?.showModal()
  }
  const openPaymentModal = async (amount: number) => {

    const fetchClientSecret = async () => {
      const res = await fetch("/api/stripePaymentIntent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100),
        }),
      })

      const { clientSecret } = await res.json()
      return clientSecret
    }

    const clientSecret = await fetchClientSecret()
    setClientSecret(clientSecret)
  }

  useEffect(() => {
    paymentModalRef.current?.showModal()
    formRef.current?.reset()
    donateModalRef.current?.close()
  }, [clientSecret])

  return (
    <>
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden transition-transform h-full">
        {/* Left: Image */}
        <div className="relative w-full md:w-2/6 h-64 md:h-auto">
          <Image
            src={bannerImage}
            alt={name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right: Content */}
        <div className="p-5 flex flex-col justify-between md:w-4/6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {description}
            </p>

            <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <FaHeart className="text-red-500" />
                <span>{eventType}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUsers className="text-blue-500" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapPin className="text-green-600" />
                <span>{location}</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={openDonateModal}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg transition duration-200 cursor-pointer"
            >
              Donate Now
            </button>
            <Link
              href={`/events/${_id}`}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-lg text-center transition duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
      <DonateModal
        key={_id}
        formRef={formRef}
        modalRef={donateModalRef}
        openPaymentModal={openPaymentModal}
      />
      {clientSecret && (
        <PaymentModal
          key={_id + "mdl"}
          modalRef={paymentModalRef}
          clientSecret={clientSecret}
          eventID={_id}
        />
      )}
    </>
  )
}

export default EventCard
