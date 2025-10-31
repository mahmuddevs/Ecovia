"use client";

import { updateEvent } from "@/actions/events/EventActions";
import { useAppDispatch } from "@/lib/hooks";
import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

type EventType = "Awareness Campaign" | "Clean-up Drive" | "Webinar";

export interface IEventFormInput {
  _id: string;
  name: string;
  description: string;
  eventType: EventType;
  date: string;
  location: string;
  maxVolunteer: number;
  deadline: string;
  bannerImage: FileList | string;
}

interface EventUpdateModalProps {
  event: IEventFormInput;
  isOpen: boolean;
  onClose: () => void;
}

const EventUpdateModal = ({
  event,
  isOpen,
  onClose,
}: EventUpdateModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IEventFormInput>();

  useEffect(() => {
    if (event && isOpen) {
      reset({
        _id: event._id,
        name: event.name,
        description: event.description,
        eventType: event.eventType,
        date: new Date(event.date).toISOString().split("T")[0],
        location: event.location,
        maxVolunteer: event.maxVolunteer,
        deadline: new Date(event.deadline).toISOString().split("T")[0],
        bannerImage: event.bannerImage,
      });
    }
  }, [event, isOpen, reset]);

  const onSubmit = async (data: IEventFormInput) => {
    const { success, message, updatedEvent } = await updateEvent(
      event._id,
      data
    );

    if (!success) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: message,
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });

    reset();
    onClose();
  };

  return (
    <dialog id="update_event_modal" className="modal" open={isOpen}>
      <div className="modal-box max-w-5xl">
        <h3 className="font-bold text-2xl mb-6">Update Event</h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input type="hidden" {...register("_id")} />

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Event Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: "Event name is required" })}
              className="input input-bordered w-full"
            />
            {errors.name && (
              <label className="label">
                <span className="label-text-alt text-red-500">
                  {errors.name.message}
                </span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Event Type</span>
            </label>
            <select
              {...register("eventType", { required: "Event type is required" })}
              className="select select-bordered w-full"
            >
              <option value="">Select Type</option>
              <option value="Awareness Campaign">Awareness Campaign</option>
              <option value="Clean-up Drive">Clean-up Drive</option>
              <option value="Webinar">Webinar</option>
            </select>
            {errors.eventType && (
              <label className="label">
                <span className="label-text-alt text-red-500">
                  {errors.eventType.message}
                </span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Date</span>
            </label>
            <input
              type="date"
              {...register("date", { required: "Event date is required" })}
              className="input input-bordered w-full"
            />
            {errors.date && (
              <label className="label">
                <span className="label-text-alt text-red-500">
                  {errors.date.message}
                </span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">
                Registration Deadline
              </span>
            </label>
            <input
              type="date"
              {...register("deadline", { required: "Deadline is required" })}
              className="input input-bordered w-full"
            />
            {errors.deadline && (
              <label className="label">
                <span className="label-text-alt text-red-500">
                  {errors.deadline.message}
                </span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Location</span>
            </label>
            <input
              type="text"
              {...register("location", { required: "Location is required" })}
              className="input input-bordered w-full"
            />
            {errors.location && (
              <label className="label">
                <span className="label-text-alt text-red-500">
                  {errors.location.message}
                </span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">
                Maximum Volunteers
              </span>
            </label>
            <input
              type="number"
              {...register("maxVolunteer", {
                required: "Max volunteers required",
                min: { value: 1, message: "Must be at least 1" },
              })}
              className="input input-bordered w-full"
            />
            {errors.maxVolunteer && (
              <label className="label">
                <span className="label-text-alt text-red-500">
                  {errors.maxVolunteer.message}
                </span>
              </label>
            )}
          </div>

          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text font-semibold">Banner Image</span>
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("bannerImage")}
              className="file-input file-input-bordered w-full"
            />
            {typeof event.bannerImage === "string" && (
              <div className="mt-2">
                <span className="text-sm text-gray-500">Current image:</span>
                <Image
                  src={event.bannerImage}
                  alt="Current banner"
                  width={140}
                  height={100}
                  className="mt-1 object-cover rounded"
                />
              </div>
            )}
            {errors.bannerImage && (
              <label className="label">
                <span className="label-text-alt text-red-500">
                  {errors.bannerImage.message}
                </span>
              </label>
            )}
          </div>

          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text font-semibold">Description</span>
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="textarea textarea-bordered w-full h-32"
            />
            {errors.description && (
              <label className="label">
                <span className="label-text-alt text-red-500">
                  {errors.description.message}
                </span>
              </label>
            )}
          </div>

          <div className="modal-action md:col-span-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn bg-emerald-600 text-white"
            >
              {isSubmitting ? "Updating..." : "Update Event"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EventUpdateModal;
