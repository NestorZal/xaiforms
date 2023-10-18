import React from "react";
import { useFormikContext } from "formik";
import calculateExpression from "../../utils/math/Expressions";

const GroupConditionField = (props) => {
  const { children, tag, className, expression } = props;
  const { values } = useFormikContext();

  let exp = expression;
  Object.keys(values).forEach((key) => {
    const field = `{${key}}`;
    if (exp.includes(field)) {
      exp = exp.replaceAll(field, values[key]);
    }
  });

  if (calculateExpression(exp)) {
    const Tag = tag;
    return tag ? <Tag className={className}>{children}</Tag> : children;
  }

  return null;
};

export default GroupConditionField;
