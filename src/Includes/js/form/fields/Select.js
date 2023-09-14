import React from "react";
import { Field, ErrorMessage } from "formik";
import { attributesToProps } from "html-react-parser";
import Label from "./Label";
import { validateField, setCustomErrors } from "../utils/FieldsValidation";

const Options = (props) => {
  const { data } = props;

  return data.map((option, index) => {
    if (option.type === "text") {
      return null;
    }

    const { value } = attributesToProps(option.attribs);

    const uniqueKey = value ? `${value}-${index}` : `${option.name}-${index}`;

    if (option.name === "optgroup") {
      return (
        <optgroup key={uniqueKey} label={option.attribs.label}>
          <Options data={option.children} />
        </optgroup>
      );
    }

    if (option.name !== "option") {
      return null;
    }

    return (
      <option key={uniqueKey} value={option.attribs.value}>
        {option.children[0].data}
      </option>
    );
  });
};

const Select = (props) => {
  const {
    label,
    name,
    className,
    type,
    placeholder,
    id,
    required,
    options,
    ...rest
  } = props;

  if (required) {
    setCustomErrors(name, rest);
  }

  return (
    <div className={rest["wrapper-class"] ? rest["wrapper-class"] : null}>
      {label ? <Label text={label} domId={id || null} /> : ""}
      <Field
        id={id || null}
        className={className || null}
        name={name}
        as="select"
        {...(required
          ? {
              validate: (value) => {
                return validateField(name, value);
              },
            }
          : "")}
      >
        <option value="" disabled>
          {placeholder || "Select an option"}
        </option>
        <Options data={options} name={name} />
      </Field>
      <ErrorMessage name={name} component="div" className="error" />
    </div>
  );
};

export default Select;
