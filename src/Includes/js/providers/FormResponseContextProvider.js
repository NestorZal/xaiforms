import React from "react";

export const FormResponseContext = React.createContext(null);
const FormResponseContextProvider = (props) => {
  const { children, response } = props;

  const contextValues = React.useMemo(
    () => ({
      response: response,
    }),
    [response],
  );

  return (
    <FormResponseContext.Provider value={contextValues}>
      {children}
    </FormResponseContext.Provider>
  );
};
export default FormResponseContextProvider;
