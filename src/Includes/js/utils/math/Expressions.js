const expressions = {
  equal: (a, b) => {
    if (typeof a === "string" && typeof b === "string") {
      return a.trim() === b.trim();
    }
    return Number(a) === Number(b);
  },
  rest: (a, b) => {
    return Number(a) % Number(b);
  },
  sum: (a, b) => {
    return Number(a) + Number(b);
  },
  subtract: (a, b) => {
    return Number(a) - Number(b);
  },
  multiply: (a, b) => {
    return Number(a) * Number(b);
  },
  divide: (a, b) => {
    return Number(a) / Number(b);
  },
  greaterThan: (a, b) => {
    return Number(a) > Number(b);
  },
  lessThan: (a, b) => {
    return Number(a) < Number(b);
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

const calculateExpression = (expression, value = null) => {
  let splitExp = expression.split(/[(,)]+/).map(function (item) {
    return item.trim();
  });
  splitExp = splitExp.filter((n) => n);

  console.log(expression, splitExp);

  const expressionTree = buildExpressionTree("", splitExp);

  console.log(expressionTree);

  return calculateExp(expressionTree, value);
};

export default calculateExpression;
