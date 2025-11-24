"use client"
import { resetPassword } from "@/actions/users/UserActions"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { IoIosEyeOff, IoMdEye } from "react-icons/io"
import Swal from "sweetalert2"

interface ResetPasswordValues {
  password: string
  confirmPassword: string
}

import { Suspense } from "react"

function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const email = searchParams.get("email")
  const router = useRouter()
  const [showPass, setShowPass] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<ResetPasswordValues>()

  const onSubmit = async (data: ResetPasswordValues) => {
    if (!token || !email) {
      Swal.fire({
        icon: "error",
        title: "Invalid Link",
        text: "Please request a new password reset link.",
      })
      return
    }

    const { success, message } = await resetPassword(email, token, data.password)

    if (!success) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
      })
      return
    }

    Swal.fire({
      icon: "success",
      title: "Success",
      text: message,
      timer: 1500,
      showConfirmButton: false,
    })
    router.push("/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Reset Password</h1>
          <p className="text-gray-500">Enter your new password below</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">New Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-tprimary focus:ring-2 focus:ring-tprimary/20 outline-none transition-all bg-gray-50 focus:bg-white"
                placeholder="Enter new password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              <div
                onClick={() => setShowPass(!showPass)}
                className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-400 hover:text-gray-600 cursor-pointer text-xl"
              >
                {showPass ? <IoIosEyeOff /> : <IoMdEye />}
              </div>
            </div>
            {errors.password && (
              <span className="text-error text-xs mt-1 block">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-tprimary focus:ring-2 focus:ring-tprimary/20 outline-none transition-all bg-gray-50 focus:bg-white"
              placeholder="Confirm new password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (val: string) => {
                  if (watch("password") != val) {
                    return "Your passwords do not match"
                  }
                },
              })}
            />
            {errors.confirmPassword && (
              <span className="text-error text-xs mt-1 block">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-tprimary hover:bg-tprimary/90 text-white font-semibold rounded-xl shadow-lg shadow-tprimary/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  )
}
