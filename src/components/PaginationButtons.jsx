function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="join mt-4">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`join-item btn ${
            page === currentPage ? "btn-active" : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
