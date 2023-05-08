import readline from "node:readline/promises";
import { Lexer } from "./Lexer.js";
import { Parser } from "./Parser.js";
import { Interpreter } from "./Interpreter.js";

const inq = readline.createInterface(process.stdin, process.stdout);

for (;;) {
  const input = await inq.question("> ");

  try {
    const tokens = new Lexer(input).run();
    console.log("TOKENS:", tokens);
    const ast = new Parser(tokens).run();
    console.log("AST:", ast);
    const result = await new Interpreter(ast, {
      hello: (exec, ...args) => "world",
    }).run();
    console.log("RESULT:", result);
  } catch (e) {
    console.error(e);
  }
}
