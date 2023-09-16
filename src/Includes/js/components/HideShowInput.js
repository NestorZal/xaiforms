import React from "react";
import Button from "../form/fields/Button";

const HideShowInput = (props) => {
  const { type, value, ...rest } = props;

  const defaultType = type || "text";
  const hideType = "password";

  const initialType = value ? hideType : defaultType;
  const [currentType, setType] = React.useState(initialType);

  return (
    <div className="hide-show-input">
      <input type={currentType} value={value || ""} {...rest} />
      <Button
        type="button"
        onClick={() => {
          if (currentType === hideType) {
            setType(defaultType);
          } else {
            setType(hideType);
          }
        }}
      >
        <span
          className={`dashicons ${
            currentType === defaultType
              ? "dashicons-visibility"
              : "dashicons-hidden"
          }`}
        />
      </Button>
    </div>
  );
};

export default HideShowInput;
