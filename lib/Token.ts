export enum TOKEN {
  LEFT_BRACKET,
  RIGHT_BRACKET,

  IDENTIFIER,
  LITERAL
}

export class Token {
  constructor(
    public readonly type: TOKEN,
    public readonly lexeme: string,
    public readonly literal: string | number | boolean | null | undefined
  ) {}
}
