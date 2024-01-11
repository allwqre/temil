export class UnexpectedEndOfStringError {
	public readonly name = 'UnexpectedEndOfStringError';
}

export class UnexpectedEndOfExpressionError {
	public readonly name = 'UnexpectedEndOfExpressionError';
}

export class UnknownOperatorError {
	public readonly name = 'UnknownOperatorError';
	constructor(public readonly value: string) {}
}

export class UnreachableError {
	public readonly name = 'UnreachableError';
}
