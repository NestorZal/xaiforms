import React from "react";
import { FormResponseContext } from "../providers/FormResponseContextProvider";
import { getDeepValue } from "../utils/Helper";
import mask from "../form/utils/Mask";

const ResponseValue = (props) => {
  const { name, className, type, tag } = props;
  const { response } = React.useContext(FormResponseContext);

  let value = getDeepValue(name, response);

  const Tag = tag || "span";

  if (value) {
    value = mask(value, type);
    return <Tag className={className || null}>{value}</Tag>;
  }

  return null;
};

export default ResponseValue;
