import { useState, useEffect } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import LButton from "@components/button";
import TextInputWithLabel from "@components/text-input-with-label";
import TableWithPagination from "@components/table";
import axios from "axios";
import ModalUnits from "./modal";
import { deleteData, getData } from "@src/utility/fetch";
import Swal from "sweetalert2";

export default function PageUnits() {
  const [isFetching, setisFetching] = useState(false);
  const [filter, setFilter] = useState({ keyword: "", page: 1, size: 10 });
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);
  const [isModal, setIsModal] = useState(false);
  const [id, setId] = useState(null);

  const onChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const getAllUnits = async (query) => {
    setisFetching(true);
    const res = await getData(`/v1/cms/units`, query);

    setData(res.data.data.contents);
    setCount(res.data.data.totalPages);
    setisFetching(false);
  };

  useEffect(() => {
    getAllUnits(filter);
  }, [filter.page, filter.size]);

  const renderCell = (row) => {
    const handleEdit = (id) => {
      toggle();
      setId(id);
    };

    const handleDelete = (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await deleteData(`/v1/cms/units/${id}`);
          if (res.status === 200) {
            getAllUnits(filter);
          }
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    };

    return (
      <>
        <LButton className="me-2" size="sm" onClick={() => handleEdit(row.id)}>
          Edit
        </LButton>
        <LButton size="sm" color="danger" onClick={() => handleDelete(row.id)}>
          Delete
        </LButton>
      </>
    );
  };

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
      cell: (row) => renderCell(row),
    },
  ];

  const toggle = () => setIsModal(!isModal);

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
            <ModalUnits
              open={isModal}
              toggle={toggle}
              id={id}
              getAllUnits={() =>
                getAllUnits({ keyword: "", page: 1, size: 10 })
              }
            />
            <LButton onClick={() => toggle()}>Create</LButton>
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
