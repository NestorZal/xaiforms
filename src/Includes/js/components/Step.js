import React from "react";
import { TemplateContext } from "./TemplateContextProvider";

const Step = (props) => {
  const { name, className, children } = props;
  const { step } = React.useContext(TemplateContext);

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
