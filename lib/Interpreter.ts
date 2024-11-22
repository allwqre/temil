import { ARG } from './enums';
import type { Interpret, Lookup } from './types';

export class Interpreter<T> {
	constructor(private readonly lookup: Lookup<T>) {}

	public interpret: Interpret<T> = (arg, ctx) =>
		arg[0] === ARG.LIT ? arg[1] : this.lookup[arg[1]](this.interpret, ctx, arg[2]);
}
