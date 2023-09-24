import React from "react";

const FormResponse = (props) => {
  const { children, className } = props;

  return <div className={className || null}>{children}</div>;
};

export default FormResponse;
