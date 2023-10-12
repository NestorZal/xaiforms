import React from "react";
import { Field, ErrorMessage } from "formik";
import Label from "./Label";
import {
  validateFieldNumber,
  setCustomErrors,
} from "../utils/FieldsValidation";
import maskNumber from "../utils/Mask";

const NumberField = (props) => {
  const { label, name, type, id, required, ...rest } = props;

  const exp = rest["validate-expression"] ? rest["validate-expression"] : null;
  const requireValidation = !!(exp || required);

  if (requireValidation) {
    setCustomErrors(name, rest);
  }

  const getMaskedValue = (value) => {
    if (!value) {
      return "0";
    }
    return value;
  };

  return (
    <div className={rest["wrapper-class"] ? rest["wrapper-class"] : null}>
      {label ? <Label text={label} domId={id || null} /> : ""}
      <Field
        name={name}
        {...(requireValidation
          ? {
              validate: (value) => {
                return validateFieldNumber(name, value, required, exp);
              },
            }
          : "")}
      >
        {({ field, form: { setFieldValue } }) => (
          <>
            <input
              id={id || null}
              type="tel"
              {...rest}
              {...field}
              value={getMaskedValue(field.value)}
              onChange={(e) => {
                const formattedNumber = maskNumber(e.target.value);
                setFieldValue(name, formattedNumber);
              }}
              {...(rest["placeholder-color"] && !field.value
                ? {
                    style: { color: rest["placeholder-color"] },
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

export default NumberField;
