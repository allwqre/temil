import { Expression } from "./Expression.js";
import { OperatorImplLookup } from "./OperatorImpl.js";

export class Interpreter {
  constructor(
    private readonly AST: Expression,
    private readonly lookup: OperatorImplLookup
  ) {}

  private exec = async (current: Expression): Promise<unknown> => {
    const op_impl = this.lookup[current.op.value];
    if (!op_impl) throw new Error(`Callable "${current.op.value}" not found.`);
    return await op_impl(this.exec, ...current.args);
  };

  public run = async () => this.exec(this.AST);
}
