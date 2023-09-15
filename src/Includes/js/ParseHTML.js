import React from "react";
import parse, { domToReact, attributesToProps } from "html-react-parser";
import { getSelectValue, getTagComponent } from "./ParseHelper";

const getParsedHTML = (html) => {
  const options = {
    metaData: {},
    fieldValues: {},
    tabs: [],
    initialTab: "",
    steps: [],
  };

  let indexStep = 0;

  const parseOptions = {
    replace: ({ name, attribs, children }) => {
      const props = attributesToProps(attribs);

      if (["input", "select", "textarea"].includes(name)) {
        if (props.name && props.type !== "submit") {
          options.fieldValues[props.name] = props.value ? props.value : "";
        }

        if (name === "select") {
          options.fieldValues[props.name] = getSelectValue(children);
        }
      }

      const Element = getTagComponent(name, props.type);
      if (!Element) {
        return null;
      }

      switch (name) {
        case "select":
          return <Element options={children} {...props} />;

        case "button": {
          const btnCopy = name === "input" ? props.value : children;
          return <Element {...props}>{btnCopy}</Element>;
        }

        case "step": {
          const { className } = props;

          indexStep += 1;
          const stepName = `step-${indexStep}`;

          options.steps.push(stepName);

          return (
            <Element name={stepName} className={className}>
              {domToReact(children, parseOptions)}
            </Element>
          );
        }

        case "tab": {
          const { className, label } = props;

          options.tabs.push(label);

          const active = className ? className.includes("active") : false;
          if (active) {
            options.initialTab = label;
          }

          return (
            <Element label={label} className={className}>
              {domToReact(children, parseOptions)}
            </Element>
          );
        }

        case "form": {
          const { method, action } = props;

          options.metaData = {
            method: method,
            endpoint: action,
          };

          return <Element>{domToReact(children, parseOptions)}</Element>;
        }

        default:
          return <Element {...props} />;
      }
    },
  };

  return {
    htmlParsed: parse(html, parseOptions),
    options: options,
  };
};
export default getParsedHTML;
