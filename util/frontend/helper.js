module.exports = {
  getDateFromTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);

    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();

    return `${dd}.${mm}.${yyyy}`;
  },
  evalString(evalString, trueString) {
    return evalString === trueString;
  },
  evalIntMoreThan(evalInt, trueInt) {
    return evalInt > trueInt;
  },
  makeArray(length) {
    return [...Array(length).keys()];
  },
  when(operand1, operator, operand2) {
    const operators = { //  {{#when <operand1> 'eq' <operand2>}}
      eq: (l, r) => l === r, //  {{/when}}
      noteq: (l, r) => l !== r,
      gt: (l, r) => (+l) > (+r), // {{#when var1 'eq' var2}}
      gteq: (l, r) => ((+l) > (+r)) || (l === r), //               eq
      lt: (l, r) => (+l) < (+r), // {{else when var1 'gt' var2}}
      lteq: (l, r) => ((+l) < (+r)) || (l === r), //               gt
      or: (l, r) => l || r, // {{else}}
      and: (l, r) => l && r, //               lt
      '%': (l, r) => (l % r) === 0, // {{/when}}
    };
    const result = operators[operator](operand1, operand2);
    if (result) return result;
    return undefined;
  },
};
