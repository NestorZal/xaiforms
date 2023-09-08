import React from "react";
import { Field, ErrorMessage } from "formik";
import Label from "./Label";
import { clearInputNumber, maskValue } from "../utils/InputCurrencyMask";
import { validateField, setCustomErrors } from "../utils/FieldsValidation";

const PriceAmount = (props) => {
  const { label, name, className, id, noValidate, ...rest } = props;

  let required = true;
  if (noValidate) {
    required = false;
  }

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
        {({ field, form: { setFieldValue, values } }) => (
          <>
            <input
              id={id || null}
              type="text"
              className={className || null}
              {...field}
              value={values[name] ? maskValue(values[name]) : "$ "}
              onChange={(e) => {
                const formattedNumber = clearInputNumber(e.target.value);
                setFieldValue(name, formattedNumber);
              }}
            />
            <ErrorMessage name={name} component="div" className="error" />
          </>
        )}
      </Field>
    </div>
  );
};

PriceAmount.defaultProps = {
  name: "priceAmount",
};

export default PriceAmount;
