import Button from "./Button";
import { getStepData } from "../../components/Step";

const ButtonBack = (props) => {
  const { children, className } = props;

  const stepData = getStepData();

  return (
    <Button
      className={className}
      onClick={() => {
        if (stepData) {
          const index = stepData.steps.indexOf(stepData.step);
          const backStep = stepData.steps[index - 1]
            ? stepData.steps[index - 1]
            : null;
          stepData.setCurrentStep(backStep);
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
