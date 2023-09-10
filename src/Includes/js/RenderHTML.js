import React from "react";
import parse from "html-react-parser";
import { setFormData } from "./form/XaiForm";
import { setTabData } from "./components/Tab";
import { setTabLabels } from "./components/Tabs";
import {
  getParseOptions,
  getFormFields,
  getFormSteps,
  getFormMetaData,
  getTabs,
  getInitialTab,
} from "./ParseOptions";

import "../sass/default.scss";
import { setStepData } from "./components/Step";

const renderTemplateForm = document.getElementById("render-template-form");

const templateFormHTML =
  renderTemplateForm != null ? renderTemplateForm.innerHTML : "";

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

const render = () => {
  const options = getParseOptions();
  // const initialValues = getFormFields();
  const formValues = React.useRef(getFormFields());
  const steps = getFormSteps();
  const metaData = getFormMetaData();
  const tabs = getTabs();

  setFormData(metaData, formValues);
  setTabLabels(tabs);

  let htmlParsed = parse(templateFormHTML, options);
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

if (typeof renderTemplateForm !== "undefined" && renderTemplateForm != null) {
  wp.element.render(wp.element.createElement(render), renderTemplateForm);
}
