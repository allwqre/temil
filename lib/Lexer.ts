import { ERROR, TOK } from './enums';
import { Token } from './types';

export class Lexer {
	public lex = (source: string) => {
		const tokens: Token[] = [];
		let start = 0;
		let cursor = 0;

		const next = (keep_buffer: boolean = false) => (keep_buffer ? ++cursor : (start = ++cursor));
		const peek = () => source.at(cursor);
		const read_token = (type: TOK) => tokens.push([type, source.slice(start, cursor)]);
		const discard_buffer = () => (start = cursor);

		const expect = (c: string | undefined, ...e: string[]) => {
			if (c === undefined) throw ERROR[ERROR.UNEXPECTED_END_OF_STRING];
			return e.some((v) => c === v);
		};

		while ((discard_buffer(), peek() !== undefined))
			switch (peek()) {
				case ' ':
				case '\r':
				case '\t':
				case '\n':
					next();
					break;
				case '(':
					read_token(TOK.L_PAR);
					next();
					break;
				case ')':
					read_token(TOK.R_PAR);
					next();
					break;
				case "'":
					next();
					while (!expect(peek(), "'")) next(true);
					read_token(TOK.STR);
					next();
					break;
				default:
					while (!expect(peek(), ' ', ')', '\r', '\t', '\n')) next(true);
					read_token(TOK.STR);
					break;
			}
		return tokens;
	};
}
