import { Interpreter, OperatorLookup } from "./Interpreter.js";
import { Lexer } from "./Lexer.js";
import { Parser } from "./Parser.js";

export class Temil {
  constructor(
    private readonly source: string,
    private readonly operator_lookup: OperatorLookup
  ) {}

  public run = async () => {
    const lexer = new Lexer(this.source);
    const tokens = lexer.run();
    const parser = new Parser(tokens);
    const ast = parser.run();
    const interpreter = new Interpreter(ast, this.operator_lookup);
    const result = await interpreter.run();
    return result;
  };
}
