export enum TOKEN {
  LEFT_BRACKET,
  RIGHT_BRACKET,

  IDENTIFIER,
  LITERAL
}

export const IDENTIFIER_TOKEN_LOOKUP = {
  a: "a",
  b: "b",
  c: "c",
  d: "d",
  e: "e",
  f: "f",
  g: "g",
  h: "h",
  i: "i",
  j: "j",
  k: "k",
  l: "l",
  m: "m",
  n: "n",
  o: "o",
  p: "p",
  q: "q",
  r: "r",
  s: "s",
  t: "t",
  u: "u",
  v: "v",
  w: "w",
  x: "x",
  y: "y",
  z: "z",
  _: "_",
  ":": ":",
} as const;

export class Token {
  constructor(
    public readonly type: TOKEN,
    public readonly lexeme: string,
    public readonly literal: string | number | boolean | null | undefined
  ) {}
}
