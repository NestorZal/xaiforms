import React from "react";
import { FormResponseContext } from "../providers/FormResponseContextProvider";
import { getDeepValue } from "../utils/Helper";

const ResponseValue = (props) => {
  const { name, className } = props;
  const { response } = React.useContext(FormResponseContext);

  const value = getDeepValue(name, response);
  return <span className={className || null}>{value || ""}</span>;
};

export default ResponseValue;
