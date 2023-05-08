import readline from "node:readline/promises";
import { Lexer } from "./Lexer.js";
import { Parser } from "./Parser.js";

const inq = readline.createInterface(process.stdin, process.stdout);

for (;;) {
  const input = await inq.question(">");

  try {
    const tokens = new Lexer(input).run();
    console.log(tokens);
    const ast = new Parser(tokens).run();
    console.log(ast);
  } catch (e) {
    console.error(e);
  }
}
