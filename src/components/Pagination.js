import React, { useState } from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const pageNumbers = [];
  const int = Math.ceil(totalPosts / postsPerPage);

  for (let i = 1; i <= int; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination">
      {pageNumbers.includes(currentPage - 1) && (
        <a
          onClick={() => {
            setCurrentPage(currentPage - 1);
            paginate(currentPage - 1);
          }}
          href="!#"
          className="page-link"
        >
          Prev
        </a>
      )}
      {pageNumbers.includes(currentPage) && (
        <p className="page-link">{currentPage}</p>
      )}
      {pageNumbers.includes(currentPage + 1) && (
        <a
          onClick={() => {
            setCurrentPage(currentPage + 1);
            paginate(currentPage + 1);
          }}
          href="!#"
          className="page-link"
        >
          Next
        </a>
      )}
    </nav>
  );
};

export default Pagination;
