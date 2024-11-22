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
		const stack: [op: string | null, args: Argument[]][] = [];
		let cursor = 0;
		let op: string | null = null;
		let args: Argument[] = [];

		while (cursor < tokens.length) {
			const token = tokens[cursor];
			switch (token[0]) {
				case TOK.L_PAR:
					stack.push([op, args]);
					op = null;
					args = [];
					break;
				case TOK.STR:
					if (op === null) op = token[1];
					else args.push([ARG.LIT, this.coerce(token[1])]);
					break;
				case TOK.R_PAR:
					if (op === null) throw ERROR[ERROR.UNEXPECTED_END_OF_EXPRESSION];
					const prev = stack.pop();
					if (!prev || prev[0] === null) return [ARG.EXP, op, args];
					prev[1].push([ARG.EXP, op, args]);
					op = prev[0];
					args = prev[1];
					break;
				default:
					throw ERROR[ERROR.UNREACHABLE];
			}
			cursor += 1;
		}
		throw ERROR[ERROR.UNEXPECTED_END_OF_EXPRESSION];
	};
}
