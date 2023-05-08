import { IDENTIFIER_TOKEN_LOOKUP, TOKEN, Token } from "./Token.js";

export class Lexer {
  private tokens: Token[] = [];
  private start = 0;
  private index = 0;

  constructor(private readonly source: string) {}

  private advance = () => ++this.index;

  private peek = (n?: number) => this.source.at(this.index + (n ?? 0));

  private assert: (
    char: string | undefined,
    ...expected: string[]
  ) => asserts char is string = (char, ...expected) => {
    if (char === undefined)
      throw new Error(
        `Character not found. Expected one of [${expected.join(
          " "
        )}] at position ${this.index}.`
      );
    if (expected.length > 0 && !expected.some((ex) => char === ex))
      throw new Error(
        `Unexpected character. Expected one of [${expected.join(
          " "
        )}] but got ${char} at position ${this.index}.`
      );
  };

  private check = (char?: string, ...expected: string[]) => {
    if (char === undefined) return false;
    if (expected.length > 0 && !expected.some((ex) => char === ex))
      return false;
    return true;
  };

  private literal = (): Token => {
    this.assert(this.peek(), "'");
    this.advance();

    while (!this.check(this.peek(), "'") && this.check(this.peek()))
      this.advance();

    this.assert(this.peek(), "'");
    this.advance();

    return new Token(
      TOKEN.LITERAL,
      this.source.substring(this.start, this.index),
      String(this.source.substring(this.start + 1, this.index - 1))
    );
  };

  private identifier = (): Token => {
    this.assert(this.peek(), ...Object.keys(IDENTIFIER_TOKEN_LOOKUP));

    while (this.check(this.peek(), ...Object.keys(IDENTIFIER_TOKEN_LOOKUP)))
      this.advance();

    return new Token(
      TOKEN.IDENTIFIER,
      this.source.substring(this.start, this.index),
      undefined
    );
  };

  public run = () => {
    while (this.check(this.peek())) {
      this.start = this.index;
      const char = this.peek();

      switch (char) {
        case " ":
        case "\r":
        case "\t":
        case "\n":
          this.advance();
          break;
        case "(":
          this.tokens.push(new Token(TOKEN.LEFT_BRACKET, char, undefined));
          this.advance();
          break;
        case ")":
          this.tokens.push(new Token(TOKEN.RIGHT_BRACKET, char, undefined));
          this.advance();
          break;
        case "'":
          this.tokens.push(this.literal());
          break;
        default:
          this.assert(char, ...Object.keys(IDENTIFIER_TOKEN_LOOKUP));
          this.tokens.push(this.identifier());
          break;
      }
    }

    return this.tokens;
  };
}
