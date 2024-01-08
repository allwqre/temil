import { ARG, Argument, Assertion, Expression } from './types';

export const is_literal = (value: Argument): value is readonly [ARG.LIT, string] => value[0] === ARG.LIT;
export const is_expression = (value: Argument): value is readonly [ARG.EXP, Expression] => value[0] === ARG.EXP;

export const assert_literal: Assertion<readonly [ARG.LIT, string], Argument> = (value) => {
	if (!is_literal(value)) throw new Error();
};
export const assert_expression: Assertion<readonly [ARG.EXP, Expression], Argument> = (value) => {
	if (!is_expression(value)) throw new Error();
};