import React from "react";
import { FormResponseContext } from "../providers/FormResponseContextProvider";

const ResponseValue = (props) => {
  const { name, className } = props;
  const { response } = React.useContext(FormResponseContext);

  const value = response && response[name] ? response[name] : "";
  return <span className={className || null}>{value}</span>;
};

export default ResponseValue;
