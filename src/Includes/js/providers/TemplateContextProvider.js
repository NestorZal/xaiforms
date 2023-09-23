import React from "react";

export const TemplateContext = React.createContext(null);
const TemplateContextProvider = (props) => {
  const { children, tabs, activeTab, setCurrentTab, forms } = props;

  const contextValues = React.useMemo(
    () => ({
      tabs: tabs,
      activeTab: activeTab,
      setCurrentTab: setCurrentTab,
      forms: forms,
    }),
    [activeTab],
  );

  return (
    <TemplateContext.Provider value={contextValues}>
      {children}
    </TemplateContext.Provider>
  );
};
export default TemplateContextProvider;
