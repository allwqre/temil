import { Lexer } from './Lexer';
import { Parser } from './Parser';
import { Interpreter } from './Interpreter';
import type { Argument, Lookup, Token } from './types';

export class Temil<T> {
	private readonly lexer;
	private readonly parser;
	private readonly interpreter;

	constructor(implementations: Lookup<T>) {
		this.lexer = new Lexer();
		this.parser = new Parser();
		this.interpreter = new Interpreter(implementations);
	}

	public lex = (source: string) => this.lexer.lex(source);

	public parse = (tokens: Token[]) => this.parser.parse(tokens);

	public interpret = (ast: Argument, ctx: T) => this.interpreter.interpret(ast, ctx);

	public eval = (source: string, context: T) =>
		this.interpreter.interpret(this.parser.parse(this.lexer.lex(source)), context);
}
