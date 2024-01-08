export enum TOK {
	L_PAR,
	R_PAR,
	STR,
}
export type Token = [TOK, string];

export type Operator = string;
export enum ARG {
	LIT,
	EXP,
}
export type Expression = readonly [Operator, Argument[]];
export type Argument = readonly [ARG.LIT, string] | readonly [ARG.EXP, Expression];
export type Implementation<T = unknown> = (exec: Exec<T>, ctx: T, args: Argument[]) => unknown;
export type Lookup<T> = Record<string, Implementation<T>>;
export type Exec<T> = (exp: Expression, ctx: T) => unknown;

export type Assertion<T extends U, U = any> = (v: U) => asserts v is T;
