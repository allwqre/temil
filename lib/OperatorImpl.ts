import { Expression } from "./Expression.js";
import { Interpreter } from "./Interpreter.js";
import { Literal } from "./Literal.js";

export type Context = Record<string, unknown>;

export type OperatorImpl = (
  exec: Interpreter["exec"],
  ctx: Context,
  ...args: (Expression | Literal)[]
) => Promise<unknown> | unknown;

export type OperatorImplLookup = Record<string, OperatorImpl>;
