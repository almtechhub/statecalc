"use strict";

import StateCalc from "../statecalc";

let calc = new StateCalc();

calc.addNumber(2);
calc.equal();
calc.pw2();

calc.plus();
calc.addNumber(2);
calc.equal();

calc.plus();
calc.addNumber(2);
calc.equal();

console.log(calc.answer); // 8
