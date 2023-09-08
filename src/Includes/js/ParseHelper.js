import XaiForm from "./form/XaiForm";
import { Step, Tab } from "./components";
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

  return type ? components[type] : components[tag];
};
