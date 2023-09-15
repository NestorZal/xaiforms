import React from "react";
import { useFormikContext } from "formik";
import Button from "./Button";
import { XaiFormContext } from "../../components/XaiFormContextProvider";

const ButtonNext = (props) => {
  const { children, className } = props;
  const { steps, step, setCurrentStep } = React.useContext(XaiFormContext);
  const { isValid, dirty } = useFormikContext();

  let isValidForm = false;
  if (isValid && dirty) {
    isValidForm = true;
  }

  return (
    <Button
      className={className}
      onClick={() => {
        if (!isValidForm) {
          return false;
        }
        if (steps) {
          const index = steps.indexOf(step);
          const nextStep = steps[index + 1] ? steps[index + 1] : null;
          setCurrentStep(nextStep);
          return true;
        }
        return false;
      }}
      {...(!isValidForm ? { disabled: "disabled" } : "")}
    >
      {children}
    </Button>
  );
};

ButtonNext.defaultProps = {
  className: null,
};

export default ButtonNext;
