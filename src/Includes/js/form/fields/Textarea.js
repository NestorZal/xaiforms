import React from "react";
import { Field, ErrorMessage } from "formik";
import { validateField, setCustomErrors } from "../utils/FieldsValidation";

const Textarea = (props) => {
  const {
    label,
    name,
    id,
    required,
    condition,
    "wrapper-class": wrapperClass,
    "placeholder-color": placeholderColor,
    ...rest
  } = props;

  setCustomErrors(name, rest);

  return (
    <div className={wrapperClass}>
      {label ? <label htmlFor={id}>{label}</label> : ""}
      <Field
        name={name}
        validate={(value) => {
          return validateField({ name, value, required, condition });
        }}
      >
        {({ field }) => (
          <>
            <textarea
              id={id}
              {...field}
              {...rest}
              {...(placeholderColor && !field.value
                ? {
                    style: { color: placeholderColor },
                  }
                : "")}
            />
            <ErrorMessage name={name} component="div" className="error" />
          </>
        )}
      </Field>
    </div>
  );
};

export default Textarea;
