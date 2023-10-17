import { useFormikContext } from "formik";
import { maskValue } from "../utils/InputCurrencyMask";
import { getCardImage } from "../utils/FormHelper";
import { getDeepValue } from "../../utils/Helper";

const FieldValue = (props) => {
  const { name, className, format, value, tag } = props;
  const { values } = useFormikContext();

  const Tag = tag || "div";

  const val = value || getDeepValue(name, values);
  if (val) {
    switch (format) {
      case "price":
        return <div className={className}>{maskValue(val)}</div>;
      case "cardnumber":
        return (
          <Tag className={`cc-number-review ${className || ""}`}>
            <svg {...getCardImage()} />
            <span>{val}</span>
          </Tag>
        );
      case "select": {
        let { options } = props;
        options = options ? options.split(",") : null;

        let valueOption = val;

        if (options) {
          Object.values(options).forEach(function (option) {
            const opt = option.split(":");
            const optValue = opt[0] ? opt[0].trim() : "";
            const optLabel = opt[1] ? opt[1].trim() : "";

            if (optValue === val) {
              valueOption = optLabel;
            }
          });
        }

        return <Tag className={className}>{valueOption}</Tag>;
      }
      default:
        return <Tag className={className}>{val}</Tag>;
    }
  }

  return null;
};

FieldValue.defaultProps = {
  className: null,
};

export default FieldValue;
