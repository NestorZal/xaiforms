import React from "react";
import { useFormikContext } from "formik";
import calculateExpression from "../../utils/math/Expressions";
import { getDeepValue } from "../../utils/Helper";

const ConditionField = (props) => {
  const { tag, className, expression, truetxt, falsetxt, fieldname } = props;
  const { values } = useFormikContext();

  const Tag = tag || "div";

  let exp = expression;
  Object.keys(values).forEach((key) => {
    const field = `{${key}}`;
    if (exp.includes(field)) {
      exp = exp.replace(field, values[key]);
    }
  });

  let result = "";
  const value = fieldname ? getDeepValue(fieldname, values) : null;

  if (calculateExpression(exp)) {
    result = value ? truetxt.replace("%s", value) : truetxt;
  } else {
    result = value ? falsetxt.replace("%s", value) : falsetxt;
  }

  if (result) {
    return <Tag className={className}>{result}</Tag>;
  }

  return null;
};

export default ConditionField;
