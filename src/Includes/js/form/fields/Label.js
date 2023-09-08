const Label = (props) => {
  const { text, domId, ...rest } = props;

  return (
    <label htmlFor={domId || null} {...rest}>
      {text}
    </label>
  );
};

export default Label;
