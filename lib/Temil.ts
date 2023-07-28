import { Interpreter } from './Interpreter.js';
import { Lexer } from './Lexer.js';
import { Context, OperatorImplLookup } from './OperatorImpl.js';
import { Parser } from './Parser.js';
import * as assert from './Assert.js';

export class Temil {
	constructor(private readonly lookup: OperatorImplLookup) {}

	public sync = (source: string, context: Context = {}) => {
		const lexer = new Lexer(source);
		const tokens = lexer.run();
		const parser = new Parser(tokens);
		const ast = parser.run();
		const interpreter = new Interpreter(ast, this.lookup, context);
		const result = interpreter.sync();
		return result;
	};

	public async = async (source: string, context: Context = {}) => {
		const lexer = new Lexer(source);
		const tokens = lexer.run();
		const parser = new Parser(tokens);
		const ast = parser.run();
		const interpreter = new Interpreter(ast, this.lookup, context);
		const result = await interpreter.async();
		return result;
	};

	public static assert = assert;
}
