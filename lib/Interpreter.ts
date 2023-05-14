import { Expression } from './Expression.js';
import { Context, OperatorImplLookup } from './OperatorImpl.js';

export type Exec = (exp: Expression, ctx: Context) => Promise<unknown>;

export class Interpreter {
	constructor(
		private readonly AST: Expression,
		private readonly lookup: OperatorImplLookup,
		private readonly context: Context = {},
	) {}

	private exec: Exec = async (exp, ctx) => {
		const op_impl = this.lookup[exp.op.value];
		if (!op_impl) throw new Error(`Operator "${exp.op.value}" not found.`);
		return await op_impl(this.exec, ctx, ...exp.args);
	};

	public run = async () => this.exec(this.AST, this.context);
}
