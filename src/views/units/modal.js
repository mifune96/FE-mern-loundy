import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Col,
  ModalFooter,
  Form,
} from "reactstrap";
import LButton from "@components/button";
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInputWithLabelR } from "@components/react-hook-form";
import { getData, postData, putData } from "@src/utility/fetch";

const schema = yup
  .object({
    code: yup.string().required(),
    name: yup.string().required(),
  })
  .required();

export default function ModalUnits({ open, toggle, id, getAllUnits }) {
  const formHook = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      let res;
      if (id) {
        res = await putData(`/v1/cms/units/${id}`, data);
      } else {
        res = await postData(`/v1/cms/units`, data);
      }

      if (res.status === 200 || res.status === 201) {
        setIsLoading(false);
        getAllUnits();
        toggle();

        formHook.reset();
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const getOneUnit = async () => {
    const res = await getData(`/v1/cms/units/${id}`);
    for (const [key, value] of Object.entries(res.data.data)) {
      formHook.setValue(key, value);
    }
  };

  useEffect(() => {
    if (id) {
      getOneUnit();
    }
  }, [id]);

  return (
    <Modal centered isOpen={open} toggle={toggle} className="modal-md">
      <ModalHeader toggle={toggle}>{id ? "Edit" : "Add"}</ModalHeader>

      <FormProvider {...formHook}>
        <Form onSubmit={formHook.handleSubmit(onSubmit)}>
          <ModalBody>
            <Row>
              <Col md={12}>
                <TextInputWithLabelR
                  name="code"
                  label="Code"
                  placeholder="masukkan code"
                />
              </Col>
              <Col md={12}>
                <TextInputWithLabelR
                  name="name"
                  label="Name"
                  placeholder="masukkan name"
                />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <LButton color="primary" type="submit" isLoading={isLoading}>
              Save
            </LButton>
          </ModalFooter>
        </Form>
      </FormProvider>
    </Modal>
  );
}
