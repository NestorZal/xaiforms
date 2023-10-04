const Button = (props) => {
  const { children, className, type, ...rest } = props;

  const ButtonComponent = "button";

  return (
    <ButtonComponent
      type={type}
      className={className}
      {...(rest["data-onclick"]
        ? {
            onClick: () => {
              window[rest["data-onclick"]]();
            },
          }
        : "")}
      {...rest}
    >
      {children}
    </ButtonComponent>
  );
};

Button.defaultProps = {
  type: "button",
  className: null,
};

export default Button;
