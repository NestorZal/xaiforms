import React from "react";
import { FormResponseContext } from "../providers/FormResponseContextProvider";
import { getDeepValue } from "../utils/Helper";
import { maskValue } from "../form/utils/InputCurrencyMask";

const ResponseValue = (props) => {
  const { name, className, format, tag } = props;
  const { response } = React.useContext(FormResponseContext);

  let value = getDeepValue(name, response);

  const Tag = tag || "span";

  if (value) {
    if (format === "price") {
      value = maskValue(value);
    }
    if (format === "uppercase") {
      value = value.toUpperCase();
    }

    return <Tag className={className || null}>{value}</Tag>;
  }

  return null;
};

export default ResponseValue;
