import React from "react";
import { Field, ErrorMessage } from "formik";
import { validateField, setCustomErrors } from "../utils/FieldsValidation";
import HideShowInput from "../../components/HideShowInput";
import mask, { getMaskedValue } from "../utils/Mask";

const InputField = (props) => {
  const {
    label,
    name,
    type,
    id,
    required,
    expression,
    format,
    "wrapper-class": wrapperClass,
    "placeholder-color": placeholderColor,
    ...rest
  } = props;

  const errorType = type === "email" ? "email" : "field";
  setCustomErrors(name, rest, errorType);

  let inputType = type || "text";
  if (["number", "price", "currency", "phone"].includes(type)) {
    inputType = "tel";
  }

  return (
    <div className={wrapperClass}>
      {label ? <label htmlFor={id}>{label}</label> : ""}
      <Field
        name={name}
        validate={(value) => {
          return validateField({ name, value, required, expression, type });
        }}
      >
        {({ field, form: { setFieldValue } }) => (
          <>
            {type === "hide-show-input" ? (
              <HideShowInput id={id} type="text" {...rest} {...field} />
            ) : (
              <input
                id={id}
                type={inputType}
                {...rest}
                {...field}
                value={mask(field.value, type, format)}
                onChange={(e) => {
                  setFieldValue(
                    name,
                    getMaskedValue(e.target.value, field.value, type, format),
                  );
                }}
                {...(placeholderColor && !field.value
                  ? {
                      style: { color: placeholderColor },
                    }
                  : "")}
              />
            )}
            <ErrorMessage name={name} component="div" className="error" />
          </>
        )}
      </Field>
    </div>
  );
};

export default InputField;
