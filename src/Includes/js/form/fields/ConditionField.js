import React from "react";
import { useFormikContext } from "formik";
import calculateExpression from "../../utils/math/Expressions";
import { FormContext } from "../../providers/FormContextProvider";
import {
  replaceExpressionValue,
  expRequireFieldValues,
} from "../../utils/Helper";

const ValidateCondition = ({ condition, error, exp, values }) => {
  const { setCurrentValidXaiForm, firstRender } = React.useContext(FormContext);

  if (!condition) {
    if (expRequireFieldValues(exp, values) && firstRender) {
      return null;
    }

    setCurrentValidXaiForm(false);
    return <div className="error">{error}</div>;
  }

  setCurrentValidXaiForm(true);
  return null;
};

const GroupCondition = ({ children, condition, tag, className }) => {
  if (condition) {
    const Tag = tag;
    return tag ? <Tag className={className}>{children}</Tag> : children;
  }

  return null;
};

const ConditionField = (props) => {
  const { children, cond, type, "error-msg-condition": error, ...rest } = props;

  if (!cond) {
    return null;
  }

  const { values } = useFormikContext();

  const condition = calculateExpression(replaceExpressionValue(cond, values));
  if (type === "validate") {
    return (
      <ValidateCondition
        condition={condition}
        error={error}
        exp={cond}
        values={values}
      />
    );
  }

  return (
    <GroupCondition condition={condition} {...rest}>
      {children}
    </GroupCondition>
  );
};

export default ConditionField;
