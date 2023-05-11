import { Operator } from './Operator.js';
import { Literal } from './Literal.js';

export class Expression {
	constructor(public readonly op: Operator, public readonly args: (Expression | Literal)[]) {}
}
