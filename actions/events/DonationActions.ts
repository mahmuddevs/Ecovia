"use server"

import Donation from "@/db/DonationSchema"
import dbConnect from "@/lib/dbConnect"

interface TransactionInfo {
  userEmail: string | undefined
  userID: string | undefined
  amount: number | undefined
  eventID: string | undefined
}

export const saveTransaction = async ({
  userEmail,
  userID,
  amount,
  eventID,
}: TransactionInfo) => {
  if (!userEmail || !userID || !amount || !eventID) {
    return { success: false, message: "No Data Received" }
  }

  await dbConnect()

  const payload = {
    userEmail,
    userID,
    amount,
    eventID,
  }

  const result = await Donation.create(payload)

  if (!result) {
    return { success: false, message: "Failed To Save Transaction" }
  }

  return { success: true, message: "Transaction Successful" }
}

export const getDonationOfThisYear = async () => {
  const currentYear = new Date().getFullYear()
  const result = await Donation.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date("2025-01-01T00:00:00.000Z"),
          $lt: new Date("2026-01-01T00:00:00.000Z"),
        },
      },
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" },
      },
    },
  ]);

  return result[0]?.totalAmount || 0;
}
