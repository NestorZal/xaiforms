const Button = (props) => {
  const { children, className, type, ...rest } = props;

  const ButtonComponent = "button";

  return (
    <ButtonComponent type={type} className={className} {...rest}>
      {children}
    </ButtonComponent>
  );
};

Button.defaultProps = {
  type: "button",
  className: null,
};

export default Button;
