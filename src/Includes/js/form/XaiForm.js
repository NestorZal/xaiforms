import React from "react";
import { Formik, Form } from "formik";
import request from "./utils/Request";
import { TemplateContext } from "../components/TemplateContextProvider";

const handleSubmit = (values, metaData) => {
  const { _wpnonce, ...data } = values;

  const requestData = {
    method: metaData.method,
    endpoint: metaData.endpoint,
    body: data,
  };

  if (_wpnonce) {
    requestData._wpnonce = _wpnonce;
  }

  request(requestData).then((response) => {
    console.log(response);
  });

  console.dir(values);

  return true;
};

const renderXaiForm = (children, formValues, props) => {
  React.useEffect(() => {
    /* eslint no-param-reassign: "error" */
    formValues.current = props.values;
  }, [props.values]);

  return children;
};

const XaiForm = ({ children }) => {
  const { fieldValues, metaData } = React.useContext(TemplateContext);
  const formValues = React.useRef(fieldValues);

  return (
    <Formik
      initialValues={formValues.current}
      onSubmit={async (values) => {
        return handleSubmit(values, metaData);
      }}
    >
      {(props) => <Form>{renderXaiForm(children, formValues, props)}</Form>}
    </Formik>
  );
};

export default XaiForm;
