import { attributesToProps } from "html-react-parser";
import XaiForm from "./form/XaiForm";
import Step from "./components/Step";
import Tab from "./components/Tab";
import {
  InputField,
  EmailAddress,
  CardNumber,
  CardCVC,
  CardExpiryDate,
  PriceAmount,
  ButtonNext,
  ButtonBack,
  Button,
  Select,
  FieldValue,
} from "./form/fields";

export const cleanArrayObject = (array) => {
  const arrayObject = array.map((component) => {
    if (component.type === "text") {
      return component.data.trim();
    }
    return component;
  });

  return arrayObject.filter((value) => value !== "");
};

export const definedTypes = [
  "email",
  "cardnumber",
  "cvc",
  "expirydate",
  "price",
  "button",
  "submit",
  "next",
  "back",
];

export const getTagComponent = (tag, type) => {
  const components = {
    input: InputField,
    email: EmailAddress,
    cardnumber: CardNumber,
    cvc: CardCVC,
    expirydate: CardExpiryDate,
    price: PriceAmount,
    next: ButtonNext,
    back: ButtonBack,
    submit: Button,
    button: Button,
    select: Select,
    fieldvalue: FieldValue,
    form: XaiForm,
    tab: Tab,
    step: Step,
  };

  return type && definedTypes.includes(type)
    ? components[type]
    : components[tag];
};

export const getSelectValue = (options) => {
  if (Array.isArray(options)) {
    for (let i = 0; i < options.length; i += 1) {
      const option = options[i];

      if (option.type === "tag" && option.name === "option") {
        const { value, selected } = attributesToProps(option.attribs);

        if (selected) {
          return value;
        }
      }
    }
  }

  return "";
};
