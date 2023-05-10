import { Expression } from "./Expression.js";
import { Operator } from "./Operator.js";
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

    const op_token = this.peek();
    this.assert(op_token, TOKEN.OPERATOR);
    this.advance();

    const args = [];

    for (
      let token = this.peek();
      token?.type !== TOKEN.RIGHT_BRACKET;
      token = this.peek()
    ) {
      this.assert(
        token,
        TOKEN.LEFT_BRACKET,
        TOKEN.RIGHT_BRACKET,
        TOKEN.LITERAL
      );

      if (token.type === TOKEN.LEFT_BRACKET) args.push(this.expression());
      if (token.type === TOKEN.LITERAL)
        args.push(new Literal(token.literal as string));

      this.advance();
    }

    this.assert(this.peek(), TOKEN.RIGHT_BRACKET);

    return new Expression(new Operator(op_token.lexeme), args);
  };

  public run = () => this.expression();
}
