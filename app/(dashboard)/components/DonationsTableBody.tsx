"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa";
import { getAllDonations } from "@/actions/events/DonationActions";
import { Donation } from "./DonationsTable";
import Pagination from "@/components/Pagination";
import Spinner from "@/components/Spinner";

const DonationsTableBody = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const donationsPerPage = 12;

  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const fetchDonations = async (page: number) => {
    try {
      setLoading(true);
      const {
        success,
        donations: fetchedDonations,
        totalPages: serverTotalPages,
      } = await getAllDonations(page, donationsPerPage);

      if (!success) {
        setDonations([]);
        setTotalPages(1);
        return;
      }

      setDonations(fetchedDonations);
      setTotalPages(serverTotalPages || 1);
    } catch (err) {
      console.error("Error fetching donations:", err);
      setDonations([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    router.push(`${window.location.pathname}?page=${page}`);
  };

  const handleViewDetails = (donation: Donation) => {
    setSelectedDonation(donation);
    // Open the modal
    const modal = document.getElementById("donation_details_modal") as HTMLDialogElement;
    modal?.showModal();
  };

  const closeModal = () => {
    setSelectedDonation(null);
    const modal = document.getElementById("donation_details_modal") as HTMLDialogElement;
    modal?.close();
  };

  if (loading) return <Spinner small />;

  return (
    <>
      <div className="overflow-x-auto shadow-lg rounded-lg border">
        <table className="table w-full">
          <thead className="bg-green-100 text-green-800 font-semibold text-sm">
            <tr>
              <th>#</th>
              <th>Donor</th>
              <th>Event</th>
              <th>Amount</th>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.length > 0 ? (
              donations.map((donation, index) => (
                <tr key={donation._id} className="hover">
                  <td>{(currentPage - 1) * donationsPerPage + (index + 1)}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={donation.userImage}
                        className="w-8 h-8 rounded-full object-cover"
                        alt={donation.userName}
                      />
                      <div>
                        <div className="font-medium">{donation.userName}</div>
                        <div className="text-xs text-gray-500">{donation.userEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="font-medium">{donation.eventName}</div>
                      <div className="text-xs text-gray-500">{donation.eventType}</div>
                    </div>
                  </td>
                  <td className="font-semibold">
                    {donation.currency?.toUpperCase() || "N/A"} {donation.amount?.toFixed(2) || "0.00"}
                  </td>
                  <td className="font-mono text-xs">{donation.transactionId}</td>
                  <td>{new Date(donation.createdAt).toLocaleDateString()}</td>
                  <td>
                    <FaEye
                      onClick={() => handleViewDetails(donation)}
                      className="text-blue-500 cursor-pointer hover:text-blue-700 transition text-xl"
                      title="View Details"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No donations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {/* DaisyUI Modal for Donation Details */}
      <dialog id="donation_details_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {selectedDonation && (
            <div>
              <h3 className="font-bold text-2xl mb-6 text-green-700">Donation Details</h3>

              <div className="space-y-4">
                {/* Donor Information */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg mb-3 text-green-800">Donor Information</h4>
                  <div className="flex items-center gap-4 mb-3">
                    <img
                      src={selectedDonation.userImage}
                      className="w-16 h-16 rounded-full object-cover border-2 border-green-300"
                      alt={selectedDonation.userName}
                    />
                    <div>
                      <p className="font-medium text-lg">{selectedDonation.userName}</p>
                      <p className="text-sm text-gray-600">{selectedDonation.userEmail}</p>
                    </div>
                  </div>
                </div>

                {/* Event Information */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg mb-3 text-blue-800">Event Information</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm text-gray-600">Event Name</p>
                      <p className="font-medium">{selectedDonation.eventName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Event Type</p>
                      <p className="font-medium">{selectedDonation.eventType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Event Date</p>
                      <p className="font-medium">
                        {new Date(selectedDonation.eventDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Transaction Information */}
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg mb-3 text-purple-800">Transaction Information</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm text-gray-600">Amount</p>
                      <p className="font-bold text-xl text-green-600">
                        {selectedDonation.currency?.toUpperCase() || "N/A"} {selectedDonation.amount?.toFixed(2) || "0.00"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Currency</p>
                      <p className="font-medium">{selectedDonation.currency?.toUpperCase() || "N/A"}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-600">Transaction ID</p>
                      <p className="font-mono text-sm bg-white p-2 rounded border">
                        {selectedDonation.transactionId}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date & Time</p>
                      <p className="font-medium">
                        {new Date(selectedDonation.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-action">
                <form method="dialog">
                  <button className="btn btn-primary">Close</button>
                </form>
              </div>
            </div>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={closeModal}>close</button>
        </form>
      </dialog>
    </>
  );
};

export default DonationsTableBody;
