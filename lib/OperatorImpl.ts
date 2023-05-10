import { Expression } from "./Expression.js";
import { Interpreter } from "./Interpreter.js";
import { Literal } from "./Literal.js";

export type OperatorImpl = (
  exec: Interpreter["exec"],
  ...args: (Expression | Literal)[]
) => Promise<unknown> | unknown;

export type OperatorImplLookup = Record<string, OperatorImpl>;
