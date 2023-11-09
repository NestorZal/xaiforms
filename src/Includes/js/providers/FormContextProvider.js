import React from "react";

export const FormContext = React.createContext(null);
const FormContextProvider = (props) => {
  const {
    children,
    steps,
    stepLabels,
    step,
    setCurrentStep,
    isValidXaiForm,
    setCurrentValidXaiForm,
    firstRender,
  } = props;

  const contextValues = React.useMemo(
    () => ({
      steps: steps,
      stepLabels: stepLabels,
      step: step,
      setCurrentStep: setCurrentStep,
      isValidXaiForm: isValidXaiForm,
      setCurrentValidXaiForm: setCurrentValidXaiForm,
      firstRender: firstRender,
    }),
    [step, isValidXaiForm, firstRender],
  );

  return (
    <FormContext.Provider value={contextValues}>
      {children}
    </FormContext.Provider>
  );
};
export default FormContextProvider;
