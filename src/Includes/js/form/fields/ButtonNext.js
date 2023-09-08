import { useFormikContext } from "formik";
import Button from "./Button";
import { getStepData } from "../../components/Step";

const ButtonNext = (props) => {
  const { children, className } = props;

  const stepData = getStepData();

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
        if (stepData) {
          const index = stepData.steps.indexOf(stepData.step);
          const nextStep = stepData.steps[index + 1]
            ? stepData.steps[index + 1]
            : null;
          stepData.setCurrentStep(nextStep);
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
