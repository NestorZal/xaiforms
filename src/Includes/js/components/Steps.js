const Steps = (props) => {
  const { stepLabels, activeStep } = props;

  if (!stepLabels || stepLabels.length === 0) {
    return null;
  }

  return (
    <nav>
      <ul className="step-list">
        {stepLabels.map((step, index) => {
          const uniqueKey = `${step.split(" ").join("-")}-${index}`;

          return (
            <li
              key={uniqueKey}
              className={`step-label ${activeStep === step ? "active" : ""}`}
            >
              {step}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Steps;
