import React from "react";
import { XaiFormContext } from "../XaiFormContextProvider";

const Step = (props) => {
  const { name, className, children } = props;
  const { step } = React.useContext(XaiFormContext);

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
