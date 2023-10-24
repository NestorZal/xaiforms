export const clearNumber = (number) => {
  if (typeof number === "number") {
    return number;
  }
  return Number(number.toString().replace(/[^0-9-]/g, ""));
};

export const maskNumber = (number) => {
  return clearNumber(number);
};

export const maskCurrency = (value) => {
  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "symbol",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  let processValue = clearNumber(value);
  processValue = Number(processValue);
  if (processValue === 0) {
    return "$ ";
  }

  let currencyValue = currency.format(processValue);
  currencyValue = currencyValue.replace("$", "$ ");
  return currencyValue;
};

const maskPhone = (value, format) => {
  const emptyValue =
    format === "international" ? "+1 (___) ___ ____" : "(___) ___ ____";
  if (!value) {
    return emptyValue;
  }

  let stringNumber = clearNumber(value).toString();
  if (format === "international") {
    stringNumber = stringNumber.slice(1);
  }

  if (!stringNumber) {
    return emptyValue;
  }

  const length = stringNumber.length;

  let formattedNumber = format === "international" ? "+1 (" : "(";
  for (let i = 0; i < 10; i += 1) {
    let digit = "_";

    if (i < length) {
      digit = stringNumber[i];
    }

    formattedNumber += digit;

    if (i === 2) {
      formattedNumber += ") ";
    }
    if (i === 5) {
      formattedNumber += " ";
    }
  }

  return formattedNumber;
};

export const getMaskedValue = (value, type, format) => {
  switch (type) {
    case "number":
    case "price":
    case "currency":
      return clearNumber(value);
    case "phone": {
      const number = clearNumber(value);
      if (!number) {
        return "";
      }

      if (format === "international" && number === 1) {
        return "";
      }

      return number;
    }
    default:
      return value;
  }
};

export const setMaskPositionIfNeeded = (e, type, format) => {
  if (type === "phone") {
    const value = e.target.value;
    const number = clearNumber(value);

    let position = 1;
    if (format === "international") {
      position += 2;
    }

    if (number > 0) {
      const length = number.toString().length;
      position += length;

      if (length >= 3) {
        position += 2;
      }

      if (length >= 6) {
        position += 1;
      }
    }

    console.log(position, length, number, value, e.currentTarget);
    e.target.setSelectionRange(position, position);
  }
};

const mask = (value, type, format) => {
  switch (type) {
    case "number":
      return maskNumber(value);
    case "price":
    case "currency":
      return maskCurrency(value);
    case "phone":
      return maskPhone(value, format);
    default:
      return value;
  }
};

export default mask;
