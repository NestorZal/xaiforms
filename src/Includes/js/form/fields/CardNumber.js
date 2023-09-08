import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";
import Label from "./Label";
import { validate, setCustomErrors } from "../utils/FieldsValidation";

const ERROR_MESSAGES = {
  emptyCardNumber: "required",
  invalidCardNumber: "invalid",
};

const CardNumber = (props) => {
  const { label, name, placeholder, className, id, ...rest } = props;

  const { values } = useFormikContext();

  const { meta, getCardImageProps, getCardNumberProps } = usePaymentInputs({
    errorMessages: ERROR_MESSAGES,
  });

  setCustomErrors(name, rest, "cardNumber");
  // console.dir(values);
  const carType =
    values[name] &&
    typeof meta.cardType !== "undefined" &&
    typeof meta.cardType.type !== "undefined"
      ? meta.cardType.type
      : "";

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
            <div className="creditCardNumber">
              <svg {...getCardImageProps({ images })} />
              <input
                id={id || null}
                className={className || null}
                placeholder={placeholder}
                {...field}
                {...getCardNumberProps({
                  onBlur: field.onBlur,
                  onChange: field.onChange,
                })}
              />
            </div>
            <ErrorMessage name={name} component="div" className="error" />
          </>
        )}
      </Field>
      <input id="card-type" type="hidden" value={carType} />
    </div>
  );
};

CardNumber.defaultProps = {
  name: "cardNumber",
  placeholder: "Credit card number",
};

export default CardNumber;
