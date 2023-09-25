import { useState, useEffect } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import LButton from "@components/button";
import TextInputWithLabel from "@components/text-input-with-label";
import TableWithPagination from "@components/table";
import axios from "axios";

export default function PageUnits() {
  const [isFetching, setisFetching] = useState(false);
  const [filter, setFilter] = useState({ keyword: "", page: 1, size: 1 });
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);
  const onChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const getAllUnits = async (query) => {
    setisFetching(true);
    const res = await axios.get(
      `http://localhost:3010/api/v1/cms/units?keyword=${query.keyword}&page=${query.page}&size=${query.size}`
    );

    setData(res.data.data.contents);
    setCount(res.data.data.totalPages);
    setisFetching(false);
  };

  useEffect(() => {
    getAllUnits();
  }, [filter.page, filter.size]);

  const columns = [
    {
      name: "Code",
      sortable: false,
      selector: (row) => row.code,
    },
    {
      name: "Name",
      sortable: false,
      selector: (row) => row.name,
    },

    {
      name: "Action",
      //   cell: (row) => RenderCell(row),
    },
  ];

  return (
    <Card>
      <CardBody>
        <Row className="mb-2">
          <Col md={3}>
            <TextInputWithLabel
              name="keyword"
              label="Search"
              placeholder="masukkan pencarian"
              value={filter.keyword}
              onChange={onChange}
            />
          </Col>
          <Col md={3} className="d-flex align-items-end">
            <LButton
              onClick={() => {
                getAllUnits({ ...filter, page: 1 });
                setFilter({ ...filter, page: 1 });
              }}
            >
              Search
            </LButton>
          </Col>
          <Col className="d-flex align-items-end justify-content-end">
            <LButton onClick={() => alert("test")}>Create</LButton>
          </Col>
        </Row>
        <TableWithPagination
          columns={columns}
          dataToRender={data}
          currentPage={filter.page}
          perPage={filter.size}
          handlePagination={(page) =>
            setFilter({ ...filter, page: page.selected + 1 })
          }
          handlePerPage={(e) =>
            setFilter({ ...filter, size: e.target.value, page: 1 })
          }
          pageCount={count}
          loading={isFetching}
        />
      </CardBody>
    </Card>
  );
}
