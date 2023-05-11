import { Interpreter } from './Interpreter.js';
import { Lexer } from './Lexer.js';
import { OperatorImplLookup } from './OperatorImpl.js';
import { Parser } from './Parser.js';
import * as assert from './Assert.js';

export class Temil {
	constructor(private readonly source: string, private readonly lookup: OperatorImplLookup) {}

	public run = async () => {
		const lexer = new Lexer(this.source);
		const tokens = lexer.run();
		const parser = new Parser(tokens);
		const ast = parser.run();
		const interpreter = new Interpreter(ast, this.lookup);
		const result = await interpreter.run();
		return result;
	};

	public static assert = assert;
}
