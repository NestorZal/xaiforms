const Button = (props) => {
  const { children, className, type, ...rest } = props;

  const ButtonComponent = "button";

  return (
    <ButtonComponent
      type={type}
      className={className}
      {...(rest["onclick-callback"]
        ? {
            onClick: () => {
              window[rest["onclick-callback"]]();
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
