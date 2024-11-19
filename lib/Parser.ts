import { UnexpectedEndOfExpressionError, UnknownOperatorError, UnreachableError } from './Error';
import { TOK, Token, ARG, Argument, LookupIndex, TranslationTable } from './types';

export class Parser {
	constructor(private readonly translation_table: TranslationTable) {}

	public parse = (tokens: Token[]): Argument => {
		let cursor = 0;
		const stack: [LookupIndex | null, Argument[]][] = [];
		let current_op: LookupIndex | null = null;
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
					if (current_op === null)
						if (this.translation_table[token[1]] === undefined) throw new UnknownOperatorError(token[1]);
						else current_op = this.translation_table[token[1]];
					else current_args.push([ARG.LIT, token[1]]);
					break;
				case TOK.R_PAR:
					if (current_op === null) throw new UnexpectedEndOfExpressionError();
					const expr = [current_op, current_args] as const;
					const prev = stack.pop();
					if (!prev || prev[0] === null) return [ARG.EXP, expr];
					current_op = prev[0];
					current_args = prev[1];
					current_args.push([ARG.EXP, expr]);
					break;
				default:
					throw new UnreachableError();
			}
			cursor += 1;
		}
		throw new UnexpectedEndOfExpressionError();
	};
}
