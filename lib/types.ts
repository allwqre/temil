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
export type Literal = unknown;
export type Expression = readonly [LookupIndex, Argument[]];
export type Argument = readonly [ARG.LIT, Literal] | readonly [ARG.EXP, Expression];
export type Implementation<T = unknown> = (exec: Interpret<T>, ctx: T, args: Argument[]) => unknown;
export type LookupIndex = number;
export type ImplementationObject<T> = Record<string, Implementation<T>>;
export type TranslationTable = Record<string, LookupIndex>;
export type LookupTable<T> = Implementation<T>[];
export type Interpret<T> = (exp: Argument, ctx: T) => unknown;
export type Assertion<T extends U, U = any> = (v: U) => asserts v is T;
