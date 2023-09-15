import React from "react";
import parse from "html-react-parser";
import getParseOptions from "./ParseOptions";
import XaiFormContextProvider from "./XaiFormContextProvider";
import "../sass/default.scss";

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

const renderSteps = (steps) => {
  if (steps.length === 0) {
    return { step: null, setCurrentStep: null };
  }

  const initialStep = steps ? steps[0] : "";
  const [step, setStep] = React.useState(initialStep);
  const setCurrentStep = React.useCallback(
    (currentStep) => {
      setStep(currentStep);
    },
    [step],
  );

  return { step: step, setCurrentStep: setCurrentStep };
};

const render = (props) => {
  const { html } = props;
  const { metaData, fieldValues, tabs, initialTab, steps, parseOptions } =
    getParseOptions();
  const htmlParsed = parse(html, parseOptions);

  const { activeTab, setCurrentTab } = renderTabs(tabs, initialTab);
  const { step, setCurrentStep } = renderSteps(steps);

  return (
    <XaiFormContextProvider
      metaData={metaData}
      fieldValues={fieldValues}
      tabs={tabs}
      activeTab={activeTab}
      setCurrentTab={setCurrentTab}
      steps={steps}
      step={step}
      setCurrentStep={setCurrentStep}
    >
      {htmlParsed}
    </XaiFormContextProvider>
  );
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
