import React from "react";

export const XaiFormContext = React.createContext(null);
const XaiFormContextProvider = (props) => {
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
    <XaiFormContext.Provider value={contextValues}>
      {children}
    </XaiFormContext.Provider>
  );
};
export default XaiFormContextProvider;
