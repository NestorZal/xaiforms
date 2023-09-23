import React from "react";
import parse from "html-react-parser";
import replace from "./utils/ReplaceComponents";
import TemplateContextProvider from "./providers/TemplateContextProvider";

const renderTabs = (tabs, initialTab) => {
  if (tabs.length === 0) {
    return { activeTab: null, setCurrentTab: null };
  }

  const initialActiveTab = initialTab || tabs[0];
  const [activeTab, setActiveTab] = React.useState(initialActiveTab);

  const setCurrentTab = React.useCallback(
    (tab) => {
      setActiveTab(tab);
    },
    [activeTab],
  );

  return { activeTab: activeTab, setCurrentTab: setCurrentTab };
};

const Template = (props) => {
  const { children, options } = props;
  const { tabs, initialTab, forms } = options;
  const { activeTab, setCurrentTab } = renderTabs(tabs, initialTab);

  return (
    <TemplateContextProvider
      tabs={tabs}
      activeTab={activeTab}
      setCurrentTab={setCurrentTab}
      forms={forms}
    >
      {children}
    </TemplateContextProvider>
  );
};

const render = (props) => {
  const { html } = props;

  const htmlParsed = parse(html);

  const { components, options } = replace(htmlParsed);
  console.log(components, options);

  return <Template options={options}>{components}</Template>;
};

const templates = document.querySelectorAll(".render-template");
if (typeof templates !== "undefined" && templates != null) {
  templates.forEach(function (item) {
    const html = item.innerHTML;
    wp.element.render(
      wp.element.createElement(render, {
        html: html,
      }),
      item,
    );
  });
}
