import { useFormikContext } from "formik";
import { getCardImage } from "../utils/FormHelper";
import { getDeepValue, replaceExpressionValue } from "../../utils/Helper";
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

const FieldElement = ({ value, type, className, tag, options }) => {
  if (value !== null) {
    const Tag = tag;
    const returnValue =
      type === "select" ? getOptionLabel(options, value) : mask(value, type);

    if (type === "cardnumber") {
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

const Field = (props) => {
  const { name, value, defaultValue, condition, truetxt, falsetxt, ...rest } =
    props;
  const { values } = useFormikContext();

  let val = null;
  if (value) {
    val = calculateExpression(replaceExpressionValue(value, values));
  } else if (name) {
    val = getDeepValue(name, values);
  }

  if (condition) {
    const cond = calculateExpression(replaceExpressionValue(condition, values));
    if (cond && truetxt) {
      val = val ? truetxt.replace("%s", val) : truetxt;
    } else if (falsetxt) {
      val = val ? falsetxt.replace("%s", val) : falsetxt;
    }
  }

  val = !val && defaultValue ? defaultValue : val;
  return <FieldElement value={val} {...rest} />;
};

export default Field;
