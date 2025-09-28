import React from 'react';
import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  onPageChange: (selected: number) => void;
  forcePage: number;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange, forcePage }) => {
  if (pageCount <= 1) {
    return null;
  }

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="→"
      onPageChange={({ selected }) => onPageChange(selected)}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="←"
      forcePage={forcePage}
      containerClassName={css.pagination}
      pageLinkClassName={css.pageLink}
      previousLinkClassName={css.pageLink}
      nextLinkClassName={css.pageLink}
      activeClassName={css.active}
      disabledClassName={css.disabled}
    />
  );
};

export default Pagination;