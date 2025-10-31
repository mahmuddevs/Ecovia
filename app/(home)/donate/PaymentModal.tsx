"use client"
import CheckoutForm from "@/components/StripeCheckout"
import { RefObject } from "react"

type Props = {
  modalRef: RefObject<HTMLDialogElement | null>
  clientSecret: string | null
  eventID: string
}

const PaymentModal = ({ modalRef, clientSecret, eventID }: Props) => {
  const closeModal = () => {
    modalRef.current?.close()
  }
  return (
    <dialog ref={modalRef} className="modal modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Donate</h3>
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            {/* Need to add stripe component and a form field to take  amount input */}
            {clientSecret && <CheckoutForm clientSecret={clientSecret} eventID={eventID} closeModal={closeModal} />}
            <button
              type="button"
              className="btn w-full"
              onClick={() => modalRef.current?.close()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </dialog>
  )
}

export default PaymentModal
