import { Expression } from "./Expression.js";
import { Literal } from "./Literal.js";

export type OperatorImpl = (
  exec: Interpreter["exec"],
  ...args: (Expression | Literal)[]
) => Promise<unknown> | unknown;

export type OperatorImplLookup = Record<string, OperatorImpl>;

export class Interpreter {
  constructor(
    private readonly AST: Expression,
    private readonly lookup: OperatorImplLookup
  ) {}

  private exec = async (current: Expression): Promise<unknown> => {
    const callable = this.lookup[current.op.value];
    if (!callable) throw new Error(`Callable "${current.op.value}" not found.`);
    return await callable(this.exec, ...current.args);
  };

  public run = async () => this.exec(this.AST);
}
