import React from "react";
import { FormContext } from "../providers/FormContextProvider";

const Step = (props) => {
  const { name, className, children } = props;
  const { step } = React.useContext(FormContext);

  if (step !== name) {
    return null;
  }

  return (
    <div id={name} className={`step ${className || ""}`}>
      {children}
    </div>
  );
};

Step.defaultProps = {
  className: null,
};

export default Step;
