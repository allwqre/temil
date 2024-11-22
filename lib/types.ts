import type { ARG, TOK } from './enums';

export type Token = readonly [TOK, string];
export type Operator = string;
export type Literal = unknown;
export type Argument = readonly [ARG.LIT, Literal] | readonly [ARG.EXP, Operator, Argument[]];
export type Implementation<T = unknown> = (exec: Interpret<T>, ctx: T, args: Argument[]) => unknown;
export type Lookup<T> = Record<string, Implementation<T>>;
export type Extension = readonly [RegExp, (token: string) => unknown];
export type Interpret<T> = (exp: Argument, ctx: T) => unknown;
