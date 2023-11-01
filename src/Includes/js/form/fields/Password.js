import React from "react";
import { Field } from "formik";
import { Icon, seen, unseen } from "@wordpress/icons";

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
  if (splitErrors.length > 0) {
    return (
      <div className="error">
        {splitErrors.map((el, index) => {
          const uniqueKey = `error-${index}`;
          return <span key={uniqueKey}>{el}</span>;
        })}
      </div>
    );
  }
  return null;
};

const ShowHideBtn = ({ currentType, setCurrentType, iconColor }) => {
  return (
    <button
      type="button"
      onClick={() => {
        if (currentType === "password") {
          setCurrentType("text");
        } else {
          setCurrentType("password");
        }
      }}
    >
      <Icon icon={currentType === "text" ? seen : unseen} fill={iconColor} />
    </button>
  );
};

const Password = (props) => {
  const {
    id,
    label,
    name,
    type,
    format,
    required,
    minLength,
    contains,
    "show-errors": showErrors,
    "wrapper-class": wrapperClass,
    "icon-color": iconColor,
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
    const showAll = showErrors === "all";

    if (minLength && minLength > value.length) {
      if (showAll) {
        error += `${errors.minlength.replace("%n", minLength)}<br>`;
      } else {
        return errors.minlength.replace("%n", minLength);
      }
    }

    if (contains) {
      const all = !!contains.includes("all");
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
    }

    return error || null;
  };

  const fieldType = format === "text" ? "text" : "password";
  const [currentType, setType] = React.useState(fieldType);
  const setCurrentType = React.useCallback(
    (newType) => {
      setType(newType);
    },
    [currentType],
  );

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
            <div className="field-password">
              <input
                id={id}
                type={currentType}
                {...rest}
                {...field}
                {...(placeholderColor && !field.value
                  ? {
                      style: { color: placeholderColor },
                    }
                  : "")}
              />
              {fieldType === "password" ? (
                <ShowHideBtn
                  iconColor={iconColor}
                  currentType={currentType}
                  setCurrentType={setCurrentType}
                />
              ) : (
                ""
              )}
            </div>
            {meta.touched && meta.error && <MessageError error={meta.error} />}
          </>
        )}
      </Field>
    </div>
  );
};

export default Password;
