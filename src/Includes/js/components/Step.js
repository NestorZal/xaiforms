import React from "react";
import Steps from "./Steps";
import { FormContext } from "../providers/FormContextProvider";

const Step = (props) => {
  const { children, name, className, label } = props;
  const { step, stepLabels } = React.useContext(FormContext);

  if (step !== name) {
    return null;
  }

  return (
    <div className="step-wrapper">
      <Steps stepLabels={stepLabels} activeStep={label} />
      <div id={name} className={`step ${className || ""}`}>
        {children}
      </div>
    </div>
  );
};

Step.defaultProps = {
  className: null,
};

export default Step;
