import React from "react";
import { FormContext } from "../providers/FormContextProvider";

const ResponseValue = (props) => {
  const { key, className } = props;
  const { responseData } = React.useContext(FormContext);

  const value = responseData[key];

  return <span className={className || null}>{value}</span>;
};

export default ResponseValue;
