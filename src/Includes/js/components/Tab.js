import React from "react";
import Tabs from "./Tabs";

let tabData;
export const setTabData = (activeTab, setCurrentTab) => {
  tabData = {
    activeTab: activeTab,
    setCurrentTab: setCurrentTab,
  };
};

const Tab = (props) => {
  const { children, label, className } = props;

  const { activeTab, setCurrentTab } = tabData;

  if (activeTab !== label) {
    return null;
  }

  return (
    <div className="tabs">
      <Tabs activeTab={activeTab} setCurrentTab={setCurrentTab} />
      <div className={`tab-content ${className || ""}`}>{children}</div>
    </div>
  );
};

export default Tab;
