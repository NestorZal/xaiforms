import images from "react-payment-inputs/images";
import { c as _objectSpread } from "react-payment-inputs/es/chunk-7eee66c0";

export const getStatus = ({ errors, touched }, fieldName) => {
  if (errors[fieldName] && touched[fieldName]) {
    return { type: "error", message: errors[fieldName] };
  }
  return { type: "neutral", message: "" };
};

export const getCardImage = () => {
  const cardType = document.getElementById("card-type");

  if (cardType) {
    return _objectSpread(
      {
        "aria-label": cardType.value,
        children: images[cardType.value],
        width: "1.5em",
        height: "1em",
        viewBox: "0 0 24 16",
      },
      {},
    );
  }

  return null;
};
