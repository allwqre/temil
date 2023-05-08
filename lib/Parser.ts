import { Expression } from "./Expression.js";
import { Identifier } from "./Identifier.js";
import { Literal } from "./Literal.js";
import { TOKEN, Token } from "./Token.js";

export class Parser {
  private index = 0;

  constructor(private readonly tokens: Token[]) {}

  private advance = () => ++this.index;

  private peek = (n?: number) => this.tokens.at(this.index + (n ?? 0));

  private assert: (
    token: Token | undefined,
    ...expected: TOKEN[]
  ) => asserts token is Token = (
    token: Token | undefined,
    ...expected: TOKEN[]
  ) => {
    if (token === undefined)
      throw new Error(
        `Token not found. Expected one of [${expected
          .map((type) => TOKEN[type])
          .join(", ")}].`
      );
    if (expected.length > 0 && !expected.some((ex) => token.type === ex))
      throw new Error(
        `Unexpected token. Expected one of [${expected
          .map((type) => TOKEN[type])
          .join(", ")}] but got ${TOKEN[token.type]}.`
      );
  };

  public expression = (): Expression => {
    this.assert(this.peek(), TOKEN.LEFT_BRACKET);
    this.advance();

    const identifier_token = this.peek();
    this.assert(identifier_token, TOKEN.IDENTIFIER);
    this.advance();

    const args = [];
    do {
      const token = this.peek();
      this.assert(token, TOKEN.LEFT_BRACKET, TOKEN.LITERAL);

      if (token.type === TOKEN.LEFT_BRACKET) args.push(this.expression());
      if (token.type === TOKEN.LITERAL)
        args.push(new Literal(token.literal as string));

      this.advance();
    } while (this.peek()?.type !== TOKEN.RIGHT_BRACKET);

    this.assert(this.peek(), TOKEN.RIGHT_BRACKET);

    return new Expression(new Identifier(identifier_token.lexeme), args);
  };

  public run = () => this.expression();
}
