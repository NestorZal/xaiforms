import React from "react";
import { Field, ErrorMessage } from "formik";
import Label from "./Label";
import { validateEmail, setCustomErrors } from "../utils/FieldsValidation";

const EmailAddress = (props) => {
  const { label, name, placeholder, className, id, required, ...rest } = props;

  setCustomErrors(name, rest, "email");

  return (
    <div className={rest["wrapper-class"] ? rest["wrapper-class"] : null}>
      {label ? <Label text={label} domId={id || null} /> : ""}
      <Field
        name={name}
        validate={(value) => {
          return validateEmail(name, value, required);
        }}
      >
        {({ field }) => (
          <>
            <input
              id={id || null}
              type="email"
              className={className || null}
              placeholder={placeholder}
              {...field}
            />
            <ErrorMessage name={name} component="div" className="error" />
          </>
        )}
      </Field>
    </div>
  );
};

EmailAddress.defaultProps = {
  name: "emailAddress",
  placeholder: "Email address",
};

export default EmailAddress;
