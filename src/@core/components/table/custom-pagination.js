import React from 'react'
import { Col, Input, Row } from 'reactstrap'
import Pagination from '../pagination'
import { optionSize } from './default'

export default function CustomPagination({
  currentPage,
  perPage,
  handlePagination,
  handlePerPage,
  pageCount
}) {
  return (
    <Row style={{ margin: '0px' }}>
      <Col xl='6' className='d-flex align-items-center'>
        <div className='d-flex align-items-center w-100'>
          <label htmlFor='rows-per-page'>Per Page</label>
          <Input
            className='mx-50'
            type='select'
            id='rows-per-page'
            value={perPage}
            onChange={handlePerPage}
            style={{ width: '5rem' }}
          >
            {optionSize.map((oS) => (
              <option value={oS} key={oS}>
                {oS}
              </option>
            ))}
          </Input>
        </div>
      </Col>
      <Col xl='6'>
        <Pagination
          currentPage={currentPage}
          handlePagination={handlePagination}
          pageCount={pageCount}
        />
      </Col>
    </Row>
  )
}
