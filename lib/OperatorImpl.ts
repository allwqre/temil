import { Expression } from './Expression.js';
import { Exec } from './Interpreter.js';
import { Literal } from './Literal.js';

export type Context = Record<string, unknown>;

export type OperatorImpl = (exec: Exec, ctx: Context, ...args: (Expression | Literal)[]) => Promise<unknown> | unknown;

export type OperatorImplLookup = Record<string, OperatorImpl>;
