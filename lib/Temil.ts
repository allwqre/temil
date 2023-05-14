import { Interpreter } from './Interpreter.js';
import { Lexer } from './Lexer.js';
import { Context, OperatorImplLookup } from './OperatorImpl.js';
import { Parser } from './Parser.js';
import * as assert from './Assert.js';

export class Temil {
	constructor(private readonly lookup: OperatorImplLookup) {}

	public run = async (source: string, context: Context) => {
		const lexer = new Lexer(source);
		const tokens = lexer.run();
		const parser = new Parser(tokens);
		const ast = parser.run();
		const interpreter = new Interpreter(ast, this.lookup, context);
		const result = await interpreter.run();
		return result;
	};

	public static assert = assert;
}
