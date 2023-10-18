import React from "react";
import { useFormikContext } from "formik";
import calculateExpression from "../../utils/math/Expressions";

const ExpressionField = (props) => {
  const { tag, className, expression, defaultValue } = props;
  const { values } = useFormikContext();

  let exp = expression;
  Object.keys(values).forEach((key) => {
    const field = `{${key}}`;
    if (exp.includes(field)) {
      exp = exp.replaceAll(field, values[key]);
    }
  });

  let result = calculateExpression(exp);
  result = !result && defaultValue ? defaultValue : result;

  if (result) {
    const Tag = tag;
    return tag ? <Tag className={className}>{result}</Tag> : result;
  }

  return null;
};

export default ExpressionField;
