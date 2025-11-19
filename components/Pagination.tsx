"use client";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const generatePages = () => {
    const pages = [];

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    pages.push(1);


    if (currentPage > 3) pages.push("...");

    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  const pages = generatePages();

  return (
    <div className="flex justify-end mt-6">
      <div className="join">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="join-item btn btn-sm"
        >
          Prev
        </button>

        {pages.map((pg, index) =>
          pg === "..." ? (
            <button key={index} className="join-item btn btn-sm btn-disabled">
              ...
            </button>
          ) : (
            <button
              key={index}
              onClick={() => onPageChange(Number(pg))}
              className={`join-item btn btn-sm btn-square ${currentPage === pg ? "btn-active bg-tprimary text-white" : ""
                }`}
            >
              {pg}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="join-item btn btn-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
