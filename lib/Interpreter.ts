import { Expression } from "./Expression.js";
import { Literal } from "./Literal.js";

type Callable = (
  exec: Interpreter["exec"],
  ...args: (Expression | Literal)[]
) => Promise<unknown> | unknown;

export class Interpreter {
  constructor(
    private readonly AST: Expression,
    private readonly callable: Record<string, Callable>
  ) {}

  private exec = async (current: Expression): Promise<unknown> => {
    const callable = this.callable[current.identifier.value];
    if (!callable)
      throw new Error(`Callable "${current.identifier.value}" not found.`);
    return await callable(this.exec, ...current.args);
  };

  public run = async () => this.exec(this.AST);
}
