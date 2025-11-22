"use client"
import { handleForgotPassword } from "@/actions/users/UserActions"
import { useState } from "react"
import { useForm } from "react-hook-form"
import Swal from "sweetalert2"
import Link from "next/link"

interface ForgotPasswordValues {
  email: string
}

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>()

  const onSubmit = async (data: ForgotPasswordValues) => {
    const { success, message } = await handleForgotPassword(data.email)

    if (!success) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: message,
        showConfirmButton: false,
        timer: 1500,
      })
      return
    }

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 1500,
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Forgot Password?</h1>
          <p className="text-gray-500">Enter your email to receive a reset code</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-tprimary focus:ring-2 focus:ring-tprimary/20 outline-none transition-all bg-gray-50 focus:bg-white"
              placeholder="name@example.com"
              {...register("email", { required: "Email is Required" })}
            />
            {errors.email && (
              <span className="text-error text-xs mt-1 block">
                {errors.email.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-tprimary hover:bg-tprimary/90 text-white font-semibold rounded-xl shadow-lg shadow-tprimary/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending OTP..." : "Send OTP"}
          </button>

          <div className="text-center text-sm text-gray-600 mt-6">
            Remember your password?{" "}
            <Link href="/login" className="font-semibold text-tprimary hover:text-tprimary/80 transition-colors">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
