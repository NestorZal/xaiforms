import React from "react";
import { Field, ErrorMessage } from "formik";
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
    "wrapper-class": wrapperClass,
    "placeholder-color": placeholderColor,
    ...rest
  } = props;

  if (required) {
    setCustomErrors(name, rest);
  }

  return (
    <div className={wrapperClass}>
      {label ? <label htmlFor={id}>{label}</label> : ""}
      <Field
        name={name}
        {...(required
          ? {
              validate: (value) => {
                return validateField({ name, value });
              },
            }
          : "")}
      >
        {({ field }) => (
          <select
            id={id || null}
            className={className || null}
            {...field}
            {...(placeholderColor && !field.value
              ? {
                  style: { color: placeholderColor },
                }
              : "")}
          >
            <option value="" disabled>
              {placeholder || "Select an option"}
            </option>
            <Options name={name}>{children}</Options>
          </select>
        )}
      </Field>
      <ErrorMessage name={name} component="div" className="error" />
    </div>
  );
};

export default Select;
