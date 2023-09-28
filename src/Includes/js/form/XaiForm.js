import React from "react";
import { Formik, Form } from "formik";
import request from "./utils/Request";
import Spinner from "../components/Spinner";
import { TemplateContext } from "../providers/TemplateContextProvider";
import FormContextProvider from "../providers/FormContextProvider";
import FormResponseContextProvider from "../providers/FormResponseContextProvider";

const handleSubmit = (values, formData, setCurrentFormStatus) => {
  setCurrentFormStatus("submitting");

  const { _wpnonce, _wp_http_referer, http_referer, ...data } = values;

  const requestData = {
    method: formData.method,
    endpoint: formData.endpoint,
    body: data,
  };
  console.log(data);
  if (_wpnonce) {
    requestData._wpnonce = _wpnonce;
  }

  request(requestData).then((response) => {
    const redirect = _wp_http_referer || http_referer;
    if (redirect) {
      window.location.href = redirect;
    }

    if (response.status) {
      setCurrentFormStatus(response.status, response);
    } else {
      setCurrentFormStatus("error", { status: "error", error: response });
    }

    return true;
  });

  return true;
};

const renderSteps = (steps) => {
  if (steps.length === 0) {
    return { step: null, setCurrentStep: null };
  }

  const initialStep = steps ? steps[0] : "";
  const [step, setStep] = React.useState(initialStep);
  const setCurrentStep = React.useCallback(
    (currentStep) => {
      setStep(currentStep);
    },
    [step],
  );

  return { step: step, setCurrentStep: setCurrentStep };
};

const XaiFormComponent = (props) => {
  const { children, steps, formValues, values } = props;
  const { step, setCurrentStep } = renderSteps(steps);

  React.useEffect(() => {
    /* eslint no-param-reassign: "error" */
    formValues.current = values;
  }, [values]);

  return (
    <FormContextProvider
      steps={steps}
      step={step}
      setCurrentStep={setCurrentStep}
    >
      {children}
    </FormContextProvider>
  );
};

const XaiForm = ({ children, index, method, action }) => {
  const { forms } = React.useContext(TemplateContext);

  const currentForm = forms[index];
  if (!currentForm) {
    return null;
  }

  const formValues = React.useRef(currentForm.fieldValues);
  const formResponse = React.useRef(null);

  const [formStatus, setFormStatus] = React.useState("init");
  const setCurrentFormStatus = React.useCallback(
    (currentStatus, response) => {
      formResponse.current = response;
      setFormStatus(currentStatus);
    },
    [formStatus],
  );

  switch (formStatus) {
    case "submitting":
      return <Spinner />;
    case "init":
      return (
        <Formik
          initialValues={formValues.current}
          onSubmit={async (values) => {
            return handleSubmit(
              values,
              { method: method, endpoint: action },
              setCurrentFormStatus,
            );
          }}
        >
          {(props) => (
            <Form>
              <XaiFormComponent
                steps={currentForm.steps}
                formValues={formValues}
                values={props.values}
              >
                {children}
              </XaiFormComponent>
            </Form>
          )}
        </Formik>
      );

    default: {
      if (currentForm.formResponse && currentForm.formResponse[formStatus]) {
        return (
          <FormResponseContextProvider response={formResponse.current}>
            {currentForm.formResponse[formStatus]}
          </FormResponseContextProvider>
        );
      }
      return null;
    }
  }
};

export default XaiForm;
