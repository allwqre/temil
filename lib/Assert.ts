import { Expression } from './Expression.js';
import { Literal } from './Literal.js';

export class AssertionError extends Error {
	constructor(public readonly scope: string, message?: string) {
		super(`[${scope}] ${message}`);
	}
}

export const assert_args = (args: (Expression | Literal)[], n: number, scope: string) => {
	if (args.length !== n) throw new AssertionError(scope, `Expected ${n} args but got ${args.length}.`);
};

export const assert_args_greater = (args: (Expression | Literal)[], n: number, scope: string) => {
	if (args.length <= n) throw new AssertionError(scope, `Expected more than ${n} args but got ${args.length}.`);
};

export const assert_args_less = (args: (Expression | Literal)[], n: number, scope: string) => {
	if (args.length >= n) throw new AssertionError(scope, `Expected less than ${n} args but got ${args.length}.`);
};

export const assert_instanceof: <T extends Function>(value: unknown, cls: T, scope: string) => asserts value is T = (
	value,
	cls,
	scope,
) => {
	if (!(value instanceof cls)) throw new AssertionError(scope, `Expected ${value} to be instance of ${cls.name}.`);
};

export const assert_expression: (value: unknown, scope: string) => asserts value is Expression = (value, scope) => {
	if (!(value instanceof Expression))
		throw new AssertionError(scope, `Expected ${value} to be instance of Expression.`);
};

export const assert_literal: (value: unknown, scope: string) => asserts value is Literal = (value, scope) => {
	if (!(value instanceof Literal)) throw new AssertionError(scope, `Expected ${value} to be instance of Literal.`);
};
