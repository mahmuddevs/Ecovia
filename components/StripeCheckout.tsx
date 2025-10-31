"use client"
import { saveTransaction } from "@/actions/events/DonationActions"
import { useAppSelector } from "@/lib/hooks"
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import { Appearance, loadStripe } from "@stripe/stripe-js"
import { FormEvent, useState } from "react"
import Swal from "sweetalert2"

// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

function PaymentForm({ eventID, closeModal }: { eventID: string, closeModal: () => void }) {
  const stripe = useStripe()
  const elements = useElements()
  const { user } = useAppSelector(state => state.auth)
  const [message, setMessage] = useState<string | null | undefined>(null)
  const [isLoading, setIsLoading] = useState<Boolean>(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)

    const paymentResult = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "",
      },
      redirect: "if_required",
    })

    const { error, paymentIntent } = paymentResult

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message)
      } else {
        setMessage("An unexpected error occurred.")
      }
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${error.message}`,
        showConfirmButton: false,
        timer: 1500
      });
      setIsLoading(false)
      return
    }

    const amount = paymentIntent.amount

    const transactionData = {
      userEmail: user?.email,
      userID: user?._id,
      amount: amount / 100,
      eventID
    }

    const { success, message } = await saveTransaction(transactionData)

    if (!success) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${message}`,
        showConfirmButton: false,
        timer: 1500
      });
      setIsLoading(false)
      return
    }
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `${message}`,
      showConfirmButton: false,
      timer: 1500
    });
    setIsLoading(false)
    closeModal()
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <button
        className="btn bg-tprimary w-full text-white"
        disabled={!!isLoading || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  )
}

export default function CheckoutForm({
  clientSecret,
  eventID,
  closeModal
}: {
  clientSecret: string,
  eventID: string,
  closeModal: () => void
}) {
  const appearance = {
    theme: "stripe",
  } as Appearance | undefined

  return (
    <Elements
      key={clientSecret}
      stripe={stripePromise}
      options={{ appearance, clientSecret }}
    >
      <PaymentForm eventID={eventID} closeModal={closeModal} />
    </Elements>
  )
}
