import React from "react";
import Tabs from "./Tabs";
import { TemplateContext } from "../providers/TemplateContextProvider";

const Tab = (props) => {
  const { children, label, className } = props;
  const { tabs, activeTab, setCurrentTab } = React.useContext(TemplateContext);

  if (activeTab !== label) {
    return null;
  }

  return (
    <div className="tabs-wrapper">
      <Tabs
        tabLabels={tabs}
        activeTab={activeTab}
        setCurrentTab={setCurrentTab}
      />
      <div className={`tab-content ${className || ""}`}>{children}</div>
    </div>
  );
};

export default Tab;
