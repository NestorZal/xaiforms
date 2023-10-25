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
  FieldValue,
  ExpressionField,
  ValidateField,
  ConditionField,
  GroupConditionField,
} from "../form/fields";

export const definedFields = ["card", "input", "select", "textarea"];

const excludeTypes = ["hidden"];

export const definedComponents = {
  input: InputField,
  card: Card,
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
  if (excludeTypes.includes(type)) {
    return tag;
  }
  return definedComponents[tag] ? definedComponents[tag] : tag;
};
