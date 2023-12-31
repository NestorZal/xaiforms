import React from "react";
import { Formik, Form } from "formik";
import request from "./utils/Request";
import Spinner from "../components/Spinner";
import { TemplateContext } from "../providers/TemplateContextProvider";
import FormContextProvider from "../providers/FormContextProvider";
import FormResponseContextProvider from "../providers/FormResponseContextProvider";

const handleSubmit = (
  values,
  formData,
  setCurrentFormStatus,
  isValidXaiForm,
) => {
  if (!isValidXaiForm) {
    return false;
  }

  setCurrentFormStatus("submitting");

  const { _wpnonce, _wp_http_referer, http_referer, ...data } = values;

  const requestData = {
    method: formData.method,
    endpoint: formData.endpoint,
    body: data,
  };

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

const scrollTop = (scrollTo) => {
  if (scrollTo !== null) {
    setTimeout(function () {
      window.scrollTo({
        top: scrollTo,
        behavior: "smooth",
      });
    }, 10);
  }
};

const renderSteps = (steps, scrollTo) => {
  if (steps.length === 0 || !steps) {
    return { step: null, setCurrentStep: null };
  }

  const initialStep = steps ? steps[0] : "";
  const [step, setStep] = React.useState(initialStep);
  const setCurrentStep = React.useCallback(
    (currentStep) => {
      setStep(currentStep);
      scrollTop(scrollTo);
    },
    [step],
  );

  return { step: step, setCurrentStep: setCurrentStep };
};

const XaiFormComponent = (props) => {
  const {
    children,
    steps,
    stepLabels,
    formValues,
    values,
    scrollTo,
    isValidXaiForm,
    setCurrentValidXaiForm,
  } = props;
  const { step, setCurrentStep } = renderSteps(steps, scrollTo);

  const firstRender = React.useRef(true);

  React.useEffect(() => {
    /* eslint no-param-reassign: "error" */
    formValues.current = values;

    if (firstRender.current) {
      firstRender.current = false;
    }
  }, [values, firstRender.current]);

  return (
    <FormContextProvider
      steps={steps}
      stepLabels={stepLabels}
      step={step}
      setCurrentStep={setCurrentStep}
      isValidXaiForm={isValidXaiForm}
      setCurrentValidXaiForm={setCurrentValidXaiForm}
      firstRender={firstRender.current}
    >
      {children}
    </FormContextProvider>
  );
};

const XaiForm = ({ children, index, method, action, ...rest }) => {
  const { forms } = React.useContext(TemplateContext);

  const currentForm = forms[index];
  if (!currentForm) {
    return null;
  }

  const formValues = React.useRef(currentForm.fieldValues);
  const formResponse = React.useRef(null);

  const scrollTo = rest["scroll-top"] ? rest["scroll-top"] : null;

  const [formStatus, setFormStatus] = React.useState("init");
  const setCurrentFormStatus = React.useCallback(
    (currentStatus, response) => {
      formResponse.current = response;
      setFormStatus(currentStatus);
      scrollTop(scrollTo);
    },
    [formStatus],
  );

  const [isValidXaiForm, setValidXaiForm] = React.useState(true);
  const setCurrentValidXaiForm = React.useCallback(
    (isValid) => {
      setValidXaiForm(isValid);
    },
    [isValidXaiForm],
  );

  switch (formStatus) {
    case "submitting":
      return <Spinner {...rest} />;
    case "init":
      return (
        <Formik
          initialValues={formValues.current}
          onSubmit={async (values) => {
            return handleSubmit(
              values,
              { method: method, endpoint: action },
              setCurrentFormStatus,
              isValidXaiForm,
            );
          }}
        >
          {(props) => (
            <Form>
              <XaiFormComponent
                steps={currentForm.steps}
                stepLabels={currentForm.stepLabels}
                formValues={formValues}
                values={props.values}
                scrollTo={scrollTo}
                isValidXaiForm={isValidXaiForm}
                setCurrentValidXaiForm={setCurrentValidXaiForm}
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
