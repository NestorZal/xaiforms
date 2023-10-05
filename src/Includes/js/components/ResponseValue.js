import React from "react";
import { FormResponseContext } from "../providers/FormResponseContextProvider";
import { getDeepValue } from "../utils/Helper";
import { maskValue } from "../form/utils/InputCurrencyMask";

const ResponseValue = (props) => {
  const { name, className, format } = props;
  const { response } = React.useContext(FormResponseContext);

  let value = getDeepValue(name, response);

  if (value) {
    if (format === "price") {
      value = maskValue(value);
    }
    if (format === "uppercase") {
      value = value.toUpperCase();
    }

    return <span className={className || null}>{value}</span>;
  }

  return null;
};

export default ResponseValue;
