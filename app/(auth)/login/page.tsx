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
    <div className="hero bg-base-200 min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
            className="fieldset"
          >
            <label className="fieldset-label">Email</label>
            <input
              type="email"
              className="input w-full"
              placeholder="Email"
              {...register("email", { required: "Email is Required" })}
            />
            {errors.email && (
              <span className="text-error text-xs mt-1">
                {errors.email.message}
              </span>
            )}
            <label className="fieldset-label">Password</label>
            <div className="relative">
              <input
                type={`${showPass ? "text" : "password"}`}
                className="input w-full"
                placeholder="Password"
                {...register("password", { required: "Psassword is Required" })}
              />
              <div
                onClick={() => {
                  setShowPass(!showPass)
                }}
                className="text-2xl absolute top-[50%] -translate-y-[50%] right-2 cursor-pointer"
              >
                {showPass ? <IoIosEyeOff /> : <IoMdEye />}
              </div>
            </div>
            {errors.password && (
              <span className="text-error text-xs mt-1">
                {errors.password.message}
              </span>
            )}
            <div className="flex justify-between">
              <a className="link link-hover">Forgot password?</a>
              <div>
                Or,{" "}
                <Link
                  href="/register"
                  className="link link-hover text-blue-600"
                >
                  Create an Account.
                </Link>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging In..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Login
