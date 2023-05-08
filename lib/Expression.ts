import { Identifier } from "./Identifier.js";
import { Literal } from "./Literal.js";

export class Expression {
  constructor(
    public readonly identifier: Identifier,
    public readonly args: (Expression | Literal)[]
  ) {}
}
