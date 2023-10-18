import XaiForm from "../form/XaiForm";
import Step from "../components/Step";
import Tab from "../components/Tab";
import FormResponse from "../components/FormResponse";
import ResponseValue from "../components/ResponseValue";
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
  NumberField,
  ExpressionField,
  ValidateField,
  ConditionField,
  GroupConditionField,
} from "../form/fields";

export const definedFields = [
  "email",
  "cardnumber",
  "cvc",
  "expirydate",
  "price",
  "input",
  "select",
  "textarea",
];

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
  "hidden",
  "number",
];

export const definedComponents = {
  input: InputField,
  number: NumberField,
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
  formresponse: FormResponse,
  responsevalue: ResponseValue,
  expressionfield: ExpressionField,
  validate: ValidateField,
  condition: ConditionField,
  groupcondition: GroupConditionField,
};

export const getTagComponent = (tag, type) => {
  const name = type && definedTypes.includes(type) ? type : tag;
  return definedComponents[name] ? definedComponents[name] : tag;
};
