import readline from "node:readline/promises";
import { OperatorImpl } from "./OperatorImpl.js";
import {
  AssertionError,
  assert_args,
  assert_args_greater,
  assert_expression,
  assert_literal,
} from "./Assert.js";
import { Temil } from "./Temil.js";
import { Expression } from "./Expression.js";
import { Literal } from "./Literal.js";

const inq = readline.createInterface(process.stdin, process.stdout);

const type_num: OperatorImpl = async (exec, ...args) => {
  assert_args(args, 1, "num");

  const arg = args[0];
  if (arg instanceof Expression) return Number(await exec(arg)).valueOf();
  if (arg instanceof Literal) return Number(arg.value).valueOf();

  throw new AssertionError("num");
};

const assert_num: (value: unknown, scope: string) => asserts value is number = (
  value,
  scope
) => {
  if (typeof value !== "number")
    throw new AssertionError(scope, `Expected ${value} to be type of number.`);
};

const type_str: OperatorImpl = async (exec, ...args) => {
  assert_args(args, 1, "str");

  const arg = args[0];
  if (arg instanceof Expression) return String(await exec(arg)).valueOf();
  if (arg instanceof Literal) return String(arg.value).valueOf();

  throw new AssertionError("str");
};

const assert_str: (value: unknown, scope: string) => asserts value is string = (
  value,
  scope
) => {
  if (typeof value !== "string")
    throw new AssertionError(scope, `Expected ${value} to be type of string.`);
};

const math_add: OperatorImpl = async (exec, ...args) => {
  assert_args(args, 2, "+");

  const [a, b] = args;
  assert_expression(a, "+");
  assert_expression(b, "+");
  const result_a = await exec(a);
  const result_b = await exec(b);
  assert_num(result_a, "+");
  assert_num(result_b, "+");

  return result_a + result_b;
};

const math_sub: OperatorImpl = async (exec, ...args) => {
  assert_args(args, 2, "-");

  const [a, b] = args;
  assert_expression(a, "-");
  assert_expression(b, "-");
  const result_a = await exec(a);
  const result_b = await exec(b);
  assert_num(result_a, "-");
  assert_num(result_b, "-");

  return result_a - result_b;
};

const pipe: OperatorImpl = async (exec, ...args) => {
  assert_args_greater(args, 0, "|");

  const transformed = args.reduce((acc, cur) => {
    assert_expression(cur, "|");
    cur.args.push(acc);
    return cur;
  }) as Expression;

  return await exec(transformed);
};

const op_lookup = {
  "|": pipe,
  num: type_num,
  str: type_str,
  "+": math_add,
  "-": math_sub,
};

for (;;) {
  const input = await inq.question("> ");

  try {
    const result = await new Temil(input, op_lookup).run();
    console.log(result);
  } catch (e) {
    console.error(e);
  }
}
