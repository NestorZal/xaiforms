import React from "react";
import { useFormikContext } from "formik";
import calculateExpression from "../../utils/math/Expressions";
import { FormContext } from "../../providers/FormContextProvider";
import { replaceExpressionValue } from "../../utils/Helper";

const ValidateCondition = ({ condition, error }) => {
  const { setCurrentValidXaiForm } = React.useContext(FormContext);

  const firstRender = React.useRef(true);
  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    }
  });

  if (!condition && !firstRender.current) {
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
  const { values } = useFormikContext();

  const condition = calculateExpression(replaceExpressionValue(cond, values));
  if (type === "validate") {
    return <ValidateCondition condition={condition} error={error} />;
  }

  return (
    <GroupCondition condition={condition} {...rest}>
      {children}
    </GroupCondition>
  );
};

export default ConditionField;
