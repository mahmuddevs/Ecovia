"use server"
import { RegisterFormValues } from "@/app/(auth)/register/page"
import User from "@/db/UserSchema"
import dbConnect from "@/lib/dbConnect"
import generateToken, { verifyToken } from "@/lib/jwt/JWT"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import nodemailer from "nodemailer"

interface LoginCredentials {
  email: string
  password: string
}

export const registerUser = async ({
  name,
  email,
  password,
  userType,
  image,
}: RegisterFormValues) => {
  if (!name || !email || !password || !userType) {
    return { success: false, user: null, error: "All fields are required!" }
  }

  try {
    await dbConnect()

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return { success: false, user: null, error: "User Exists" }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      userType,
      image,
    })

    if (!newUser) {
      return { success: false, user: null }
    }

    const token = generateToken(newUser.email, userType)

    const cookieStore = await cookies()

    cookieStore.set({
      name: "authToken",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })

    const safeUser = JSON.parse(JSON.stringify(newUser))

    return {
      success: true,
      user: { ...safeUser, password: null },
    }
  } catch (error: any) {
    console.error("Error Adding User:", error.message)
    return { error: error.message }
  }
}

export const LoginUser = async ({ email, password }: LoginCredentials) => {
  try {
    await dbConnect()
    const user = await User.findOne({ email })
    if (!user) {
      return { success: false, user: null, error: "User not found" }
    }
    const isPassMatched = await bcrypt.compare(password, user.password)

    if (!isPassMatched) {
      return { success: false, user: null, error: "Invalid credentials" }
    }

    const token = generateToken(email, user?.userType || "Volunteer")

    const cookieStore = await cookies()

    cookieStore.set({
      name: "authToken",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })

    const safeUser = JSON.parse(JSON.stringify(user))

    return { success: true, user: { ...safeUser, password: null } }
  } catch (error: any) {
    console.error("Error Loggin In:", error.message)
    return { error: error.message }
  }
}

export const getAuthenticatedUser = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get("authToken")?.value

  const decoded = verifyToken(token) as { email: string; userType: string }

  const email = decoded?.email

  await dbConnect()

  const user = await User.findOne({ email })

  if (!user) {
    return { success: false, user: null }
  }

  const safeUser = JSON.parse(JSON.stringify(user))

  return { success: true, user: { ...safeUser, password: null } }
}

export const logoutUser = async () => {
  const cookieStore = await cookies()
  cookieStore.delete("authToken")

  return { success: true }
}

export const getAllUsers = async () => {
  await dbConnect()
  const allUsers = await User.find({}).select("-password")

  if (!allUsers) {
    return { success: false, users: null }
  }

  const safeUsers = JSON.parse(JSON.stringify(allUsers))
  return { success: true, users: safeUsers }
}

export const deleteUser = async (id: string) => {
  if (!id) {
    return { success: false, message: "Unable To Delete User" }
  }

  await dbConnect()

  const { userType } = (await User.findById(id).select("userType")) as {
    userType: string
  }

  if (userType === "admin") {
    return { success: false, message: "Can't Delete Admin Account" }
  }

  const result = await User.findByIdAndDelete(id)

  if (!result) {
    return { success: false, message: "Unable To Delete User" }
  }

  return { success: true, message: "Successfully Deleted User" }
}
export const handleForgotPassword = async (email: string) => {
  try {
    await dbConnect()

    const lowerEmail = email.toLowerCase()
    const user = await User.findOne({ email: lowerEmail })
    if (!user) {
      return { success: false, message: "User not found." }
    }

    // Generate Token
    const token = crypto.getRandomValues(new Uint8Array(32)).reduce((t, e) => t + e.toString(16).padStart(2, '0'), '')
    const otpExpiry = new Date(Date.now() + 60 * 60 * 1000) // 1 hour expiry to be safe

    // Save Token to DB using findOneAndUpdate to ensure it sticks
    const updatedUser = await User.findOneAndUpdate(
      { email: lowerEmail },
      { $set: { otp: token, otpExpiry } },
      { new: true, strict: false } // Force save even if schema doesn't match
    )

    if (!updatedUser) {
      console.error("Failed to update user with token")
      return { success: false, message: "Failed to generate reset token." }
    }

    console.log("--- Generate Token Debug ---")
    console.log("Token generated:", token)
    console.log("Expiry set to:", otpExpiry)
    console.log("Updated User OTP in DB:", updatedUser.otp)
    console.log("----------------------------")

    // Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}&email=${lowerEmail}`

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: lowerEmail,
      subject: "Ecovia Password Reset Link",
      text: `Click the link to reset your password: ${resetLink}. It expires in 1 hour.`,
      html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
              <h2>Password Reset Request</h2>
              <p>Click the button below to reset your password:</p>
              <a href="${resetLink}" style="background-color: #028a0f; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
              <p>This link expires in 1 hour.</p>
             </div>`,
    }

    await transporter.sendMail(mailOptions)

    return { success: true, message: "Reset link sent to your email." }
  } catch (error: any) {
    console.error("Forgot Password Error:", error)
    return { success: false, message: "Failed to send link.", error: error.message }
  }
}

export const resetPassword = async (email: string, token: string, newPassword: string) => {
  try {
    await dbConnect()

    const lowerEmail = email.toLowerCase()
    const user = await User.findOne({ email: lowerEmail })
    if (!user) {
      return { success: false, message: "User not found." }
    }

    console.log("--- Reset Password Debug ---")
    console.log("Email:", lowerEmail)
    console.log("Received Token:", token)
    console.log("Stored Token:", user.otp)
    console.log("Current Time:", new Date().toISOString())
    console.log("Expiry Time:", user.otpExpiry?.toISOString())

    const isTokenMatch = user.otp === token
    const isExpired = new Date() > new Date(user.otpExpiry!) // Ensure it's a Date object

    console.log("Token Match:", isTokenMatch)
    console.log("Is Expired:", isExpired)
    console.log("User OTP:", user.otp, "Length:", user.otp?.length)
    console.log("Received Token:", token, "Length:", token?.length)
    console.log("----------------------------")

    if (!isTokenMatch) {
      return { success: false, message: "Invalid token. Please check the link." }
    }

    if (isExpired) {
      return { success: false, message: "Token has expired. Please request a new one." }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await User.updateOne(
      { email: lowerEmail },
      {
        $set: { password: hashedPassword },
        $unset: { otp: "", otpExpiry: "" },
      }
    )

    return { success: true, message: "Password reset successfully." }
  } catch (error: any) {
    console.error("Reset Password Error:", error)
    return { success: false, message: "Failed to reset password.", error: error.message }
  }
}


export const handleUpdateUserType = async (id: string, userType: string) => {
  if (!id || !userType) {
    return { success: false, message: "Invalid Selection" }
  }

  await dbConnect()

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { userType },
    { new: true, select: "-password" }
  )

  if (!updatedUser) {
    return { success: false, message: "Unable To Update User Type" }
  }

  return { success: true, message: "User Updated Successfully" }
}

export const getUserPerMonth = async () => {
  await dbConnect()

  const currentYear = new Date().getFullYear()

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  const userPerMonth = await User.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(`${currentYear}-01-01`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        month: "$_id",
        count: 1,
      },
    },
  ])

  if (!userPerMonth) {
    return { success: false, userPerMonth: null }
  }

  const result = monthNames.map((name, index) => {
    const monthData = userPerMonth.find((item) => item.month === index + 1)
    return {
      month: name,
      count: monthData?.count || 0,
    }
  })

  const safeUserPerMonth = JSON.parse(JSON.stringify(result))
  return { success: true, userPerMonth: safeUserPerMonth }
}

export const totalVolunteer = async () => {
  await dbConnect()

  const totalVolunteerCount = await User.countDocuments({
    userType: "volunteer",
  })


  return totalVolunteerCount
}
