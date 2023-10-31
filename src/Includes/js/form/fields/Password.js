import React from "react";
import { Field } from "formik";

const errors = {
  required: "Field is required",
  minlength: "Must have at least %n character long",
  digit: "Must contain at least one digit",
  uppercase: "Must contain at least one uppercase character",
  lowercase: "Must contain at least one lowercase character",
  symbol: "Must contain at least one special symbol",
};

const MessageError = ({ error }) => {
  const splitErrors = error.split("<br>").filter((n) => n);
  return (
    <div className="error">
      {splitErrors.map((e) => (
        <span>{e}</span>
      ))}
    </div>
  );
};

const Password = (props) => {
  const {
    id,
    label,
    name,
    type,
    required,
    minLength,
    contains,
    "show-all-errors": showAllErrors,
    "wrapper-class": wrapperClass,
    "placeholder-color": placeholderColor,
    ...rest
  } = props;

  Object.keys(errors).forEach((key) => {
    if (rest[`error-msg-${key}`]) {
      errors[key] = rest[`error-msg-${key}`];
      delete rest[`error-msg-${key}`];
    }
  });

  const validatePassword = (value) => {
    if (required && !value) {
      return errors.required;
    }

    let error = "";
    const all = !!contains.includes("all");

    let showAll = true;
    if (showAllErrors === null || showAllErrors === undefined) {
      showAll = false;
    }

    if (minLength && minLength > value.length) {
      if (showAll) {
        error += `${errors.minlength.replace("%n", minLength)}<br>`;
      } else {
        return errors.minlength.replace("%n", minLength);
      }
    }

    const patterns = {
      uppercase: /[A-Z]/,
      digit: /\d/,
      symbol: /\W/,
      lowercase: /[a-z]/,
    };

    for (const key in patterns) {
      if (patterns[key]) {
        const pattern = patterns[key];

        if ((contains.includes(key) || all) && !pattern.test(value)) {
          if (showAll) {
            error += `${errors[key]}<br>`;
          } else {
            return errors[key];
          }
        }
      }
    }

    return error || null;
  };

  return (
    <div className={wrapperClass}>
      {label ? <label htmlFor={id}>{label}</label> : ""}
      <Field
        name={name}
        validate={(value) => {
          return validatePassword(value);
        }}
      >
        {({ field, meta }) => (
          <>
            <input
              id={id}
              type="text"
              {...rest}
              {...field}
              {...(placeholderColor && !field.value
                ? {
                    style: { color: placeholderColor },
                  }
                : "")}
            />
            {meta.touched && meta.error && <MessageError error={meta.error} />}
          </>
        )}
      </Field>
    </div>
  );
};

export default Password;
