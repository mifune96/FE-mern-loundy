import React from 'react'
import ReactPaginate from 'react-paginate'

export default function Pagination({ currentPage, handlePagination, pageCount }) {
  return (
    <ReactPaginate
      nextLabel=''
      breakLabel='...'
      previousLabel=''
      pageRangeDisplayed={2}
      forcePage={currentPage - 1}
      marginPagesDisplayed={2}
      activeClassName='active'
      pageClassName='page-item'
      breakClassName='page-item'
      nextLinkClassName='page-link'
      pageLinkClassName='page-link'
      breakLinkClassName='page-link'
      previousLinkClassName='page-link'
      nextClassName='page-item next-item'
      previousClassName='page-item prev-item'
      pageCount={pageCount || 1}
      onPageChange={(page) => handlePagination(page)}
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end mt-1'
    />
  )
}
