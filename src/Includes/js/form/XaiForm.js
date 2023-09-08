import React from "react";
import { Formik, Form } from "formik";
import request from "./utils/Request";

let formData;
export const setFormData = (metaData, initialValues) => {
  formData = {
    metaData: metaData,
    initialValues: initialValues,
  };
};

const handleSubmit = async (values) => {
  const { metaData } = formData;

  const data = values;

  const requestData = {
    method: metaData.method,
    endpoint: metaData.endpoint,
    body: data,
  };

  request(requestData).then((response) => {
    console.log(response);
  });

  console.dir(values);
};

const XaiForm = ({ children }) => {
  const { initialValues } = formData;

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>{children}</Form>
    </Formik>
  );
};

export default XaiForm;
