import React, { useEffect, useState } from "react";
import TextInputWithLabel from "@components/text-input-with-label";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Col,
  ModalFooter,
} from "reactstrap";
import LButton from "@components/button";
import axios from "axios";

export default function ModalUnits({ open, toggle, id, getAllUnits }) {
  const [form, setForm] = useState({ code: "", name: "" });
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      let res;
      if (id) {
        res = await axios.put(
          `http://localhost:3010/api/v1/cms/units/${id}`,
          form
        );
      } else {
        res = await axios.post(`http://localhost:3010/api/v1/cms/units`, form);
      }

      console.log(res);

      if (res.status === 200 || res.status === 201) {
        setIsLoading(false);
        getAllUnits();
        toggle();

        setForm({ code: "", name: "" });
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const getOneUnit = async () => {
    const res = await axios.get(`http://localhost:3010/api/v1/cms/units/${id}`);

    setForm({ name: res.data.data.name, code: res.data.data.code });
  };

  useEffect(() => {
    if (id) {
      getOneUnit();
    }
  }, [id]);

  return (
    <Modal centered isOpen={open} toggle={toggle} className="modal-md">
      <ModalHeader toggle={toggle}>{id ? "Edit" : "Add"}</ModalHeader>

      <ModalBody>
        <Row>
          <Col md={12}>
            {/* <TextInputWithLabelR label="Code" name="code" /> */}
            <TextInputWithLabel
              name="code"
              label="Code"
              placeholder="masukkan code"
              value={form.code}
              onChange={onChange}
            />
          </Col>
          <Col md={12}>
            {/* <TextInputWithLabelR label="Name" name="name" /> */}
            <TextInputWithLabel
              name="name"
              label="Name"
              placeholder="masukkan name"
              value={form.name}
              onChange={onChange}
            />
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <LButton color="primary" onClick={onSubmit} isLoading={isLoading}>
          Save
        </LButton>
      </ModalFooter>
    </Modal>
  );
}
