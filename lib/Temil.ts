import { Interpreter } from './Interpreter';
import { Lexer } from './Lexer';
import { Expression, ImplementationObject, Token, TranslationTable } from './types';
import { Parser } from './Parser';

export class Temil<T> {
	private readonly lexer;
	private readonly parser;
	private readonly interpreter;

	constructor(private readonly implementations: ImplementationObject<T>) {
		const entries = Object.entries(this.implementations);
		const translation_table = entries.reduce((acc, [op], idx) => ((acc[op] = idx), acc), {} as TranslationTable);
		const lookup_table = entries.map(([, impl]) => impl);

		this.lexer = new Lexer();
		this.parser = new Parser(translation_table);
		this.interpreter = new Interpreter(lookup_table);
	}

	public lex = (source: string) => this.lexer.lex(source);

	public parse = (tokens: Token[]) => this.parser.parse(tokens);

	public interpret = (ast: Expression, ctx: T) => this.interpreter.interpret(ast, ctx);

	public eval = (source: string, context: T) =>
		this.interpreter.interpret(this.parser.parse(this.lexer.lex(source)), context);
}
