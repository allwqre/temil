import { Temil, Implementation } from './lib/index';
import { is_expression } from './lib/utils';

const str: Implementation = (exec, ctx, args) => {
	if (args.length !== 1) throw new Error();
	if (is_expression(args[0])) return exec(args[0][1], ctx);
	return args[0][1];
};

const num: Implementation = (exec, ctx, args) => {
	if (args.length !== 1) throw new Error();
	if (is_expression(args[0])) return Number(exec(args[0][1], ctx));
	return Number(args[0][1]);
};

const add: Implementation = (exec, ctx, args) => {
	if (args.length !== 2) throw new Error();
	if (!is_expression(args[0])) throw new Error();
	if (!is_expression(args[1])) throw new Error();
	const a = exec(args[0][1], ctx);
	const b = exec(args[1][1], ctx);
	if (typeof a !== 'number') throw new Error();
	if (typeof b !== 'number') throw new Error();
	return a + b;
};

const ip = new Temil({
	str,
	num,
	add,
});

console.write('>');
for await (const line of console) console.write(String(ip.eval(line, null)), '\n>');
