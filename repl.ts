import { Temil, Implementation } from './lib/index';

const str: Implementation = (exec, ctx, args) => {
	if (args.length !== 1) throw new Error();
	return String(exec(args[0], ctx));
};

const num: Implementation = (exec, ctx, args) => {
	if (args.length !== 1) throw new Error();
	return Number(exec(args[0], ctx));
};

const add: Implementation = (exec, ctx, args) => {
	if (args.length !== 2) throw new Error();
	const a = exec(args[0], ctx);
	const b = exec(args[1], ctx);
	if (typeof a !== 'number') throw new Error();
	if (typeof b !== 'number') throw new Error();
	return a + b;
};

const ip = new Temil(
	{
		str,
		num,
		add,
	},
	[
		[/^true$/, () => true],
		[/^false$/, () => false],
		[/^-?\d+$/, (v) => new Number(v).valueOf()],
	],
);

console.write('>');
for await (const line of console) console.write(String(ip.eval(line, null)), '\n>');
