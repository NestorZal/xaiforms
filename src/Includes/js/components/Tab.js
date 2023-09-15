import React from "react";
import Tabs from "./Tabs";
import { XaiFormContext } from "./XaiFormContextProvider";

const Tab = (props) => {
  const { children, label, className } = props;
  const { tabs, activeTab, setCurrentTab } = React.useContext(XaiFormContext);

  if (activeTab !== label) {
    return null;
  }

  return (
    <div className="tabs">
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
