import type { ARG, TOK } from './enums';

export type Token = [TOK, string];
export type Operator = string;
export type Literal = unknown;
export type Expression = readonly [string, Argument[]];
export type Argument = readonly [ARG.LIT, Literal] | readonly [ARG.EXP, Expression];
export type Implementation<T = unknown> = (exec: Interpret<T>, ctx: T, args: Argument[]) => unknown;
export type Lookup<T> = Record<string, Implementation<T>>;
export type Interpret<T> = (exp: Argument, ctx: T) => unknown;
export type Assertion<T extends U, U = any> = (v: U) => asserts v is T;
