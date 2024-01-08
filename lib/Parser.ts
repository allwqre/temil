import { TOK, Token, Expression, ARG, Operator, Argument } from './types';

export class Parser {
	constructor(private readonly tokens: Token[]) {}

	public parse = (): Expression => {
		let cursor = 0;
		const stack: [Operator | null, Argument[]][] = [];
		let current_op: Operator | null = null;
		let current_args: Argument[] = [];

		while (cursor < this.tokens.length) {
			const token = this.tokens[cursor];
			switch (token[0]) {
				case TOK.L_PAR:
					stack.push([current_op, current_args]);
					current_op = null;
					current_args = [];
					break;
				case TOK.STR:
					if (!current_op) current_op = token[1];
					else current_args.push([ARG.LIT, token[1]]);
					break;
				case TOK.R_PAR:
					if (current_op === null) throw new Error();
					const expr = [current_op, current_args] as const;
					const prev = stack.pop();
					if (!prev || prev[0] === null) return expr;
					current_op = prev[0];
					current_args = prev[1];
					current_args.push([ARG.EXP, expr]);
					break;
				default:
					throw new Error('unreachable');
			}
			cursor += 1;
		}
		throw new Error('Unexpected EOE.');
	};
}
