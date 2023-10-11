const expressions = {
  equal: (a, b) => {
    if (typeof a === "string" && typeof b === "string") {
      return a === b;
    }
    return parseInt(a, 10) === parseInt(b, 10);
  },
  rest: (a, b) => {
    return parseInt(a, 10) % parseInt(b, 10);
  },
  sum: (a, b) => {
    return parseInt(a, 10) + parseInt(b, 10);
  },
};

const buildExpressionTree = (expression, arrayExp) => {
  let exp = expression;
  if (!exp) {
    exp = arrayExp.shift();
  }

  if (expressions[exp]) {
    const children = [];
    let child1 = arrayExp.shift();

    if (expressions[child1]) {
      child1 = buildExpressionTree(child1, arrayExp);
    }

    let child2 = arrayExp.shift();
    if (expressions[child2]) {
      child2 = buildExpressionTree(child2, arrayExp);
    }

    children.push(child1);
    children.push(child2);

    return { exp: exp, children: children };
  }

  return exp;
};

const calculateExp = (expTree, value) => {
  let result = null;

  const exp = expTree.exp ? expTree.exp : "";
  const children = expTree.children ? expTree.children : null;

  let child1 = children[0];
  if (typeof child1 === "object" && child1 !== null) {
    child1 = calculateExp(child1, value);
  }
  if (child1 === "x") {
    child1 = value;
  }

  let child2 = children[1];
  if (typeof child2 === "object" && child2 !== null) {
    child2 = calculateExp(child2, value);
  }
  if (child2 === "x") {
    child2 = value;
  }

  if (expressions[exp]) {
    result = expressions[exp](child1, child2);
  }

  return result;
};

const validateExpression = (expression, value) => {
  const splitExp = expression.split(/[(,)]+/).filter((n) => n);
  const expressionTree = buildExpressionTree("", splitExp);
  return calculateExp(expressionTree, value);
};

export default validateExpression;
