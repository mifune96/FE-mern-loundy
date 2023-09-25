import React from 'react'
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'
import CustomPagination from './custom-pagination'
import { Spinner } from 'reactstrap'
import '@styles/react/libs/tables/react-dataTable-component.scss'

export default function TableWithPagination({
  loading,
  columns,
  dataToRender,
  currentPage,
  perPage,
  handlePagination,
  handlePerPage,
  pageCount,
  pagination = true
}) {
  return (
    <div className='react-dataTable'>
      <DataTable
        noHeader
        pagination
        paginationServer
        data={dataToRender}
        columns={columns}
        className='react-dataTable'
        sortIcon={<ChevronDown size={10} />}
        progressPending={loading}
        progressComponent={
          <div className='d-flex justify-content-center my-1'>
            <Spinner color='primary' />
          </div>
        }
        paginationComponent={() => (
          <>
            {pagination && (
              <CustomPagination
                currentPage={currentPage}
                perPage={perPage}
                handlePagination={handlePagination}
                handlePerPage={handlePerPage}
                pageCount={pageCount}
              />
            )}
          </>
        )}
        // paginationDefaultPage={currentPage - 1}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
      />
    </div>
  )
}
