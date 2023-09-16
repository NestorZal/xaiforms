import React from "react";

export const TemplateContext = React.createContext(null);
const TemplateContextProvider = (props) => {
  const {
    children,
    metaData,
    fieldValues,
    tabs,
    activeTab,
    setCurrentTab,
    steps,
    step,
    setCurrentStep,
  } = props;

  const contextValues = React.useMemo(
    () => ({
      metaData: metaData,
      fieldValues: fieldValues,
      tabs: tabs,
      activeTab: activeTab,
      setCurrentTab: setCurrentTab,
      steps: steps,
      step: step,
      setCurrentStep: setCurrentStep,
    }),
    [activeTab, step],
  );

  return (
    <TemplateContext.Provider value={contextValues}>
      {children}
    </TemplateContext.Provider>
  );
};
export default TemplateContextProvider;
