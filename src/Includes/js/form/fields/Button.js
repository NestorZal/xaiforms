import Children from "../../components/Children";

const Button = (props) => {
  const { children, className, type, ...rest } = props;

  const ButtonComponent = "button";

  return (
    <ButtonComponent type={type} className={className} {...rest}>
      <Children>{children}</Children>
    </ButtonComponent>
  );
};

Button.defaultProps = {
  type: "button",
  className: null,
};

export default Button;
