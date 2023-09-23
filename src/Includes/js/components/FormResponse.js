import React from "react";
import { FormContext } from "../providers/FormContextProvider";

const FormResponse = (props) => {
  const { children, status, className } = props;
  const { responseStatus } = React.useContext(FormContext);

  if (responseStatus !== status) {
    return null;
  }

  return <div className={className || null}>{children}</div>;
};

export default FormResponse;
