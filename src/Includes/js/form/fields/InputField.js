import React from "react";
import { Field, ErrorMessage } from "formik";
import Label from "./Label";
import {validateField, setCustomErrors} from "../utils/FieldsValidation";
import HideShowInput from "../../components/HideShowInput";
import mask, { getMaskedValue } from "../utils/Mask";

const InputField = (props) => {
  const { label, name, type, id, required, expression, format, "wrapper-class" : wrapperClass, ...rest } =
    props;

  const errorType = type === "email" ? "email" : "field";
  setCustomErrors(name, rest, errorType);

  let inputType = type || "text";
  if (["number", "price", "currency", "phone"].includes(type)) {
    inputType = "tel";
  }

  return (
    <div className={wrapperClass || null}>
      {label ? <Label text={label} domId={id || null} /> : ""}
      <Field
        name={name}
        validate={(value) => {
          return validateField({name, value, required, expression, type});
        }}
      >
        {({ field, form: { setFieldValue } }) => (
          <>
            {type === "hide-show-input" ? (
              <HideShowInput id={id || null} type="text" {...rest} {...field} />
            ) : (
              <input
                id={id || null}
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
                {...(rest["placeholder-color"] && !field.value
                  ? {
                      style: { color: rest["placeholder-color"] },
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
