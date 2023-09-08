import React from "react";
import { domToReact, attributesToProps } from "html-react-parser";
import { getTagComponent, cleanArrayObject } from "./ParseHelper";

const metaData = {};
let fieldValues;
let tabs;
let initialTab;
let steps;
let indexStep;

export const getParseOptions = () => {
  fieldValues = {};
  tabs = [];
  initialTab = "";
  steps = [];
  indexStep = 0;

  const parseOptions = {
    replace: ({ name, attribs, children }) => {
      const props = attributesToProps(attribs);

      if (["input", "select", "textarea"].includes(name)) {
        if (props.name) {
          fieldValues[props.name] = props.type === "hidden" ? props.value : "";
        }
      }

      const Element = getTagComponent(name, props.type);

      if (!Element) {
        return null;
      }

      switch (Element.name) {
        case "Select":
          return <Element options={children} {...props} />;

        case "Button":
        case "ButtonNext":
        case "ButtonBack": {
          const btnCopy =
            name === "input" ? props.value : cleanArrayObject(children);

          return <Element {...props}>{btnCopy}</Element>;
        }

        case "Step": {
          const { className } = props;

          indexStep += 1;
          const stepName = `step-${indexStep}`;
          steps.push(stepName);

          return (
            <Element name={stepName} className={className}>
              {domToReact(children, parseOptions)}
            </Element>
          );
        }

        case "Tab": {
          const { className, label } = props;
          tabs.push(label);

          let active = className ? className.includes("active") : false;
          if (!active) {
            active = tabs.length === 1;
          }

          if (active) {
            initialTab = label;
          }

          return (
            <Element label={label} className={className}>
              {domToReact(children, parseOptions)}
            </Element>
          );
        }

        case "XaiForm": {
          const { method, action } = props;

          metaData.method = method;
          metaData.endpoint = action;

          return <Element>{domToReact(children, parseOptions)}</Element>;
        }

        default:
          return <Element {...props} />;
      }
    },
  };

  return parseOptions;
};

export const getFormFields = () => {
  return fieldValues;
};

export const getFormSteps = () => {
  return steps;
};

export const getTabs = () => {
  return tabs;
};

export const getInitialTab = () => {
  return initialTab;
};

export const getFormMetaData = () => {
  return metaData;
};
