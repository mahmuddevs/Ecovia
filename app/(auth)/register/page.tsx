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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold mb-2 text-gray-900">Create Account</h1>
                    <p className="text-gray-500">Join <span className="text-tprimary font-semibold">Ecovia</span> today</p>
                </div>

                <form method="POST" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 block">Full Name</label>
                        <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-tprimary focus:ring-2 focus:ring-tprimary/20 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="John Doe"
                            {...register("name", { required: "Name is Required" })}
                        />
                        {errors.name && (
                            <span className="text-error text-xs mt-1 block">
                                {errors.name.message}
                            </span>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 block">Email Address</label>
                        <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-tprimary focus:ring-2 focus:ring-tprimary/20 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="name@example.com"
                            {...register("email", { required: "Email is Required" })}
                        />
                        {errors.email && (
                            <span className="text-error text-xs mt-1 block">
                                {errors.email.message}
                            </span>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 block">Password</label>
                        <input type="password" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-tprimary focus:ring-2 focus:ring-tprimary/20 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="Create a password"
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
                            <span className="text-error text-xs mt-1 block">
                                {errors.password.message}
                            </span>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 block">Account Type</label>
                        <div className="relative">
                            <select defaultValue="" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-tprimary focus:ring-2 focus:ring-tprimary/20 outline-none transition-all bg-gray-50 focus:bg-white appearance-none"
                                {...register("userType", { required: "Type is Required" })}>
                                <option value="" disabled>Select Account Type</option>
                                <option value="volunteer">Volunteer</option>
                                <option value="donor">Donor</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                        {errors.userType && (
                            <span className="text-error text-xs mt-1 block">
                                {errors.userType.message}
                            </span>
                        )}
                    </div>

                    <button type="submit" className="w-full py-3.5 px-4 bg-tprimary hover:bg-tprimary/90 text-white font-semibold rounded-xl shadow-lg shadow-tprimary/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed mt-2" disabled={isSubmitting}>
                        {isSubmitting ? "Creating Account..." : "Create Account"}
                    </button>

                    <div className="text-center text-sm text-gray-600 mt-6">
                        Already have an account?{" "}
                        <Link href="/login" className="font-semibold text-tprimary hover:text-tprimary/80 transition-colors">
                            Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
