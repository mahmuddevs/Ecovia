import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormValues } from "./EventButtons";
import { BaseSyntheticEvent, RefObject } from "react";

type Props = {
  modalRef: RefObject<HTMLDialogElement | null>;
  register: UseFormRegister<FormValues>;
  handleSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
  errors: FieldErrors<FormValues>;
};

const VolunteerApplyModal = ({
  modalRef,
  register,
  handleSubmit,
  errors,
}: Props) => {
  return (
    <dialog ref={modalRef} className="modal modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Apply as Volunteer</h3>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="input input-bordered w-full"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Your email"
              className="input input-bordered w-full"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              placeholder="Tell us about yourself"
              className="textarea textarea-bordered w-full"
              rows={3}
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Minimum 10 characters required",
                },
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <button type="submit" className="btn bg-tprimary text-white">
              Submit
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => modalRef.current?.close()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default VolunteerApplyModal;
