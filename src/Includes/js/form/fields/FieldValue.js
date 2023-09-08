import { useFormikContext } from "formik";
import { maskValue } from "../utils/InputCurrencyMask";
import { getCardImage } from "../utils/FormHelper";

const FieldValue = (props) => {
  const { tag, name, className, format } = props;
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
