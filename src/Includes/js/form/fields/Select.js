import React from "react";
import { Field, ErrorMessage } from "formik";
import Label from "./Label";
import { validateField, setCustomErrors } from "../utils/FieldsValidation";

const Options = (props) => {
  const { data } = props;

  return data.map((option, index) => {
    const uniqueKey =
      option.attribs && option.attribs.value
        ? `${option.attribs.value}-${index}`
        : `${option.name}-${index}`;

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
        <Options data={options} />
      </Field>
      <ErrorMessage name={name} component="div" className="error" />
    </div>
  );
};

export default Select;
