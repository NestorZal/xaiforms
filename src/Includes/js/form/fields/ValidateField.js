import React from "react";
import { useFormikContext } from "formik";
import calculateExpression from "../../utils/math/Expressions";

const ValidateField = (props) => {
  const { expression, className, ...rest } = props;
  const { values } = useFormikContext();

  let exp = expression;
  Object.keys(values).forEach((key) => {
    const field = `{${key}}`;
    if (exp.includes(field)) {
      exp = exp.replace(field, values[key]);
    }
  });

  const firstRender = React.useRef(true);
  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    }
  });

  const error = rest["error-msg-expression"]
    ? rest["error-msg-expression"]
    : "";
  if (!calculateExpression(exp) && !firstRender.current) {
    return <div className="error">{error}</div>;
  }

  return null;
};

export default ValidateField;
