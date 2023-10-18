import React from "react";
import { useFormikContext } from "formik";
import calculateExpression from "../../utils/math/Expressions";
import { getDeepValue } from "../../utils/Helper";

const ConditionField = (props) => {
  const { tag, className, expression, truetxt, falsetxt, fieldname } = props;
  const { values } = useFormikContext();

  let exp = expression;
  Object.keys(values).forEach((key) => {
    const field = `{${key}}`;
    if (exp.includes(field)) {
      exp = exp.replaceAll(field, values[key]);
    }
  });

  let result = "";
  const value = fieldname ? getDeepValue(fieldname, values) : null;

  if (calculateExpression(exp) && truetxt) {
    result = value ? truetxt.replace("%s", value) : truetxt;
  } else if (falsetxt) {
    result = value ? falsetxt.replace("%s", value) : falsetxt;
  }

  if (result) {
    const Tag = tag;
    return tag ? <Tag className={className}>{result}</Tag> : result;
  }

  return null;
};

export default ConditionField;
