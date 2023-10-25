import React from "react";
import { useFormikContext } from "formik";
import { FormContext } from "../../providers/FormContextProvider";

const Button = (props) => {
  const {
    children,
    className,
    type,
    "onclick-callback": callback,
    ...rest
  } = props;
  const { steps, step, setCurrentStep, isValidXaiForm } =
    React.useContext(FormContext);

  const { isValid, dirty } = useFormikContext();
  let isValidForm = false;
  if (isValid && dirty && isValidXaiForm) {
    isValidForm = true;
  }

  const typeButton = type === "submit" ? "submit" : "button";

  const handleOnClick = () => {
    if (steps) {
      const index = steps.indexOf(step);

      let newStep = null;
      if (type === "next") {
        if (!isValidForm) {
          return false;
        }

        newStep = steps[index + 1] ? steps[index + 1] : null;
      } else if (type === "back") {
        newStep = steps[index - 1] ? steps[index - 1] : null;
      }

      setCurrentStep(newStep);
      return true;
    }

    return false;
  };

  const ButtonComponent = "button";

  return (
    <ButtonComponent
      type={typeButton}
      className={className}
      {...(typeButton === "button"
        ? {
            onClick: () => {
              if (type === "next" || type === "back") {
                handleOnClick();
              } else if (callback) {
                window[callback]();
              } else {
                return false;
              }
              return true;
            },
          }
        : "")}
      {...rest}
      {...(type === "next" && !isValidForm ? { disabled: "disabled" } : "")}
    >
      {children}
    </ButtonComponent>
  );
};

export default Button;
