import React from "react";
import { Field, ErrorMessage } from "formik";
import Label from "./Label";
import { validateField, setCustomErrors } from "../utils/FieldsValidation";

const Options = (props) => {
  const { children: options } = props;

  return options.map((option, index) => {
    if (React.isValidElement(option)) {
      const { children, value, label } = option.props;
      const uniqueKey = value ? `${value}-${index}` : `${option.type}-${index}`;

      if (option.type === "optgroup") {
        return (
          <optgroup key={uniqueKey} label={label}>
            <Options>{children}</Options>
          </optgroup>
        );
      }

      return (
        <option key={uniqueKey} value={value}>
          {children}
        </option>
      );
    }

    return null;
  });
};

const Select = (props) => {
  const {
    children,
    label,
    name,
    className,
    type,
    placeholder,
    id,
    required,
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
        <Options name={name}>{children}</Options>
      </Field>
      <ErrorMessage name={name} component="div" className="error" />
    </div>
  );
};

export default Select;
