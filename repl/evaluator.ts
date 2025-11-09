/**
 * Evaluator for complex number expressions.
 * Evaluates AST nodes to Complex numbers.
 */

import {
  acos,
  acosh,
  acot,
  acoth,
  acsc,
  acsch,
  add,
  asec,
  asech,
  asin,
  asinh,
  atan,
  atanh,
  Complex,
  cos,
  cosh,
  cot,
  coth,
  csc,
  csch,
  divide,
  exp,
  inverse,
  log,
  multiply,
  negate,
  pow,
  sec,
  sech,
  sin,
  sinh,
  sqrt,
  subtract,
  tan,
  tanh,
} from '@iamsquare/complex.js';

import type { ASTNode } from './parser';

// Map of constant names to their Complex values
const CONSTANT_MAP: Record<string, Complex> = {
  pi: new Complex(Math.PI, 0), // Pi
  e: new Complex(Math.E, 0), // Euler's number
};

// Map of function names to their implementations
const FUNCTION_MAP: Record<string, (z: Complex) => Complex> = {
  // Trigonometric
  sin,
  cos,
  tan,
  cot,
  sec,
  csc,
  // Inverse trigonometric
  asin,
  acos,
  atan,
  acot,
  asec,
  acsc,
  // Hyperbolic
  sinh,
  cosh,
  tanh,
  coth,
  sech,
  csch,
  // Inverse hyperbolic
  asinh,
  acosh,
  atanh,
  acoth,
  asech,
  acsch,
  // Other functions
  exp,
  log,
  sqrt,
  inverse,
};

export class Evaluator {
  private variables: Map<string, Complex> = new Map();

  evaluate(node: ASTNode): Complex {
    switch (node.type) {
      case 'complex':
        return new Complex(node.re, node.im);

      case 'constant': {
        const value = CONSTANT_MAP[node.name];

        if (value === undefined) {
          throw new Error(`Unknown constant: ${node.name}`);
        }

        return value;
      }

      case 'variable': {
        const value = this.variables.get(node.name);

        if (value === undefined) {
          throw new Error(`Undefined variable: ${node.name}`);
        }

        return value;
      }

      case 'assignment': {
        if (CONSTANT_MAP[node.name] !== undefined) {
          throw new Error(`Cannot assign to constant: ${node.name}`);
        }

        const value = this.evaluate(node.value);

        this.variables.set(node.name, value);

        return value;
      }

      case 'function': {
        const func = FUNCTION_MAP[node.name];

        if (func === undefined) {
          throw new Error(`Unknown function: ${node.name}`);
        }

        return func(this.evaluate(node.arg));
      }

      case 'binary': {
        const left = this.evaluate(node.left);
        const right = this.evaluate(node.right);

        if (node.op === '+') return add(left, right);
        if (node.op === '-') return subtract(left, right);
        if (node.op === '*') return multiply(left, right);
        if (node.op === '/') return divide(left, right);
        if (node.op === '^') return pow(left, right);

        const _exhaustive: never = node.op;
        throw new Error(`Unknown binary operator: ${_exhaustive}`);
      }

      case 'unary': {
        const operand = this.evaluate(node.operand);
        if (node.op === '-') return negate(operand);
        if (node.op === '+') return operand;

        throw new Error(`Unknown unary operator: ${node.op}`);
      }

      case 'group':
        return this.evaluate(node.expr);

      default: {
        const _exhaustive: never = node;
        throw new Error(`Unknown node type: ${(_exhaustive as { type: string }).type}`);
      }
    }
  }
}
