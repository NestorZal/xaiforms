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
  cardNumber: {
    required: "Please write your credit card number",
    invalid: "Please enter a valid credit card number",
  },
  cvc: {
    required: "Please write the CVC number",
    invalid: "CVC number must have 3 digits long at least",
  },
  expiryDate: {
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

  if (props["error-msg-expression"]) {
    customErrors.expression = props["error-msg-expression"];
  }

  if (Object.keys(customErrors).length > 0) {
    errors[name] = { ...defaultErrors[fieldType], ...customErrors };
  } else {
    errors[name] = defaultErrors[fieldType];
  }
};

export const validateEmail = (name, value, required) => {
  let errorMessage;

  const error = errors[name];

  if (!value) {
    errorMessage = required ? error.required : null;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    errorMessage = error.invalid;
  }

  return errorMessage;
};

export const validateField = (name, value) => {
  let errorMessage;
  const error = errors[name];

  if (!value) {
    errorMessage = error.required;
  }

  return errorMessage;
};

export const validateFieldNumber = (name, value, required, expression) => {
  const error = errors[name];

  if (required && !value) {
    return error.required;
  }

  if (!calculateExpression(expression, value)) {
    return error.expression;
  }

  return null;
};

export const validate = (name, type) => {
  let errorMessage;
  const error = errors[name];

  if (error) {
    errorMessage = type ? error[type] : null;
  }

  return errorMessage;
};
