const Button = (props) => {
  const { children, className, type, ...rest } = props;

  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      className={className}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: null,
};

export default Button;
