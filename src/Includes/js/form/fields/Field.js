import { useFormikContext } from "formik";
import { getCardImage } from "../utils/FormHelper";
import { getDeepValue } from "../../utils/Helper";
import calculateExpression from "../../utils/math/Expressions";
import mask from "../utils/Mask";

const getOptionLabel = (options, value) => {
  const selectOptions = options ? options.split(",") : null;
  let optionLabel = value;

  if (selectOptions) {
    Object.values(selectOptions).forEach(function (option) {
      const opt = option.split(":");
      const optValue = opt[0] ? opt[0].trim() : "";
      const optLabel = opt[1] ? opt[1].trim() : "";

      if (optValue === value) {
        optionLabel = optLabel;
      }
    });
  }

  return optionLabel;
};

const FieldElement = ({ value, format, className, tag, options }) => {
  if (value) {
    const Tag = tag;
    const returnValue =
      format === "select"
        ? getOptionLabel(options, value)
        : mask(value, format);

    if (format === "cardnumber") {
      const Element = Tag || "div";
      return (
        <Element className={`cc-number-review ${className || ""}`}>
          <svg {...getCardImage()} />
          <span>{returnValue}</span>
        </Element>
      );
    }

    return Tag ? <Tag className={className}>{returnValue}</Tag> : returnValue;
  }

  return null;
};

const replaceValExp = (exp, values) => {
  let expression = exp;
  Object.keys(values).forEach((key) => {
    const field = `{${key}}`;
    if (expression.includes(field)) {
      expression = expression.replaceAll(field, values[key]);
    }
  });

  return expression;
};

const Field = (props) => {
  const { name, value, defaultValue, condition, truetxt, falsetxt } = props;
  const { values } = useFormikContext();

  let val = defaultValue;
  if (value) {
    val = calculateExpression(replaceValExp(value, values));
  } else if (name) {
    val = getDeepValue(name, values);
  }

  if (!condition) {
    return <FieldElement value={val} {...props} />;
  }

  const cond = condition
    ? calculateExpression(replaceValExp(condition, values))
    : false;
  if (cond && truetxt) {
    return (
      <FieldElement
        value={val ? truetxt.replace("%s", value) : truetxt}
        {...props}
      />
    );
  }
  if (falsetxt) {
    return (
      <FieldElement
        value={val ? falsetxt.replace("%s", value) : falsetxt}
        {...props}
      />
    );
  }

  return null;
};

export default Field;
