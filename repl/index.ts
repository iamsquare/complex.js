#!/usr/bin/env node
/**
 * REPL process for complex number operations.
 *
 * This is not part of the library.
 *
 * Usage examples:
 * - Complex numbers: 1+2i, 3-4i, 5i, 6, i, -i
 * - Functions: sin(1+2i), cos(i), exp(i*pi)
 * - Operations: 1+2i + 3+4i, sin(z) * cos(z), (1+2i) / (3-4i)
 * - Power: 2^3, (1+i)^2
 */

import * as readline from 'node:readline';

import chalk from 'chalk-template';

import { Evaluator } from './evaluator';
import { Parser } from './parser';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: chalk`{cyan > }`,
});

const evaluator = new Evaluator();

console.log(chalk`{bold.blue Complex.js REPL}`);
console.log(chalk`{gray Enter complex number expressions to evaluate.}`);
console.log(chalk`{yellow Examples:}`);
console.log(chalk`{gray   1+2i}`);
console.log(chalk`{gray   sin(1+2i)}`);
console.log(chalk`{gray   (1+2i) * (3-4i)}`);
console.log(chalk`{gray   exp(i)}`);
console.log(chalk`{gray Type ".exit" or ".quit" to exit, ".help" for more info, ".clear" to clear screen.\n}`);

rl.prompt();

rl.on('line', (input: string) => {
  const trimmed = input.trim();

  if (trimmed === '') {
    return rl.prompt();
  }

  if (trimmed === '.exit' || trimmed === '.quit') {
    return rl.close();
  }

  if (trimmed === '.help') {
    console.log(chalk`{bold \nComplex Number REPL Help:}`);
    console.log(chalk`{gray ========================}`);
    console.log(chalk`{bold \nComplex Numbers:}`);
    console.log(chalk`{gray   - Real: 5, -3, 1.5}`);
    console.log(chalk`{gray   - Imaginary: i, 2i, -3i}`);
    console.log(chalk`{gray   - Complex: 1+2i, 3-4i, -1+i, 2-i}`);
    console.log(chalk`{bold \nFunctions:}`);
    console.log(chalk`{gray   - Trigonometric: sin, cos, tan, cot, sec, csc}`);
    console.log(chalk`{gray   - Inverse trig: asin, acos, atan, acot, asec, acsc}`);
    console.log(chalk`{gray   - Hyperbolic: sinh, cosh, tanh, coth, sech, csch}`);
    console.log(chalk`{gray   - Inverse hyp: asinh, acosh, atanh, acoth, asech, acsch}`);
    console.log(chalk`{gray   - Other: exp, log, sqrt, inverse, principal(z, n)}`);
    console.log(chalk`{bold \nOperations:}`);
    console.log(chalk`{gray   - Addition: + (use spaces: 1+2i + 3+4i)}`);
    console.log(chalk`{gray   - Subtraction: - (use spaces: 1+2i - 3+4i)}`);
    console.log(chalk`{gray   - Multiplication: * (1+2i * 3+4i)}`);
    console.log(chalk`{gray   - Division: / (1+2i / 3+4i)}`);
    console.log(chalk`{gray   - Power: ^ (2^3, (1+i)^2)}`);
    console.log(chalk`{bold \nCommands:}`);
    console.log(chalk`{gray   - .help: Show this help message}`);
    console.log(chalk`{gray   - clear: Clear the screen}`);
    console.log(chalk`{gray   - exit/quit: Exit the REPL}`);
    console.log(chalk`{bold \nExamples:}`);
    console.log(chalk`{yellow   sin(1+2i)}`);
    console.log(chalk`{yellow   exp(i)}`);
    console.log(chalk`{yellow   (1+2i) * (3-4i)}`);
    console.log(chalk`{yellow   sqrt(-1)}`);
    console.log(chalk`{yellow   log(1+i)}`);
    console.log(chalk`{yellow   (1+i)^2}`);
    console.log(chalk`{yellow   principal(8, 3)}\n`);

    return rl.prompt();
  }

  if (trimmed === '.clear') {
    process.stdout.write('\x1B[2J\x1B[0f');

    return rl.prompt();
  }

  try {
    const parser = new Parser(trimmed);
    const ast = parser.parse();
    const result = evaluator.evaluate(ast);

    console.log(chalk`{green   => ${result.toString()}}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(chalk`{red   => Error: ${error.message}}`);
    } else {
      console.error(chalk`{red   => Error: ${String(error)}}`);
    }
  }

  return rl.prompt();
});

rl.on('close', () => {
  process.exit(0);
});
