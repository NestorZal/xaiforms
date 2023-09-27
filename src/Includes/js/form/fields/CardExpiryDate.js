import React from "react";
import { Field, ErrorMessage } from "formik";
import { usePaymentInputs } from "react-payment-inputs";
import Label from "./Label";
import { validate, setCustomErrors } from "../utils/FieldsValidation";

const ERROR_MESSAGES = {
  emptyExpiryDate: "required",
  monthOutOfRange: "invalid",
  yearOutOfRange: "invalid",
  dateOutOfRange: "invalid",
  invalidExpiryDate: "invalid",
};

const CardExpiryDate = (props) => {
  const { label, name, placeholder, className, id, ...rest } = props;

  const { meta, getExpiryDateProps } = usePaymentInputs({
    errorMessages: ERROR_MESSAGES,
  });

  setCustomErrors(name, rest, "expiryDate");

  return (
    <div className={rest["wrapper-class"] ? rest["wrapper-class"] : null}>
      {label ? <Label text={label} domId={id || null} /> : ""}
      <Field
        name={name}
        validate={() => {
          return validate(name, meta.erroredInputs.expiryDate);
        }}
      >
        {({ field }) => (
          <>
            <input
              className={className || null}
              {...field}
              {...getExpiryDateProps({
                id: id,
                name: name,
                placeholder: placeholder,
                onBlur: field.onBlur,
                onChange: field.onChange,
              })}
            />
            <ErrorMessage name={name} component="div" className="error" />
          </>
        )}
      </Field>
    </div>
  );
};

CardExpiryDate.defaultProps = {
  name: "expiryDate",
  placeholder: "MM / YY",
};

export default CardExpiryDate;
