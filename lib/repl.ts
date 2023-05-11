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

const inq = readline.createInterface(process.stdin, process.stdout);

const type_num: OperatorImpl = (_, ...args) => {
  assert_args(args, 1, "num");

  const literal = args[0];
  assert_literal(literal, "num");

  return Number(literal.value).valueOf();
};

const math_add: OperatorImpl = async (exec, ...args) => {
  assert_args(args, 2, "+");

  const [a, b] = args;
  assert_expression(a, "+");
  assert_expression(b, "+");
  const result_a = await exec(a);
  const result_b = await exec(b);
  if (typeof result_a !== "number")
    throw new AssertionError(
      "+",
      `Expected first argument to resolve to type number.`
    );
  if (typeof result_b !== "number")
    throw new AssertionError(
      "+",
      `Expected first argument to resolve to type number.`
    );

  return result_a + result_b;
};

const math_sub: OperatorImpl = async (exec, ...args) => {
  assert_args(args, 2, "-");

  const [a, b] = args;
  assert_expression(a, "-");
  assert_expression(b, "-");
  const result_a = await exec(a);
  const result_b = await exec(b);
  if (typeof result_a !== "number")
    throw new AssertionError(
      "-",
      `Expected first argument to resolve to type number.`
    );
  if (typeof result_b !== "number")
    throw new AssertionError(
      "-",
      `Expected first argument to resolve to type number.`
    );

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
