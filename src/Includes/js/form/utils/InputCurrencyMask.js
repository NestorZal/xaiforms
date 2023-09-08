export const clearInputNumber = (number) => {
  if (typeof number === "number") {
    return number;
  }
  return Number(number.toString().replace(/[^0-9-]/g, ""));
};

export const maskValue = (value) => {
  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "symbol",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  let processValue = clearInputNumber(value);
  processValue = Number(processValue);
  if (processValue === 0) {
    return "$ ";
  }

  let currencyValue = currency.format(processValue);
  currencyValue = currencyValue.replace("$", "$ ");
  return currencyValue;
};
