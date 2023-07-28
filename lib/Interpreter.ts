import { Expression } from './Expression.js';
import { Context, OperatorImplLookup } from './OperatorImpl.js';

export type ExecAsync = (exp: Expression, ctx: Context) => Promise<unknown>;
export type ExecSync = (exp: Expression, ctx: Context) => unknown;

export class Interpreter {
	constructor(
		private readonly AST: Expression,
		private readonly lookup: OperatorImplLookup,
		private readonly context: Context = {},
	) {}

	private execSync: ExecSync = (exp, ctx) => {
		const op_impl = this.lookup[exp.op.value];
		if (!op_impl) throw new Error(`Operator "${exp.op.value}" not found.`);
		return op_impl(this.execSync, ctx, ...exp.args);
	};

	private execAsync: ExecAsync = async (exp, ctx) => {
		const op_impl = this.lookup[exp.op.value];
		if (!op_impl) throw new Error(`Operator "${exp.op.value}" not found.`);
		return await op_impl(this.execAsync, ctx, ...exp.args);
	};

	public sync = () => this.execSync(this.AST, this.context);
	public async = async () => this.execAsync(this.AST, this.context);
}
