"use client";
import { registerUser } from "@/actions/users/UserActions";
import { login } from "@/lib/features/authSlice/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";


export interface RegisterFormValues {
    name: string;
    email: string;
    password: string;
    userType?: "admin" | "volunteer" | "donor";
    image?: string;
}

const Register = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>();

    const dispatch = useAppDispatch()

    const router = useRouter()

    const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
        const result = await registerUser({ ...data });
        if (!result.success) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Something Went Wrong",
                showConfirmButton: false,
                timer: 1500
            });
            return
        }

        dispatch(login(result.user))
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registered Successfully",
            showConfirmButton: false,
            timer: 1500
        });
        reset()
        router.push('/')
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <form method="POST" onSubmit={handleSubmit(onSubmit)} className="fieldset">
                        <label className="fieldset-label">Name</label>
                        <input type="text" className="input w-full" placeholder="Name"
                            {...register("name", { required: "Name is Required" })}
                        />
                        {errors.name && (
                            <span className="text-error text-xs mt-1">
                                {errors.name.message}
                            </span>
                        )}
                        <label className="fieldset-label">Email</label>
                        <input type="email" className="input w-full" placeholder="Email"
                            {...register("email", { required: "Email is Required" })}
                        />
                        {errors.email && (
                            <span className="text-error text-xs mt-1">
                                {errors.email.message}
                            </span>
                        )}
                        <label className="fieldset-label">Password</label>
                        <input type="password" className="input w-full" placeholder="Password"
                            {...register("password", {
                                required: "Password is Required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters long",
                                },
                                pattern: {
                                    value: /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
                                    message: "Password must have at least 1 uppercase letter and 1 special character",
                                },
                            })}
                        />
                        {errors.password && (
                            <span className="text-error text-xs mt-1">
                                {errors.password.message}
                            </span>
                        )}
                        <label className="fieldset-label">Account Type</label>
                        <select defaultValue="" className="select w-full"
                            {...register("userType", { required: "Type is Required" })}>
                            <option value="" disabled>Select A Type</option>
                            <option value="volunteer">Volunteer</option>
                            <option value="donor">Donor</option>
                        </select>
                        {errors.userType && (
                            <span className="text-error text-xs mt-1">
                                {errors.userType.message}
                            </span>
                        )}
                        <div className="flex justify-between">
                            <span>Already Have an Account?</span>
                            <Link href="/login" className="link link-hover text-blue-600">Login Here.</Link>
                        </div>
                        <button type="submit" className="btn bg-tprimary mt-4" disabled={isSubmitting}>
                            {isSubmitting ? "Registering..." : "Register"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
