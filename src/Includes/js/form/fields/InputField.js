import React from "react";
import { Field, ErrorMessage } from "formik";
import Label from "./Label";
import { validateField, setCustomErrors } from "../utils/FieldsValidation";
import HideShowInput from "../../components/HideShowInput";

const InputField = (props) => {
  const { label, name, type, id, required, ...rest } = props;

  if (required) {
    setCustomErrors(name, rest);
  }

  return (
    <div className={rest["wrapper-class"] ? rest["wrapper-class"] : null}>
      {label ? <Label text={label} domId={id || null} /> : ""}
      <Field
        name={name}
        {...(required
          ? {
              validate: (value) => {
                return validateField(name, value);
              },
            }
          : "")}
      >
        {({ field }) => (
          <>
            {type === "hide-show-input" ? (
              <HideShowInput id={id || null} type="text" {...rest} {...field} />
            ) : (
              <input
                id={id || null}
                type={type || "text"}
                {...rest}
                {...field}
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
