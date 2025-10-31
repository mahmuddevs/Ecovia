"use client";

import { FaDonate, FaHandsHelping } from "react-icons/fa";
import VolunteerApplyModal from "./VolunteerApplyModal";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ApplyAsVolunteer } from "@/actions/events/VolunteerActions";
import Swal from "sweetalert2";
import { useAppSelector } from "@/lib/hooks";
import { redirect } from "next/navigation";
import DonateModal from "./DonateModal";
import PaymentModal from "@/app/(home)/donate/PaymentModal";

export type FormValues = {
  name: string;
  email: string;
  description: string;
};

const EventButtons = ({ eventId }: { eventId: string }) => {
  const volunteerModalRef = useRef<HTMLDialogElement>(null);
  const paymentModalRef = useRef<HTMLDialogElement>(null)
  const donateModalRef = useRef<HTMLDialogElement>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const { user } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const handleApplyButton = () => {
    if (!user) {
      redirect("/login");
    }
    if (user?.userType !== "volunteer") {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Please Login As A Volunteer",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    volunteerModalRef.current?.showModal();
  };

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


  const onSubmit = async (data: FormValues) => {
    const { success, message } = await ApplyAsVolunteer({ eventId, ...data });

    if (!success) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `${message}`,
      showConfirmButton: false,
      timer: 1500,
    });
    reset();
    volunteerModalRef?.current?.close();
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 mt-10">
        <button
          className="btn bg-tprimary text-white w-full sm:w-auto"
          onClick={handleApplyButton}
        >
          <FaHandsHelping className="mr-2" />
          Apply As Volunteer
        </button>

        <button
          onClick={openDonateModal}
          className="btn btn-error text-white w-full sm:w-auto"
        >
          <FaDonate className="mr-2" />
          Donate
        </button>
      </div>

      <VolunteerApplyModal
        modalRef={volunteerModalRef}
        register={register}
        handleSubmit={handleSubmit(onSubmit)}
        errors={errors}
      />
      <DonateModal
        key={eventId}
        formRef={formRef}
        modalRef={donateModalRef}
        openPaymentModal={openPaymentModal}
      />
      {clientSecret && (
        <PaymentModal
          key={eventId + "mdl"}
          eventID={eventId}
          modalRef={paymentModalRef}
          clientSecret={clientSecret}
        />
      )}
    </>
  );
};

export default EventButtons;
