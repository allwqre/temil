import { LookupTable, Interpret, ARG } from './types';

export class Interpreter<T> {
	constructor(private readonly lookup: LookupTable<T>) {}

	public interpret: Interpret<T> = (arg, ctx) =>
		arg[0] === ARG.LIT ? arg[1] : this.lookup[arg[1][0]](this.interpret, ctx, arg[1][1]);
}
