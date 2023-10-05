import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";
import Label from "./Label";
import { validate, setCustomErrors } from "../utils/FieldsValidation";
import { getDeepValue } from "../../utils/Helper";

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

  const value = getDeepValue(name, values);

  const carType =
    value &&
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
          return validate(name, meta.erroredInputs.cardNumber);
        }}
      >
        {({ field }) => (
          <>
            <div className="creditCardNumber">
              <svg {...getCardImageProps({ images })} />
              <input
                className={className || null}
                {...field}
                {...getCardNumberProps({
                  id: id,
                  placeholder: placeholder,
                  name: name,
                  onBlur: field.onBlur,
                  onChange: field.onChange,
                })}
                {...(rest["placeholder-color"] && !field.value
                  ? {
                      style: { color: rest["placeholder-color"] },
                    }
                  : "")}
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
