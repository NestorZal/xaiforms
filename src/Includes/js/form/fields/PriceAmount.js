import React from "react";
import { Field, ErrorMessage } from "formik";
import Label from "./Label";
import { clearInputNumber, maskValue } from "../utils/InputCurrencyMask";
import { validateField, setCustomErrors } from "../utils/FieldsValidation";
import { getDeepValue } from "../../utils/Helper";

const PriceAmount = (props) => {
  const { label, name, className, id, required, ...rest } = props;

  if (required) {
    setCustomErrors(name, rest);
  }

  const getMaskedValue = (nameField, values) => {
    const value = getDeepValue(nameField, values);
    if (!value) {
      return "$ ";
    }
    return maskValue(value);
  };

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
              value={getMaskedValue(name, values)}
              onChange={(e) => {
                const formattedNumber = clearInputNumber(e.target.value);
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

PriceAmount.defaultProps = {
  name: "priceAmount",
};

export default PriceAmount;
