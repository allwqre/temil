import { Lookup, Exec } from './types';

export class Interpreter<T> {
	constructor(private readonly lookup: Lookup<T>) {}

	public exec: Exec<T> = (exp, ctx) => {
		const op_impl = this.lookup[exp[0]];
		if (!op_impl) throw new Error('Unexpected operator.');
		return op_impl(this.exec, ctx, exp[1]);
	};
}
