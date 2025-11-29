"use server";

import Donation from "@/db/DonationSchema";
import dbConnect from "@/lib/dbConnect";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface TransactionInfo {
  userEmail: string | undefined;
  userID: string | undefined;
  amount: number | undefined;
  eventID: string | undefined;
  currency: string | undefined;
  transactionId: string | undefined;
}

export const saveTransaction = async ({
  userEmail,
  userID,
  amount,
  eventID,
  currency,
  transactionId,
}: TransactionInfo) => {
  if (
    !userEmail ||
    !userID ||
    !amount ||
    !eventID ||
    !currency ||
    !transactionId
  ) {
    return { success: false, message: "No Data Received" };
  }

  await dbConnect();

  const payload = {
    userEmail,
    userID,
    amount,
    eventID,
    currency,
    transactionId,
  };
  const result = await Donation.create(payload);

  if (!result) {
    return { success: false, message: "Failed To Save Transaction" };
  }

  return { success: true, message: "Transaction Successful" };
};

export const getDonationOfThisYear = async () => {
  const currentYear = new Date().getFullYear();
  const startDate = new Date(`${currentYear}-01-01T00:00:00.000Z`);
  const endDate = new Date(`${currentYear + 1}-01-01T00:00:00.000Z`);

  const result = await Donation.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startDate,
          $lt: endDate,
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
};

export const getAllDonations = async (page: number = 1, limit: number = 12) => {
  try {
    await dbConnect();

    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalDonations = await Donation.countDocuments();
    const totalPages = Math.ceil(totalDonations / limit);

    // Aggregate donations with user and event details
    const donations = await Donation.aggregate([
      {
        $sort: { createdAt: -1 }, // Sort by newest first
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: "users", // MongoDB collection name for users
          localField: "userID",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $lookup: {
          from: "events", // MongoDB collection name for events
          localField: "eventID",
          foreignField: "_id",
          as: "event",
        },
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$event",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          amount: 1,
          currency: 1,
          transactionId: 1,
          userEmail: 1,
          createdAt: 1,
          userName: "$user.name",
          userImage: "$user.image",
          eventName: "$event.name",
          eventType: "$event.eventType",
          eventDate: "$event.date",
        },
      },
    ]);

    // Serialize the data to plain objects
    const safeDonations = JSON.parse(JSON.stringify(donations));

    return {
      success: true,
      donations: safeDonations,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching donations:", error);
    return {
      success: false,
      donations: [],
      totalPages: 1,
      currentPage: 1,
      message: "Failed to fetch donations",
    };
  }
};

export const getDonationReportData = async (
  period: "all_time" | "this_month" | "last_6_months" | "last_1_year"
) => {
  try {
    await dbConnect();

    const now = new Date();
    let startDate: Date | null = null;
    let endDate = now;

    // Calculate start date based on period
    switch (period) {
      case "this_month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "last_6_months":
        startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
        break;
      case "last_1_year":
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), 1);
        break;
      case "all_time":
        startDate = null; // No date filter for all time
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    const matchStage = startDate
      ? {
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      }
      : {};

    // Get overall statistics
    const overallStats = await Donation.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          donationCount: { $sum: 1 },
          avgDonation: { $avg: "$amount" },
        },
      },
    ]);

    // Get monthly breakdown
    const monthlyData = await Donation.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          totalAmount: { $sum: "$amount" },
          donationCount: { $sum: 1 },
          currency: { $first: "$currency" },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    // Get event-wise breakdown
    const eventBreakdown = await Donation.aggregate([
      { $match: matchStage },
      {
        $lookup: {
          from: "events",
          localField: "eventID",
          foreignField: "_id",
          as: "event",
        },
      },
      {
        $unwind: {
          path: "$event",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$eventID",
          eventName: { $first: "$event.name" },
          eventType: { $first: "$event.eventType" },
          totalAmount: { $sum: "$amount" },
          donationCount: { $sum: 1 },
          currency: { $first: "$currency" },
        },
      },
      {
        $sort: { totalAmount: -1 },
      },
    ]);

    // Get yearly breakdown (only relevant for all_time or long periods, but we can return it always or conditionally)
    const yearlyBreakdown = await Donation.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: { $year: "$createdAt" },
          totalAmount: { $sum: "$amount" },
          donationCount: { $sum: 1 },
        },
      },
      {
        $sort: { _id: -1 },
      },
    ]);

    const safeOverallStats = JSON.parse(JSON.stringify(overallStats));
    const safeMonthlyData = JSON.parse(JSON.stringify(monthlyData));
    const safeEventBreakdown = JSON.parse(JSON.stringify(eventBreakdown));
    const safeYearlyBreakdown = JSON.parse(JSON.stringify(yearlyBreakdown));

    return {
      success: true,
      period,
      startDate: startDate ? startDate.toISOString() : null,
      endDate: endDate.toISOString(),
      overallStats: safeOverallStats[0] || {
        totalAmount: 0,
        donationCount: 0,
        avgDonation: 0,
      },
      monthlyData: safeMonthlyData,
      eventBreakdown: safeEventBreakdown,
      yearlyBreakdown: safeYearlyBreakdown,
    };
  } catch (error) {
    console.error("Error fetching donation report data:", error);
    return {
      success: false,
      overallStats: { totalAmount: 0, donationCount: 0, avgDonation: 0 },
      monthlyData: [],
      eventBreakdown: [],
      yearlyBreakdown: [],
      startDate: null,
      endDate: new Date().toISOString(),
      message: "Failed to fetch donation data",
    };
  }
};

export const generateDonationReportPDF = async (
  period: "all_time" | "this_month" | "last_6_months" | "last_1_year"
) => {
  try {
    // Fetch data using the unified function
    const {
      success,
      overallStats,
      monthlyData,
      eventBreakdown,
      yearlyBreakdown,
      startDate,
      endDate,
    } = await getDonationReportData(period);

    if (!success) {
      return { success: false, message: "Failed to fetch donation data" };
    }

    const periodLabels = {
      this_month: "This Month",
      last_6_months: "Last 6 Months",
      last_1_year: "Last 1 Year",
      all_time: "All Time",
    };

    // Create PDF
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(20);
    doc.setTextColor(34, 139, 34); // Green color
    doc.text("Ecovia Donation Report", 14, 20);

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Period: ${periodLabels[period]}`, 14, 30);

    // Add date range
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const formattedStartDate = startDate
      ? new Date(startDate).toLocaleDateString()
      : "Beginning";
    const formattedEndDate = new Date(endDate || new Date().toISOString()).toLocaleDateString();
    doc.text(`Date Range: ${formattedStartDate} - ${formattedEndDate}`, 14, 38);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 44);

    // Overall Statistics
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Overall Statistics", 14, 56);

    doc.setFontSize(10);
    doc.text(`Total Donations: ${overallStats.donationCount}`, 14, 64);
    doc.text(`Total Amount: USD ${overallStats.totalAmount.toFixed(2)}`, 14, 71);
    doc.text(
      `Average Donation: USD ${overallStats.avgDonation.toFixed(2)}`,
      14,
      78
    );

    let currentY = 91;

    // Monthly Breakdown Table (if there's data and not all_time, or if we want it for all_time too)
    // For all_time, yearly breakdown might be more relevant, but monthly is fine too if not too long.
    // Let's show Yearly for All Time, and Monthly for others.
    if (period === "all_time" && yearlyBreakdown.length > 0) {
      doc.setFontSize(12);
      doc.text("Yearly Breakdown", 14, currentY);

      const yearlyTableData = yearlyBreakdown.map((item: any) => [
        item._id.toString(),
        item.donationCount,
        `USD ${item.totalAmount.toFixed(2)}`,
      ]);

      autoTable(doc, {
        startY: currentY + 5,
        head: [["Year", "Donations", "Total Amount"]],
        body: yearlyTableData,
        theme: "striped",
        headStyles: { fillColor: [34, 139, 34] },
      });
      currentY = (doc as any).lastAutoTable.finalY + 15;
    } else if (monthlyData.length > 0) {
      doc.setFontSize(12);
      doc.text("Monthly Breakdown", 14, currentY);

      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const monthlyTableData = monthlyData.map((item: any) => [
        `${monthNames[item._id.month - 1]} ${item._id.year}`,
        item.donationCount,
        `${item.currency?.toUpperCase() || "USD"
        } ${item.totalAmount.toFixed(2)}`,
      ]);

      autoTable(doc, {
        startY: currentY + 5,
        head: [["Month", "Donations", "Total Amount"]],
        body: monthlyTableData,
        theme: "striped",
        headStyles: { fillColor: [34, 139, 34] },
      });
      currentY = (doc as any).lastAutoTable.finalY + 15;
    }

    // Event Breakdown Table
    doc.setFontSize(12);
    doc.text("Event-wise Breakdown", 14, currentY);

    const eventTableData = eventBreakdown.map((item: any) => [
      item.eventName || "Unknown Event",
      item.eventType || "N/A",
      item.donationCount,
      `${item.currency?.toUpperCase() || "USD"} ${item.totalAmount.toFixed(2)}`,
    ]);

    autoTable(doc, {
      startY: currentY + 5,
      head: [["Event Name", "Event Type", "Donations", "Total Amount"]],
      body:
        eventTableData.length > 0
          ? eventTableData
          : [["No events found", "-", "-", "-"]],
      theme: "striped",
      headStyles: { fillColor: [34, 139, 34] },
    });

    // Convert PDF to base64
    const pdfBase64 = doc.output("datauristring");

    return {
      success: true,
      pdfData: pdfBase64,
      fileName: `Ecovia_Donation_Report_${period}_${new Date().getTime()}.pdf`,
    };
  } catch (error) {
    console.error("Error generating PDF:", error);
    return {
      success: false,
      message: "Failed to generate PDF report",
    };
  }
};
