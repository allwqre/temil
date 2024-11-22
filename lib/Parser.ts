import { ARG, ERROR, TOK } from './enums';
import type { Token, Argument, Extension } from './types';

export class Parser {
	constructor(private readonly extensions: Extension[] = []) {}

	private coerce = (token: string) => {
		for (const [regexp, constructor] of this.extensions)
			if (!regexp.test(token)) continue;
			else return constructor(token);
		return token;
	};

	public parse = (tokens: Token[]): Argument => {
		const stack: [string | null, Argument[]][] = [];
		let cursor = 0;
		let current_op: string | null = null;
		let current_args: Argument[] = [];

		while (cursor < tokens.length) {
			const token = tokens[cursor];
			switch (token[0]) {
				case TOK.L_PAR:
					stack.push([current_op, current_args]);
					current_op = null;
					current_args = [];
					break;
				case TOK.STR:
					if (current_op === null) current_op = token[1];
					else current_args.push([ARG.LIT, this.coerce(token[1])]);
					break;
				case TOK.R_PAR:
					if (current_op === null) throw ERROR[ERROR.UNEXPECTED_END_OF_EXPRESSION];
					const prev = stack.pop();
					if (!prev || prev[0] === null) return [ARG.EXP, current_op, current_args];
					current_op = prev[0];
					current_args = prev[1];
					current_args.push([ARG.EXP, current_op, current_args]);
					break;
				default:
					throw ERROR[ERROR.UNREACHABLE];
			}
			cursor += 1;
		}
		throw ERROR[ERROR.UNEXPECTED_END_OF_EXPRESSION];
	};
}
