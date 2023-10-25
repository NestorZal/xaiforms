export const clearNumber = (number) => {
  if (typeof number === "number") {
    return number;
  }
  return Number(
    number
      .toString()
      .replace(/[^0-9-]/g, "")
      .replace("-", ""),
  );
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
  const emptyValue = format === "international" ? "+1 " : "";
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

  const { length } = stringNumber;

  let formattedNumber = format === "international" ? "+1 (" : "(";
  for (let i = 0; i < 10; i += 1) {
    if (i > length - 1) {
      break;
    }

    let digit = "";
    if (i < length) {
      digit = stringNumber[i];
    }

    if (i === 3) {
      formattedNumber += " ";
    }

    if (i === 6) {
      formattedNumber += " ";
    }

    formattedNumber += digit;

    if (i === 2) {
      formattedNumber += ")";
    }
  }

  return formattedNumber;
};

export const getMaskedValue = (value, prevValue, type, format) => {
  switch (type) {
    case "number":
    case "price":
    case "currency":
      return clearNumber(value);
    case "phone": {
      let number = clearNumber(value);
      const { length } = value.toString();

      if (!number) {
        return "";
      }

      if (format === "international" && number === 1) {
        return "";
      }

      const positionEndArea = format === "international" ? 7 : 4;
      if ( prevValue === number && length === positionEndArea) {
        number = number.toString().slice(0, -1);
      }

      return Number(number);
    }
    default:
      return value;
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
