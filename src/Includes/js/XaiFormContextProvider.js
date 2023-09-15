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

  return (
    <XaiFormContext.Provider
      value={{
        metaData,
        fieldValues,
        tabs,
        activeTab,
        setCurrentTab,
        steps,
        step,
        setCurrentStep,
      }}
    >
      {children}
    </XaiFormContext.Provider>
  );
};
export default XaiFormContextProvider;
