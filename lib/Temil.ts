import { Interpreter } from './Interpreter';
import { Lexer } from './Lexer';
import { Lookup } from './types';
import { Parser } from './Parser';

export class Temil<T> {
	constructor(private readonly lookup: Lookup<T>) {}

	public eval = (source: string, context: T) => {
		const tokens = new Lexer(source).lex();
		const ast = new Parser(tokens).parse();
		return new Interpreter(this.lookup).exec(ast, context);
	};
}
