"use strict";

import StateCalc from "../statecalc";

let calc = new StateCalc();

calc.e();
console.log(calc.answer) // e

calc.pi();
console.log(calc.entry) // pi

calc.py();
console.log(calc.entry) // py

calc.phi();
console.log(calc.entry) // phi
