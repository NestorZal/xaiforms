import React from "react";

let stepData;
export const setStepData = (step, setCurrentStep, steps) => {
  stepData = {
    step: step,
    setCurrentStep: setCurrentStep,
    steps: steps,
  };
};
export const getStepData = () => {
  return stepData;
};

const Step = (props) => {
  const { name, className, children } = props;

  if (stepData.step !== name) {
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
