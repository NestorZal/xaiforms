const Tag = (props) => {
  const { children, tagName: Element, ...rest } = props;

  if (children) {
    return <Element {...rest}>{children}</Element>;
  }
  return <Element {...rest} />;
};

export default Tag;
