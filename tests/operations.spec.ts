import { describe, expect, test } from 'vitest';

import { Complex } from '~/complex';
import {
  add,
  argument,
  conjugate,
  divide,
  equals,
  isInfinite,
  isNaNC,
  isPureImaginary,
  isReal,
  isZero,
  modulus,
  multiply,
  negate,
  notEquals,
  pythagoras,
  subtract,
  sum,
  unit,
} from '~/operations';

const ZERO = Complex.ZERO;
const ONE = Complex.ONE;
const I = Complex.I;
const INFINITY = Complex.INFINITY;
const NAN = Complex.NAN;

const labels = {
  NAN: 'Complex.NAN',
  INFINITY: 'Complex.INFINITY',
  ZERO: 'Complex.ZERO',
  ONE: 'Complex.ONE',
  I: 'Complex.I',
  z: 'z',
} as const;

const getLabel = (input: Complex): string => {
  if (isNaNC(input)) return labels.NAN;
  if (isInfinite(input)) return labels.INFINITY;
  if (equals(input, ZERO)) return labels.ZERO;
  if (equals(input, ONE)) return labels.ONE;
  if (equals(input, I)) return labels.I;
  return labels.z;
};

describe('Operators', () => {
  const z: Complex = new Complex(1, 1);
  const w: Complex = new Complex(2, 3);

  describe('Addition', () => {
    test('adds two complex numbers', () => {
      const result = add(z, w);

      expect(result.getRe()).toBe(3);
      expect(result.getIm()).toBe(4);
    });

    describe('Special Cases', () => {
      const testCases = [
        { a: INFINITY, b: INFINITY, expected: NAN },
        { a: z, b: INFINITY, expected: INFINITY },
        { a: NAN, b: NAN, expected: NAN },
        { a: z, b: NAN, expected: NAN },
      ];

      testCases.forEach(({ a, b, expected }) => {
        test(`add(${getLabel(a)}, ${getLabel(b)})`, () => {
          expect(add(a, b)).toEqual(expected);
        });
      });
    });
  });

  describe('Subtraction', () => {
    test('subtracts two complex numbers', () => {
      const result = subtract(z, w);

      expect(result.getRe()).toBe(-1);
      expect(result.getIm()).toBe(-2);
    });

    describe('Special Cases', () => {
      const testCases = [
        { a: INFINITY, b: INFINITY, expected: NAN },
        { a: z, b: INFINITY, expected: INFINITY },
        { a: NAN, b: NAN, expected: NAN },
        { a: z, b: NAN, expected: NAN },
      ];

      testCases.forEach(({ a, b, expected }) => {
        test(`subtract(${getLabel(a)}, ${getLabel(b)})`, () => {
          expect(subtract(a, b)).toEqual(expected);
        });
      });
    });
  });

  describe('Sum', () => {
    test('sums two complex numbers', () => {
      const result = sum(z, w);

      expect(result.getRe()).toBe(3);
      expect(result.getIm()).toBe(4);
    });

    test('sums multiple complex numbers', () => {
      const result = sum(z, w, z);

      expect(result.getRe()).toBe(4);
      expect(result.getIm()).toBe(5);
    });

    test('returns zero for no arguments', () => {
      expect(sum()).toEqual(ZERO);
    });

    test('returns the argument for single argument', () => {
      expect(sum(z)).toEqual(z);
    });

    test('sums with negated values to zero', () => {
      expect(sum(z, negate(z))).toEqual(ZERO);
    });

    test('sums multiple numbers with negated values to zero', () => {
      expect(sum(z, w, negate(z), negate(w))).toEqual(ZERO);
    });

    describe('Special Cases', () => {
      test('handles Infinity', () => {
        const testCases = [
          { args: [INFINITY, INFINITY], expected: INFINITY },
          { args: [z, INFINITY], expected: INFINITY },
          { args: [z, w, INFINITY], expected: INFINITY },
        ];

        testCases.forEach(({ args, expected }) => {
          expect(sum(...args)).toEqual(expected);
        });
      });

      test('handles NaN', () => {
        const testCases = [
          { args: [NAN, NAN], expected: NAN },
          { args: [z, NAN], expected: NAN },
          { args: [z, w, NAN], expected: NAN },
        ];

        testCases.forEach(({ args, expected }) => {
          expect(sum(...args)).toEqual(expected);
        });
      });

      test('NaN takes precedence over Infinity', () => {
        expect(sum(NAN, INFINITY)).toEqual(NAN);
      });
    });
  });

  describe('Multiplication', () => {
    test('multiplies two complex numbers', () => {
      const result = multiply(z, w);

      expect(result.getRe()).toBe(-1);
      expect(result.getIm()).toBe(5);
    });

    test('multiplies complex number by scalar', () => {
      const result = multiply(z, 2);

      expect(result.getRe()).toBe(2);
      expect(result.getIm()).toBe(2);
    });

    describe('Special Cases', () => {
      const testCases = [
        { a: INFINITY, b: INFINITY, expected: INFINITY },
        { a: z, b: INFINITY, expected: INFINITY },
        { a: NAN, b: NAN, expected: NAN },
        { a: z, b: NAN, expected: NAN },
      ];

      testCases.forEach(({ a, b, expected }) => {
        test(`multiply(${getLabel(a)}, ${getLabel(b)})`, () => {
          expect(multiply(a, b)).toEqual(expected);
        });
      });
    });
  });

  describe('Division', () => {
    test('divides two complex numbers', () => {
      const result = divide(z, w);

      expect(result.getRe()).toBeCloseTo(5 / 13, 15);
      expect(result.getIm()).toBeCloseTo(-1 / 13, 15);
    });

    test('divides complex number by scalar', () => {
      const result = divide(z, 2);

      expect(result.getRe()).toBe(0.5);
      expect(result.getIm()).toBe(0.5);
    });

    describe('Special Cases', () => {
      const testCases = [
        { a: INFINITY, b: INFINITY, expected: NAN },
        { a: z, b: INFINITY, expected: ZERO },
        { a: NAN, b: NAN, expected: NAN },
        { a: z, b: NAN, expected: NAN },
      ];

      testCases.forEach(({ a, b, expected }) => {
        test(`divide(${getLabel(a)}, ${getLabel(b)})`, () => {
          expect(divide(a, b)).toEqual(expected);
        });
      });
    });

    describe("Extended Mc'Larlen's difficult division test", () => {
      const SAFE_LARGE_CONSTANT = Math.pow(2, 30);

      const testCases = [
        { k: 0, complex: new Complex(1, 0) },
        { k: 1, complex: new Complex(1.5, -0.5) },
        { k: 26, complex: new Complex(33554432.5, -33554431.5) },
        { k: 27, complex: new Complex(67108864.5, -67108863.5) },
      ];

      testCases.forEach(({ k, complex }) => {
        test(`k=2^${k}, expected=(${complex.getRe()}, ${complex.getIm()})`, () => {
          const power = Math.pow(2, k);
          const g = SAFE_LARGE_CONSTANT / power;

          const x = new Complex(power, 1);
          const y = new Complex(1, 1);

          const xScaled = multiply(x, g);
          const yScaled = multiply(y, g);

          const result = divide(xScaled, yScaled);

          expect(equals(result, complex)).toBe(true);
        });
      });
    });
  });

  describe('Negation', () => {
    test('negates complex number', () => {
      const result = negate(z);

      expect(result.getRe()).toBe(-1);
      expect(result.getIm()).toBe(-1);
    });

    describe('Special Cases', () => {
      const testCases = [
        { input: INFINITY, expected: INFINITY },
        { input: NAN, expected: NAN },
      ];

      testCases.forEach(({ input, expected }) => {
        test(`negate(${getLabel(input)})`, () => {
          expect(negate(input)).toEqual(expected);
        });
      });
    });
  });

  describe('Conjugate', () => {
    test('returns conjugate of complex number', () => {
      const result = conjugate(z);

      expect(result.getRe()).toBe(z.getRe());
      expect(result.getIm()).toBe(-z.getIm());
    });

    describe('Special Cases', () => {
      const testCases = [
        { input: INFINITY, expected: INFINITY },
        { input: NAN, expected: NAN },
        { input: ZERO, expected: ZERO },
      ];

      testCases.forEach(({ input, expected }) => {
        test(`conjugate(${getLabel(input)})`, () => {
          expect(conjugate(input)).toEqual(expected);
        });
      });
    });
  });

  describe('Equality', () => {
    test('equals returns true for equal numbers', () => {
      expect(equals(z, z)).toBe(true);
    });

    test('equals returns false for different numbers', () => {
      expect(equals(z, w)).toBe(false);
    });

    test('notEquals returns false for equal numbers', () => {
      expect(notEquals(z, z)).toBe(false);
    });

    test('notEquals returns true for different numbers', () => {
      expect(notEquals(z, w)).toBe(true);
    });

    describe('Special Cases', () => {
      test('handles Infinity', () => {
        expect(equals(INFINITY, INFINITY)).toBe(true);
        expect(notEquals(INFINITY, INFINITY)).toBe(false);
      });

      test('handles NaN', () => {
        expect(equals(NAN, NAN)).toBe(false);
        expect(notEquals(NAN, NAN)).toBe(true);
      });
    });
  });

  describe('Modulus', () => {
    test('returns modulus of complex number', () => {
      const testCases = [
        { z, expected: Math.SQRT2 },
        { z: w, expected: Math.sqrt(13) },
      ];

      testCases.forEach(({ z: input, expected }) => {
        expect(modulus(input)).toBeCloseTo(expected, 15);
      });
    });

    describe('Special Cases', () => {
      const testCases = [
        { input: INFINITY, expected: Infinity },
        { input: NAN, expected: NaN },
      ];

      testCases.forEach(({ input, expected }) => {
        test(`modulus(${getLabel(input)})`, () => {
          expect(modulus(input)).toBe(expected);
        });
      });
    });
  });

  describe('Argument', () => {
    test('returns argument of complex number', () => {
      expect(argument(z)).toBeCloseTo(Math.PI / 4, 15);
      expect(argument(w)).toBeCloseTo(Math.atan2(w.getIm(), w.getRe()), 15);
    });

    describe('Special Cases', () => {
      const testCases = [
        { input: INFINITY, expected: Infinity },
        { input: NAN, expected: NaN },
      ];

      testCases.forEach(({ input, expected }) => {
        test(`argument(${getLabel(input)})`, () => {
          expect(argument(input)).toBe(expected);
        });
      });
    });
  });

  describe('Unit', () => {
    test('returns unit vector of complex number', () => {
      const zu = unit(z);
      const wu = unit(w);

      expect(zu.getRe()).toBeCloseTo(Math.SQRT1_2, 15);
      expect(zu.getIm()).toBeCloseTo(Math.SQRT1_2, 15);
      expect(wu.getRe()).toBeCloseTo(2 / Math.sqrt(13), 15);
      expect(wu.getIm()).toBeCloseTo(3 / Math.sqrt(13), 15);
    });

    describe('Special Cases', () => {
      const testCases = [
        { input: ZERO, expected: NAN },
        { input: INFINITY, expected: INFINITY },
        { input: NAN, expected: NAN },
      ];

      testCases.forEach(({ input, expected }) => {
        test(`unit(${getLabel(input)})`, () => {
          expect(unit(input)).toEqual(expected);
        });
      });
    });
  });

  describe('Pythagoras', () => {
    test('returns sum of squares', () => {
      const testCases = [
        { z, expected: 2 },
        { z: w, expected: 13 },
      ];

      testCases.forEach(({ z: input, expected }) => {
        expect(pythagoras(input)).toBe(expected);
      });
    });

    describe('Special Cases', () => {
      const testCases = [
        { input: INFINITY, expected: Infinity },
        { input: NAN, expected: NaN },
      ];

      testCases.forEach(({ input, expected }) => {
        test(`pythagoras(${getLabel(input)})`, () => {
          expect(pythagoras(input)).toBe(expected);
        });
      });
    });
  });

  describe('Type Checking', () => {
    describe('isReal', () => {
      const testCases = [
        { input: z, expected: false },
        { input: ZERO, expected: true },
        { input: ONE, expected: true },
        { input: I, expected: false },
        { input: INFINITY, expected: false },
        { input: NAN, expected: false },
      ];

      testCases.forEach(({ input, expected }) => {
        test(`isReal(${getLabel(input)})`, () => {
          expect(isReal(input)).toBe(expected);
        });
      });
    });

    describe('isPureImaginary', () => {
      const testCases = [
        { input: z, expected: false },
        { input: ZERO, expected: false },
        { input: ONE, expected: false },
        { input: I, expected: true },
        { input: INFINITY, expected: false },
        { input: NAN, expected: false },
      ];

      testCases.forEach(({ input, expected }) => {
        test(`isPureImaginary(${getLabel(input)})`, () => {
          expect(isPureImaginary(input)).toBe(expected);
        });
      });
    });

    describe('isZero', () => {
      const testCases = [
        { input: z, expected: false },
        { input: ZERO, expected: true },
        { input: ONE, expected: false },
        { input: I, expected: false },
        { input: INFINITY, expected: false },
        { input: NAN, expected: false },
      ];

      testCases.forEach(({ input, expected }) => {
        test(`isZero(${getLabel(input)})`, () => {
          expect(isZero(input)).toBe(expected);
        });
      });
    });

    describe('isInfinite', () => {
      const testCases = [
        { input: z, expected: false },
        { input: ZERO, expected: false },
        { input: ONE, expected: false },
        { input: I, expected: false },
        { input: INFINITY, expected: true },
        { input: NAN, expected: false },
      ];

      testCases.forEach(({ input, expected }) => {
        test(`isInfinite(${getLabel(input)})`, () => {
          expect(isInfinite(input)).toBe(expected);
        });
      });
    });

    describe('isNaNC', () => {
      const testCases = [
        { input: z, expected: false },
        { input: ZERO, expected: false },
        { input: ONE, expected: false },
        { input: I, expected: false },
        { input: INFINITY, expected: false },
        { input: NAN, expected: true },
      ];

      testCases.forEach(({ input, expected }) => {
        test(`isNaNC(${getLabel(input)})`, () => {
          expect(isNaNC(input)).toBe(expected);
        });
      });
    });
  });
});
