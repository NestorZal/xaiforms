import { useFormikContext } from "formik";
import { maskValue } from "../utils/InputCurrencyMask";
import { getCardImage } from "../utils/FormHelper";

const FieldValue = (props) => {
  const { name, className, format } = props;
  const { values } = useFormikContext();

  const fieldName = name;
  const value = values[fieldName] ? values[fieldName] : null;

  if (value) {
    switch (format) {
      case "price":
        return <div className={className}>{maskValue(value)}</div>;
      case "cardnumber":
        return (
          <div className={`cc-number-review ${className || ""}`}>
            <svg {...getCardImage()} />
            <span>{value}</span>
          </div>
        );
      case "option-label": {
        const select = document.querySelector(`select[name="${fieldName}"]`);

        let valueOption;
        Object.values(select.options).forEach(function (option) {
          if (option.value === value) {
            valueOption = option.text;
          }
        });

        return <div className={className}>{valueOption}</div>;
      }
      default:
        return <div className={className}>{value}</div>;
    }
  }

  return value;
};

FieldValue.defaultProps = {
  className: null,
};

export default FieldValue;
