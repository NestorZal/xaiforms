import React from "react";
import Button from "./Button";
import { XaiFormContext } from "../../XaiFormContextProvider";

const ButtonBack = (props) => {
  const { children, className } = props;
  const { steps, step, setCurrentStep } = React.useContext(XaiFormContext);

  return (
    <Button
      className={className}
      onClick={() => {
        if (steps) {
          const index = steps.indexOf(step);
          const backStep = steps[index - 1] ? steps[index - 1] : null;
          setCurrentStep(backStep);
          return true;
        }
        return false;
      }}
    >
      {children}
    </Button>
  );
};

ButtonBack.defaultProps = {
  className: null,
};

export default ButtonBack;
