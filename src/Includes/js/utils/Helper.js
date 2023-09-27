export const mergeNestedObjects = (target, source) => {
  const targetCopy = target;

  Object.keys(source).forEach((key) => {
    if (
      typeof source[key] === "object" &&
      typeof targetCopy[key] === "object"
    ) {
      targetCopy[key] = mergeNestedObjects(targetCopy[key], source[key]);
    } else {
      targetCopy[key] = source[key];
    }
  });

  return targetCopy;
};

const getArrayName = (name) => {
  return name.split(/[[\]]/).filter((n) => n.trim());
};

export const inputArrayToObject = (name, value) => {
  let inputNameObject = "";
  let inputObject = null;

  const arrayName = getArrayName(name);

  if (arrayName.length > 1) {
    inputObject = value || "";
    [inputNameObject] = arrayName;

    for (let i = arrayName.length - 1; i > 0; i -= 1) {
      const currentObject = {};
      currentObject[arrayName[i]] = inputObject;
      inputObject = currentObject;
    }
  }

  return { inputNameObject: inputNameObject, inputObject: inputObject };
};

export const getDeepValue = (inputName, values) => {
  const arrayName = getArrayName(inputName);

  if (arrayName.length > 1) {
    let currentValue = values;

    for (let i = 0; i < arrayName.length; i += 1) {
      const key = arrayName[i];

      if (currentValue[key]) {
        currentValue = currentValue[key];
      }
    }

    return currentValue;
  }

  return values[inputName] || "";
};
