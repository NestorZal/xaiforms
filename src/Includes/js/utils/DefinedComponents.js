import XaiForm from "../form/XaiForm";
import Step from "../components/Step";
import Tab from "../components/Tab";
import FormResponse from "../components/FormResponse";
import ResponseValue from "../components/ResponseValue";
import {
  Card,
  InputField,
  Button,
  Select,
  Field,
  ConditionField,
  Password,
} from "../form/fields";

export const definedFields = ["card", "input", "select", "textarea"];

const excludeTypes = ["hidden"];
const includeTypes = ["password"];

export const definedComponents = {
  input: InputField,
  card: Card,
  button: Button,
  select: Select,
  field: Field,
  form: XaiForm,
  tab: Tab,
  step: Step,
  formresponse: FormResponse,
  responsevalue: ResponseValue,
  condition: ConditionField,
  password: Password,
};

export const getTagComponent = (tag, type) => {
  if (excludeTypes.includes(type)) {
    return tag;
  }
  if (includeTypes.includes(type)) {
    return definedComponents[type];
  }
  return definedComponents[tag] ? definedComponents[tag] : tag;
};
