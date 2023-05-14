import { Expression } from './Expression.js';
import { Context, OperatorImplLookup } from './OperatorImpl.js';

export class Interpreter {
	constructor(
		private readonly AST: Expression,
		private readonly lookup: OperatorImplLookup,
		private readonly context: Context = {},
	) {}

	private exec = async (current: Expression, ctx: Context): Promise<unknown> => {
		const op_impl = this.lookup[current.op.value];
		if (!op_impl) throw new Error(`Operator "${current.op.value}" not found.`);
		return await op_impl(this.exec, ctx, ...current.args);
	};

	public run = async () => this.exec(this.AST, this.context);
}
