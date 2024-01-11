import { LookupTable, Interpret } from './types';

export class Interpreter<T> {
	constructor(private readonly lookup: LookupTable<T>) {}

	public interpret: Interpret<T> = (exp, ctx) => this.lookup[exp[0]](this.interpret, ctx, exp[1]);
}
