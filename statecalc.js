const CLASS_SYMBOL = Symbol('StateCalc Symbol');

const ourFuncs = {
  exp: { func: Math.exp, type: 'u' },
  pw2: { func: n => 2 ** n, type: 'u' },
  pw10: { func: n => 10 ** n, type: 'u' },
  ln: { func: Math.log, type: 'u' },
  sin: { func: Math.sin, type: 'u' },
  cos: { func: Math.cos, type: 'u' },
  tan: { func: Math.tan, type: 'u' },
  sqrt: { func: Math.sqrt, type: 'u' },
  qrt: { func: n => n ** (1 / 3), type: 'u' },
  log: { func: Math.log2, type: 'u' },
  vert: { func: n => 1 / n, type: 'u' },
  plus: { func: (a, b) => a + b, type: 'b' },
  minus: { func: (b, a) => b - a, type: 'b' },
  div: { func: (b, a) => b / a, type: 'b' },
  mult: { func: (a, b) => a * b, type: 'b' },
};

export default class StateCalc {
  constructor() {
    const classObj = {
      entry: '0',
      answer: 0,
      numberEntered: false,
      decimalAdded: false,
      answerFunction: null,
      curriedFunction: x => x,
      binOp: false,
      eqLast: false,
      v1: null,
      v2: null,
    };

    classObj.unaryOperation = function unaryOperation(func) {
      this[CLASS_SYMBOL].answer = func(this[CLASS_SYMBOL].answer);
    };

    classObj.binaryOperation = function binaryOperation() {
      const num = this[CLASS_SYMBOL].answer - 0;
      this[CLASS_SYMBOL].curryAnsFunc(num);
      this[CLASS_SYMBOL].numberEntered = false;
      this[CLASS_SYMBOL].binOp = true;
    };

    classObj.curryAnsFunc = function curryAnsFunc(val) {
      const funcName = this[CLASS_SYMBOL].answerFunction;
      let fn;
      if (funcName) {
        fn = ourFuncs[funcName].func;
      } else {
        fn = x => x;
      }

      let tmpFunc;
      if (funcName === 'minus' || funcName === 'div') {
        tmpFunc = n => fn(n, val);
      } else {
        tmpFunc = n => fn(val, n);
      }
      this[CLASS_SYMBOL].curriedFunction = tmpFunc;
    };

    classObj.insertSpecial = function insertSpecial(val) {
      this[CLASS_SYMBOL].eqLast = false;
      if (this[CLASS_SYMBOL].binOp && !this[CLASS_SYMBOL].eqLast) this.equal();
      this[CLASS_SYMBOL].entry = val;
      if (this[CLASS_SYMBOL].answer === 0) {
        this.equal();
        this[CLASS_SYMBOL].entry = '0';
      }
    };

    classObj.unaryOperation = classObj.unaryOperation.bind(this);
    classObj.binaryOperation = classObj.binaryOperation.bind(this);
    classObj.curryAnsFunc = classObj.curryAnsFunc.bind(this);
    classObj.insertSpecial = classObj.insertSpecial.bind(this);

    this[CLASS_SYMBOL] = classObj;

    // Add methods to object
    /* eslint-disable no-return-assign */
    Reflect.ownKeys(ourFuncs).map(e => this[e] = () => { this.func(e); });
  }

  get entry() {
    const val = this[CLASS_SYMBOL].entry - 0;
    return val || 0;
  }

  set entry(e) {
    const val = this[CLASS_SYMBOL].entry - 0;
    return val || 0;
  }

  get answer() {
    return this[CLASS_SYMBOL].answer - 0;
  }

  set answer(e) {
    return this[CLASS_SYMBOL].answer - 0;
  }

  get v1() {
    return this[CLASS_SYMBOL].v1;
  }

  set v1(e) {
    return this[CLASS_SYMBOL].v1;
  }

  get v2() {
    return this[CLASS_SYMBOL].v2;
  }

  set v2(e) {
    return this[CLASS_SYMBOL].v2;
  }

  negate() {
    const val = this[CLASS_SYMBOL].entry - 0;
    this[CLASS_SYMBOL].entry = -1 * val;
  }

  e() {
    this[CLASS_SYMBOL].insertSpecial(Math.E);
  }

  pi() {
    this[CLASS_SYMBOL].insertSpecial(Math.PI);
  }

  phi() {
    this[CLASS_SYMBOL].insertSpecial(1.6180339887498948482);
  }

  py() {
    this[CLASS_SYMBOL].insertSpecial(Math.sqrt(2));
  }

  rand() {
    this[CLASS_SYMBOL].insertSpecial(Math.random());
  }

  pct() {
    this[CLASS_SYMBOL].answer = ((this[CLASS_SYMBOL].answer - 0) / 100);
    this[CLASS_SYMBOL].entry = this[CLASS_SYMBOL].answer;
    this[CLASS_SYMBOL].curryAnsFunc(this[CLASS_SYMBOL].answer);
  }


  c() {
    this[CLASS_SYMBOL] = {
      entry: '0',
      answer: 0,
      numberEntered: false,
      decimalAdded: false,
      answerFunction: null,
      curriedFunction: x => x,
      binOp: false,
      eqLast: false,
      v1: null,
      v2: null,
      binaryOperation: this[CLASS_SYMBOL].binaryOperation,
      unaryOperation: this[CLASS_SYMBOL].unaryOperation,
      curryAnsFunc: this[CLASS_SYMBOL].curryAnsFunc,
      insertSpecial: this[CLASS_SYMBOL].insertSpecial,
    };
  }

  ce() {
    this[CLASS_SYMBOL].eqLast = false;
    this[CLASS_SYMBOL].entry = '0';
  }

  setv1() {
    this[CLASS_SYMBOL].v1 = this[CLASS_SYMBOL].answer;
  }

  setv2() {
    this[CLASS_SYMBOL].v2 = this[CLASS_SYMBOL].answer;
  }

  recv1() {
    this[CLASS_SYMBOL].eqLast = false;
    if (this[CLASS_SYMBOL].v1) {
      this[CLASS_SYMBOL].entry = this[CLASS_SYMBOL].v1 - 0;
    }
  }

  recv2() {
    this[CLASS_SYMBOL].eqLast = false;
    if (this[CLASS_SYMBOL].v2) {
      this[CLASS_SYMBOL].entry = this[CLASS_SYMBOL].v2 - 0;
    }
  }

  addNumber(num) {
    if (Number.isNaN(num)) return;
    if (this[CLASS_SYMBOL].binOp
      && !this[CLASS_SYMBOL].eqLast
      && !this[CLASS_SYMBOL].numberEntered) this.equal();
    if (this[CLASS_SYMBOL].eqLast) this[CLASS_SYMBOL].entry = '0';
    if (this[CLASS_SYMBOL].binOp || this[CLASS_SYMBOL].eqLast) {
      this[CLASS_SYMBOL].binOp = false;
      this[CLASS_SYMBOL].entry = '';
      this[CLASS_SYMBOL].decimalAdded = false;
    }
    this[CLASS_SYMBOL].eqLast = false;
    let numStr = (this[CLASS_SYMBOL].entry || '');
    numStr += Math.floor(num);
    this[CLASS_SYMBOL].entry = numStr;
    this[CLASS_SYMBOL].numberEntered = true;
  }

  addDecimal() {
    this[CLASS_SYMBOL].eqLast = false;
    if (this[CLASS_SYMBOL].decimalAdded) return;
    this[CLASS_SYMBOL].entry += '.';
    this[CLASS_SYMBOL].numberEntered = false;
    this[CLASS_SYMBOL].decimalAdded = true;
  }

  equal() {
    let ans;
    if (this[CLASS_SYMBOL].eqLast) {
      if (this[CLASS_SYMBOL].answerFunction === 'minus' || this[CLASS_SYMBOL].answerFunction === 'div') {
        this[CLASS_SYMBOL].curryAnsFunc((this[CLASS_SYMBOL].entry - 0));
        ans = this[CLASS_SYMBOL].curriedFunction(this[CLASS_SYMBOL].answer - 0);
      } else {
        this[CLASS_SYMBOL].curryAnsFunc(this[CLASS_SYMBOL].answer - 0);
        ans = this[CLASS_SYMBOL].curriedFunction(this[CLASS_SYMBOL].entry - 0);
      }
    } else if (this[CLASS_SYMBOL].numberEntered) {
      this[CLASS_SYMBOL].curryAnsFunc(this[CLASS_SYMBOL].entry - 0);
      ans = this[CLASS_SYMBOL].curriedFunction(this[CLASS_SYMBOL].answer - 0);
    } else {
      this[CLASS_SYMBOL].answer = (this[CLASS_SYMBOL].entry - 0);
      ans = this[CLASS_SYMBOL].curriedFunction(this[CLASS_SYMBOL].answer - 0);
    }

    if (!Number.isNaN(ans)) this[CLASS_SYMBOL].answer = ans;
    this[CLASS_SYMBOL].binOp = false;
    this[CLASS_SYMBOL].eqLast = true;
    this[CLASS_SYMBOL].numberEntered = false;
  }

  func(tmpFunc) {
    if (ourFuncs[tmpFunc]) {
      if (ourFuncs[tmpFunc].type === 'u') {
        this[CLASS_SYMBOL].unaryOperation(ourFuncs[tmpFunc].func);
      } else if (ourFuncs[tmpFunc].type === 'b') {
        this[CLASS_SYMBOL].answerFunction = tmpFunc;
        this[CLASS_SYMBOL].binaryOperation();
      }
    }
  }
}
