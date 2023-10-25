import React from "react";
import { Field, ErrorMessage } from "formik";
import { usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";
import { setCustomErrors, validateCard } from "../utils/FieldsValidation";

const ERROR_MESSAGES = {
  emptyCardNumber: "required",
  invalidCardNumber: "invalid",
  emptyExpiryDate: "required",
  monthOutOfRange: "invalid",
  yearOutOfRange: "invalid",
  dateOutOfRange: "invalid",
  invalidExpiryDate: "invalid",
  emptyCVC: "required",
  invalidCVC: "invalid",
};

const FieldWrapper = ({ children, type }) => {
  if (type === "number") {
    return <div className="creditCardNumber">{children}</div>;
  }
  return children;
};

const Card = (props) => {
  const {
    label,
    name,
    placeholder,
    id,
    type,
    "wrapper-class": wrapperClass,
    "placeholder-color": placeholderColor,
    ...rest
  } = props;

  const {
    meta,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
  } = usePaymentInputs({
    errorMessages: ERROR_MESSAGES,
  });

  const defaults = {
    number: {
      name: "cardNumber",
      placeholder: "Card Number",
      fnProps: getCardNumberProps,
    },
    cvc: { name: "cvc", placeholder: "CVC code", fnProps: getCVCProps },
    expiry: {
      name: "expiryDate",
      placeholder: "MM / YY",
      fnProps: getExpiryDateProps,
    },
  };

  const fieldDefault = defaults[type];
  const fieldName = name || fieldDefault.name;

  setCustomErrors(fieldName, rest, type);

  return (
    <div className={wrapperClass}>
      {label ? <label htmlFor={id}>{label}</label> : ""}
      <Field
        name={fieldName}
        validate={() => {
          return validateCard(fieldName, meta.erroredInputs[fieldDefault.name]);
        }}
      >
        {({ field }) => (
          <>
            <FieldWrapper type={type}>
              {type === "number" ? (
                <svg {...getCardImageProps({ images })} />
              ) : (
                ""
              )}
              <input
                {...field}
                {...fieldDefault.fnProps({
                  id: id,
                  name: fieldName,
                  placeholder: placeholder || fieldDefault.placeholder,
                  onBlur: field.onBlur,
                  onChange: field.onChange,
                })}
                {...(placeholderColor && !field.value
                  ? {
                      style: { color: placeholderColor },
                    }
                  : "")}
                {...rest}
              />
            </FieldWrapper>
            <ErrorMessage name={fieldName} component="div" className="error" />
            {type === "number" ? (
              <input
                id="card-type"
                type="hidden"
                value={
                  field.value &&
                  typeof meta.cardType !== "undefined" &&
                  typeof meta.cardType.type !== "undefined"
                    ? meta.cardType.type
                    : ""
                }
              />
            ) : (
              ""
            )}
          </>
        )}
      </Field>
    </div>
  );
};

export default Card;
