"use client";
import Link from "next/link";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  basePath?: string;
}

const Pagination = ({ totalPages, currentPage, basePath = "/events" }: PaginationProps) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-center gap-2 mt-6">
      {currentPage > 1 && (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="px-3 py-1 rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
        >
          Previous
        </Link>
      )}

      {Array.from({ length: totalPages }, (_, i) => (
        <Link
          key={i}
          href={`${basePath}?page=${i + 1}`}
          className={`px-3 py-1 rounded-md border ${currentPage === i + 1
            ? "bg-tprimary text-white border-tprimary"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
        >
          {i + 1}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="px-3 py-1 rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
        >
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
