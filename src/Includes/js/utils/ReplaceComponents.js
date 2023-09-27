import React from "react";
import { getTagComponent, definedFields } from "./DefinedComponents";
import FormResponse from "../components/FormResponse";
import { mergeNestedObjects, inputArrayToObject } from "./Helper";

const options = {
  forms: [],
  tabs: [],
  initialTab: "",
};

let replaceComponent;

const getFieldSelectValue = (selectOptions) => {
  if (Array.isArray(selectOptions)) {
    for (let i = 0; i < selectOptions.length; i += 1) {
      const option = selectOptions[i];

      if (React.isValidElement(option)) {
        const { value, selected } = option.props;

        if (selected) {
          return value;
        }
      }
    }
  }
  return "";
};

const setOptions = (component, formIndex) => {
  const { type: tag, props } = component;
  const {
    children,
    type,
    label,
    value,
    defaultValue,
    className,
    name,
    status,
  } = props;

  if (tag === "tab") {
    options.tabs.push(label);

    const active = className ? className.includes("active") : false;
    if (active) {
      options.initialTab = label;
    }
  }

  const currentForm = formIndex ? options.forms[formIndex] : null;

  if (definedFields.includes(tag) && currentForm) {
    if (name && type !== "submit") {
      const fieldValue = value || defaultValue;

      const { inputNameObject, inputObject } = inputArrayToObject(
        name,
        fieldValue,
      );

      if (inputObject) {
        const targetObj = currentForm.fieldValues[inputNameObject];
        currentForm.fieldValues[inputNameObject] = targetObj
          ? mergeNestedObjects(targetObj, inputObject)
          : inputObject;
      } else {
        currentForm.fieldValues[name] = fieldValue || "";
      }
    }

    if (tag === "select") {
      currentForm.fieldValues[name] = getFieldSelectValue(children);
    }
  }

  if (tag === "step" && currentForm) {
    currentForm.indexStep += 1;
    const stepName = `step-${currentForm.indexStep}`;

    currentForm.steps.push(stepName);
  }

  if (tag === "formresponse") {
    currentForm.formResponse[status] = (
      <FormResponse className={className}>
        {replaceComponent(children, formIndex)}
      </FormResponse>
    );
  }

  if (currentForm) {
    options.forms[formIndex] = currentForm;
  }
};

const getStepName = (formIndex) => {
  const currentForm = formIndex ? options.forms[formIndex] : null;
  if (!currentForm) {
    return "";
  }

  const { steps } = currentForm;
  return steps.length > 0 ? steps[steps.length - 1] : "";
};

replaceComponent = (component, formIndex) => {
  if (Array.isArray(component)) {
    return component.map((child, index) => {
      const uniqueKey = `component-${index}`;
      return (
        <React.Fragment key={uniqueKey}>
          {replaceComponent(child, formIndex)}
        </React.Fragment>
      );
    });
  }

  if (React.isValidElement(component)) {
    const { type, props } = component;
    const { children, ...rest } = props;

    let currentFormIndex = formIndex;

    if (type === "form") {
      const index = options.forms.length + 1;
      currentFormIndex = `form-${index}`;

      options.forms[currentFormIndex] = {
        fieldValues: {},
        steps: [],
        indexStep: 0,
        formResponse: {},
      };
    }

    setOptions(component, currentFormIndex);

    if (type === "formresponse") {
      return null;
    }

    const Element = getTagComponent(type, rest.type);

    if (type === "select") {
      return <Element {...rest}>{children}</Element>;
    }

    if (
      type === "input" &&
      (rest.type === "submit" || rest.type === "button")
    ) {
      return <Element {...rest}>{rest.value}</Element>;
    }

    if (children) {
      if (type === "step") {
        return (
          <Element name={getStepName(currentFormIndex)} {...rest}>
            {replaceComponent(children, currentFormIndex)}
          </Element>
        );
      }

      if (type === "form") {
        return (
          <Element index={currentFormIndex} {...rest}>
            {replaceComponent(children, currentFormIndex)}
          </Element>
        );
      }

      return (
        <Element {...rest}>
          {replaceComponent(children, currentFormIndex)}
        </Element>
      );
    }

    return <Element {...rest} />;
  }

  return component;
};

const replace = (reactComponents) => {
  return {
    components: replaceComponent(reactComponents),
    options: options,
  };
};

export default replace;
