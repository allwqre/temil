# Temil
(**t**ree-evaluated **e**xpression, **m**inimally **i**nterpreted **l**anguage)

Temil is a small interpreted and purely expression based programming language. 

## Introduction
The main idea is to give controlled acess to execution functionality. 

In concept, Temil is just a definition of how to structure expressions, everything else is up to you. Although, for convenience, a lexer, a parser and the entrypoint for execution is provided.

## EBNF
```ebnf
operator = STRING ;
literal = "'", STRING, "'" ;
expression = "(", ( operator, { expression | literal } ), ")" ;
```

## Expressions
Expressions are Temils way of execution. Everything in Temil is an expression composed of an operator and a list of arguments, which may either be expressions or literals.

## Literals
Literals are a way of giving temil a "literal" value to work with. Everything written in between single quotation marks is considered top be a literal. By default temil knows what literals are, but does not know what to do with them. For that you'll need operators.

## Operators
Operators define the execution of your Temil Interpreter. By default there are no operators, so you'll have to write your own.

## Example
For this example we have two operators defined:

- `and` is an operator that takes two expressions, evaluates them, expects the evaluated values to be numbers and then adds them together.
- `num` is an operator that parses a temil literal and turns it into the host languages representation of a number.

```
(add (num '1') (num '2'))
```

The result of this expression is the number 3 in the host languages representation of a number.