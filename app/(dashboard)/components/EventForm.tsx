"use client";

import { addEvent } from "@/actions/events/EventActions";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

type EventType = "Awareness Campaign" | "Clean-up Drive" | "Webinar";

interface IEventFormInput {
  name: string;
  description: string;
  eventType: EventType;
  date: string;
  location: string;
  maxVolunteer: number;
  deadline: string;
  bannerImage: FileList;
}

const EventForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IEventFormInput>();


  const onSubmit = async (data: IEventFormInput) => {
    const { success, message } = await addEvent(data);
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
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <div>
        <label className="font-semibold">Event Name</label>
        <input
          type="text"
          {...register("name", { required: "Event name is required" })}
          className="input input-bordered w-full"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="font-semibold">Event Type</label>
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
          <p className="text-red-500 text-sm">{errors.eventType.message}</p>
        )}
      </div>

      <div>
        <label className="font-semibold">Date</label>
        <input
          type="date"
          {...register("date", { required: "Event date is required" })}
          className="input input-bordered w-full"
        />
        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date.message}</p>
        )}
      </div>

      <div>
        <label className="font-semibold">Registration Deadline</label>
        <input
          type="date"
          {...register("deadline", { required: "Deadline is required" })}
          className="input input-bordered w-full"
        />
        {errors.deadline && (
          <p className="text-red-500 text-sm">{errors.deadline.message}</p>
        )}
      </div>

      <div>
        <label className="font-semibold">Location</label>
        <input
          type="text"
          {...register("location", { required: "Location is required" })}
          className="input input-bordered w-full"
        />
        {errors.location && (
          <p className="text-red-500 text-sm">{errors.location.message}</p>
        )}
      </div>

      <div>
        <label className="font-semibold">Maximum Volunteers</label>
        <input
          type="number"
          {...register("maxVolunteer", {
            required: "Max volunteers required",
            min: { value: 1, message: "Must be at least 1" },
          })}
          className="input input-bordered w-full"
        />
        {errors.maxVolunteer && (
          <p className="text-red-500 text-sm">{errors.maxVolunteer.message}</p>
        )}
      </div>

      <div className="md:col-span-2">
        <label className="font-semibold">Banner Image</label>
        <input
          type="file"
          accept="image/*"
          {...register("bannerImage", {
            required: "Banner image is required",
          })}
          className="file-input file-input-bordered w-full"
        />
        {errors.bannerImage && (
          <p className="text-red-500 text-sm">{errors.bannerImage.message}</p>
        )}
      </div>

      <div className="md:col-span-2">
        <label className="font-semibold">Description</label>
        <textarea
          {...register("description", { required: "Description is required" })}
          className="textarea textarea-bordered w-full h-32"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-success text-white w-full"
        >
          {isSubmitting ? "Submitting..." : "Create Event"}
        </button>
      </div>
    </form>
  );
};

export default EventForm;
