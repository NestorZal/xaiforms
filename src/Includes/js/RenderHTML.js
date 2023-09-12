import React from "react";
import parse from "html-react-parser";
import { setFormData } from "./form/XaiForm";
import { setTabData } from "./components/Tab";
import { setTabLabels } from "./components/Tabs";
import { setStepData } from "./components/Step";
import {
  getParseOptions,
  getFormFields,
  getFormSteps,
  getFormMetaData,
  getTabs,
  getInitialTab,
} from "./ParseOptions";

import "../sass/default.scss";

const renderWithTabs = (htmlParsed, initialActiveTab) => {
  const [activeTab, setActiveTab] = React.useState(initialActiveTab);

  const setCurrentTab = React.useCallback(
    (tab) => {
      setActiveTab(tab);
    },
    [activeTab],
  );

  setTabData(activeTab, setCurrentTab);

  return htmlParsed;
};

const render = (props) => {
  const { html } = props;

  const options = getParseOptions();
  let htmlParsed = parse(html, options);

  const formValues = React.useRef(getFormFields());
  const steps = getFormSteps();
  const metaData = getFormMetaData();
  const tabs = getTabs();

  setFormData(metaData, formValues);
  setTabLabels(tabs);

  if (tabs.length > 0) {
    const initialActiveTab = getInitialTab();
    htmlParsed = renderWithTabs(htmlParsed, initialActiveTab);
  }

  const initialStep = steps ? steps[0] : "";
  const [step, setStep] = React.useState(initialStep);
  const setCurrentStep = React.useCallback(
    (currentStep) => {
      setStep(currentStep);
    },
    [step],
  );
  setStepData(step, setCurrentStep, steps);

  return htmlParsed;
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
