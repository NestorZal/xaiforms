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

  const { validateForm } = useFormikContext();

  const typeButton = type === "submit" ? "submit" : "button";

  const handleOnClick = async () => {
    if (steps) {
      const index = steps.indexOf(step);

      let newStep = null;
      if (type === "next") {
        const errors = await validateForm();

        if (Object.keys(errors).length || !isValidXaiForm) {
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
    >
      {children}
    </ButtonComponent>
  );
};

export default Button;
