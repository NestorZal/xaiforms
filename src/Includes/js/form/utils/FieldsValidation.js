import calculateExpression from "../../utils/math/Expressions";

const errors = {};

const defaultErrors = {
  email: {
    required: "Email is required",
    invalid: "Incorrect email format",
  },
  field: {
    required: "Field is required",
  },
  number: {
    required: "Please write your credit card number",
    invalid: "Please enter a valid credit card number",
  },
  cvc: {
    required: "Please write the CVC number",
    invalid: "CVC number must have 3 digits long at least",
  },
  expiry: {
    required: "Please insert an expiry date",
    invalid: "Please insert a valid expiry date",
  },
};

export const setCustomErrors = (name, props, type) => {
  const customErrors = {};

  let fieldType = type;
  if (!fieldType) {
    fieldType = "field";
  }

  if (props["error-msg-required"]) {
    customErrors.required = props["error-msg-required"];
  }

  if (props["error-msg-invalid"]) {
    customErrors.invalid = props["error-msg-invalid"];
  }

  if (props["error-msg-condition"]) {
    customErrors.condition = props["error-msg-condition"];
  }

  if (Object.keys(customErrors).length > 0) {
    errors[name] = { ...defaultErrors[fieldType], ...customErrors };
  } else {
    errors[name] = defaultErrors[fieldType];
  }
};

export const validateField = (field) => {
  const { name, value, required, condition, type } = field;

  const error = errors[name];

  if (required && !value) {
    return error.required;
  }

  if (type === "email" && value) {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return error.invalid;
    }
  }

  if (condition && !calculateExpression(condition, value)) {
    return error.condition;
  }

  return null;
};

export const validateCard = (name, errorType) => {
  let errorMessage;

  const error = errors[name];
  if (error) {
    errorMessage = error[errorType];
  }

  return errorMessage;
};
