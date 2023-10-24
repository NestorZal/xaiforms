import React from "react";
import { Field, ErrorMessage } from "formik";
import Label from "./Label";
import { validateField, setCustomErrors } from "../utils/FieldsValidation";
import HideShowInput from "../../components/HideShowInput";
import mask, { setMaskPositionIfNeeded, getMaskedValue } from "../utils/Mask";

const InputField = (props) => {
  const { label, name, type, id, required, expression, format, ...rest } =
    props;

  const requireValidation = !!(expression || required);
  if (requireValidation) {
    setCustomErrors(name, rest);
  }

  if (required) {
    setCustomErrors(name, rest);
  }

  let inputType = type || "text";
  if (["number", "price", "currency", "phone"].includes(type)) {
    inputType = "tel";
  }

  return (
    <div className={rest["wrapper-class"] ? rest["wrapper-class"] : null}>
      {label ? <Label text={label} domId={id || null} /> : ""}
      <Field
        name={name}
        {...(requireValidation
          ? {
              validate: (value) => {
                return validateField(name, value, required, expression);
              },
            }
          : "")}
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
                    getMaskedValue(e.target.value, type, format),
                  );
                }}
                onFocus={(e) => {
                  setMaskPositionIfNeeded(e, type, format);
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
