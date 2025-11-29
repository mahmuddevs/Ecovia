"use client";

import { useState } from "react";
import { generateDonationReportPDF } from "@/actions/events/DonationActions";
import { FaFilePdf } from "react-icons/fa";

const DonationReportGenerator = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<"all_time" | "this_month" | "last_6_months" | "last_1_year">("this_month");
  const [generating, setGenerating] = useState(false);

  const generateReport = async () => {
    try {
      setGenerating(true);

      // Call server action to generate PDF
      const { success, pdfData, fileName, message } = await generateDonationReportPDF(selectedPeriod);

      if (!success || !pdfData) {
        alert(message || "Failed to generate report");
        return;
      }

      // Convert base64 to blob and download
      const base64Response = await fetch(pdfData);
      const blob = await base64Response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName || `Ecovia_Donation_Report_${selectedPeriod}.pdf`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating report:", error);
      alert("Error generating report. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-lg border mx-4 my-4">
      <div className="card-body">
        <h3 className="card-title text-green-700">Generate Donation Report</h3>
        <p className="text-sm text-gray-600">Generate a PDF report of donations for a selected time period</p>

        <div className="flex flex-wrap gap-4 items-end mt-4 max-w-[350px]">
          <div className="form-control flex-1 min-w-[150px]">
            <label className="label">
              <span className="label-text font-medium mb-2">Select Time Period</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as any)}
              disabled={generating}
            >
              <option value="this_month">This Month</option>
              <option value="last_6_months">Last 6 Months</option>
              <option value="last_1_year">Last 1 Year</option>
              <option value="all_time">All Time</option>
            </select>
          </div>

          <button
            className="btn btn-success text-white gap-2"
            onClick={generateReport}
            disabled={generating}
          >
            {generating ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Generating...
              </>
            ) : (
              <>
                <FaFilePdf />
                Generate Report
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationReportGenerator;
