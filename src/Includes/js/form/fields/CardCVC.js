import React from "react";
import { Field, ErrorMessage } from "formik";
import { usePaymentInputs } from "react-payment-inputs";
import Label from "./Label";
import { validate, setCustomErrors } from "../utils/FieldsValidation";

const ERROR_MESSAGES = {
  emptyCVC: "required",
  invalidCVC: "invalid",
};

const CardCVC = (props) => {
  const { label, name, placeholder, className, id, ...rest } = props;

  const { meta, getCVCProps } = usePaymentInputs({
    errorMessages: ERROR_MESSAGES,
  });

  setCustomErrors(name, rest, "cvc");

  return (
    <div className={rest["wrapper-class"] ? rest["wrapper-class"] : null}>
      {label ? <Label text={label} domId={id || null} /> : ""}
      <Field
        name={name}
        validate={() => {
          return validate(name, meta.erroredInputs[name]);
        }}
      >
        {({ field }) => (
          <>
            <input
              id={id || null}
              className={className || null}
              placeholder={placeholder}
              {...field}
              {...getCVCProps({
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

CardCVC.defaultProps = {
  name: "cvc",
  placeholder: "CVC code",
};

export default CardCVC;
