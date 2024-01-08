import { TOK, Token } from './types';

export class Lexer {
	private tokens: Token[] = [];
	private start = 0;
	private cursor = 0;

	constructor(private readonly source: string) {}

	private next = (keep_buffer?: true) => (keep_buffer ? ++this.cursor : (this.start = ++this.cursor));

	private peek = (n: number = 0) => this.source.at(this.cursor + n);

	private read_token = (type: TOK) => {
		this.tokens.push([type, this.source.slice(this.start, this.cursor + 1)]);
		this.next();
	};

	private expect = (c: string | undefined, ...e: string[]) => {
		if (c === undefined) throw new Error('Unexpected EOS.');
		return e.some((v) => c === v);
	};

	public lex = () => {
		this.tokens = [];
		this.start = 0;
		this.cursor = 0;

		while (this.peek() !== undefined)
			switch (this.peek()) {
				case ' ':
				case '\r':
				case '\t':
				case '\n':
					this.next();
					break;
				case '(':
					this.read_token(TOK.L_PAR);
					break;
				case ')':
					this.read_token(TOK.R_PAR);
					break;
				case "'":
					this.next();
					while (!this.expect(this.peek(1), "'")) this.next(true);
					this.read_token(TOK.STR);
					this.next();
					break;
				default:
					while (!this.expect(this.peek(1), ' ', ')')) this.next(true);
					this.read_token(TOK.STR);
					break;
			}
		return this.tokens;
	};
}
