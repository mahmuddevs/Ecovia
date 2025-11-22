"use client"
import { LoginUser } from "@/actions/users/UserActions"
import { login } from "@/lib/features/authSlice/authSlice"
import { useAppDispatch } from "@/lib/hooks"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { IoIosEyeOff, IoMdEye } from "react-icons/io"
import Swal from "sweetalert2"


interface LoginFormValues {
  email: string
  password: string
}

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>()
  const [showPass, setShowPass] = useState<Boolean>(false)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    const result = await LoginUser({ ...data })
    if (!result.success) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Something Went Wrong",
        showConfirmButton: false,
        timer: 1500,
      })
      return
    }

    dispatch(login(result.user))

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Logged In Successfully",
      showConfirmButton: false,
      timer: 1500,
    })
    reset()
    router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">Welcome Back</h1>
          <p className="text-gray-500">Sign in to <span className="text-tprimary font-semibold">Ecovia</span> to continue</p>
        </div>

        <form
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
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

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Password</label>
            <div className="relative">
              <input
                type={`${showPass ? "text" : "password"}`}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-tprimary focus:ring-2 focus:ring-tprimary/20 outline-none transition-all bg-gray-50 focus:bg-white"
                placeholder="Enter your password"
                {...register("password", { required: "Password is Required" })}
              />
              <div
                onClick={() => {
                  setShowPass(!showPass)
                }}
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

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-tprimary focus:ring-tprimary border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">Remember me</label>
            </div>
            <Link href="/forgot-password" className="text-sm font-medium text-tprimary hover:text-tprimary/80 transition-colors">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-tprimary hover:bg-tprimary/90 text-white font-semibold rounded-xl shadow-lg shadow-tprimary/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging In..." : "Sign In"}
          </button>
          {/* 
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div> */}

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-tprimary hover:text-tprimary/80 transition-colors"
            >
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Login
