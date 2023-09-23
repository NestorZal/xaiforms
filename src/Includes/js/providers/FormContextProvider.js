import React from "react";

export const FormContext = React.createContext(null);
const FormContextProvider = (props) => {
  const { children, steps, step, setCurrentStep } = props;

  const contextValues = React.useMemo(
    () => ({
      steps: steps,
      step: step,
      setCurrentStep: setCurrentStep,
    }),
    [step],
  );

  return (
    <FormContext.Provider value={contextValues}>
      {children}
    </FormContext.Provider>
  );
};
export default FormContextProvider;
