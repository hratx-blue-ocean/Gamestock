import React from "react";
// import ReactPaginate from "react-paginate"; ew packages!

const Paginator = ({
  collection,
  cardsPerPage,
  currentCards,
  handlePageClick,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(collection.length / cardsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map((page) => {
          return (
            <li key={page} value={page} onClick={(e) => handlePageClick(e)}>
              {page}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Paginator;
