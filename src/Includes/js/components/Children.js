import React from "react";
import { attributesToProps } from "html-react-parser";

const renderChild = (child) => {
  if (React.isValidElement(child)) {
    return child;
  }

  if (typeof child === "object" && child !== null) {
    if (child.type === "text") {
      return child.data;
    }

    const props = attributesToProps(child.attribs);
    const { children } = child;
    const ElementChild = child.name;

    if (Array.isArray(children) && children.length > 0) {
      return (
        <ElementChild {...props}>
          {children.map((subChild) => {
            return renderChild(subChild);
          })}
        </ElementChild>
      );
    }

    return <ElementChild {...props} />;
  }

  return child;
};

const Children = ({ children }) => {
  if (Array.isArray(children) && children.length > 0) {
    return children.map((child) => {
      return renderChild(child);
    });
  }
  return renderChild(children);
};

export default Children;
