import React from "react";
import { useFormikContext } from "formik";
import calculateExpression from "../../utils/math/Expressions";

const ExpressionField = (props) => {
  const { tag, className, expression, defaultValue } = props;
  const { values } = useFormikContext();

  const Tag = tag || "div";

  let exp = expression;
  Object.keys(values).forEach((key) => {
    const field = `{${key}}`;
    if (exp.includes(field)) {
      exp = exp.replace(field, values[key]);
    }
  });

  let result = calculateExpression(exp);
  result = !result && defaultValue ? defaultValue : result;

  return <Tag className={className}>{result}</Tag>;
};

export default ExpressionField;
