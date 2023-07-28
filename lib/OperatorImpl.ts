import { Expression } from './Expression.js';
import { ExecAsync, ExecSync } from './Interpreter.js';
import { Literal } from './Literal.js';

export type Context = Record<string, unknown>;

export type OperatorImpl = (
	exec: ExecSync | ExecAsync,
	ctx: Context,
	...args: (Expression | Literal)[]
) => Promise<unknown> | unknown;

export type OperatorImplLookup = Record<string, OperatorImpl>;
