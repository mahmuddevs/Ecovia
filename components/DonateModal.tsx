"use client";
import { useAppSelector } from "@/lib/hooks";
import { FormEvent, RefObject } from "react";
import Swal from "sweetalert2";

type Props = {
  modalRef: RefObject<HTMLDialogElement | null>;
  openPaymentModal: (amount: number) => void;
  formRef: RefObject<HTMLFormElement | null>;
};

const DonateModal = ({ modalRef, openPaymentModal, formRef }: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const handleInput = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Please Login As A Donor",
        showConfirmButton: false,
        timer: 1500,
      });
      formRef.current?.reset();
      modalRef.current?.close();
      return;
    }
    const formData = new FormData(e.currentTarget);
    const inputAmount = Number(formData.get("amount"));
    if (inputAmount < 15) {
      return;
    }
    openPaymentModal(inputAmount);
  };

  return (
    <dialog ref={modalRef} className="modal modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Donate</h3>
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <form ref={formRef} onSubmit={handleInput}>
              <label htmlFor="amount">Enter Amount (Min: 15$)</label>
              <input
                type="number"
                name="amount"
                className="input input-bordered w-full mb-2"
                placeholder="Enter amount"
                min={15}
              />
              <button
                type="submit"
                className="btn bg-tprimary w-full text-white"
              >
                Proceed To Payment
              </button>
            </form>
            <button
              type="button"
              className="btn w-full"
              onClick={() => {
                formRef.current?.reset();
                modalRef.current?.close();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};
export default DonateModal;
