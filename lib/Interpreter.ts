import { Expression } from "./Expression.js";
import { Literal } from "./Literal.js";

type Callable = (
  exec: Interpreter["exec"],
  ...args: (Expression | Literal)[]
) => Promise<unknown> | unknown;

export type OperatorLookup = Record<string, Callable>;

export class Interpreter {
  constructor(
    private readonly AST: Expression,
    private readonly operator_lookup: OperatorLookup
  ) {}

  private exec = async (current: Expression): Promise<unknown> => {
    const callable = this.operator_lookup[current.op.value];
    if (!callable) throw new Error(`Callable "${current.op.value}" not found.`);
    return await callable(this.exec, ...current.args);
  };

  public run = async () => this.exec(this.AST);
}
