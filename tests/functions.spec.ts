import { describe, expect, test } from 'vitest';

import { Complex } from '~/complex';
import {
  acos,
  acosh,
  acot,
  acoth,
  acsc,
  acsch,
  asec,
  asech,
  asin,
  asinh,
  atan,
  atanh,
  cos,
  cosh,
  cot,
  coth,
  csc,
  csch,
  exp,
  inverse,
  log,
  pow,
  principal,
  sec,
  sech,
  sin,
  sinh,
  sqrt,
  tan,
  tanh,
} from '~/functions';
import { multiply } from '~/operations';

const INFINITY = Complex.INFINITY;
const NAN = Complex.NAN;
const ZERO = Complex.ZERO;
const ONE = Complex.ONE;
const HALFPI = Complex.HALFPI;

describe('Functions', () => {
  const z = new Complex(1, 1);
  const w = new Complex(2, 3);

  describe('Square Root', () => {
    test('sqrt(z)', () => {
      expect(sqrt(z)).toBeComplexCloseTo(new Complex(1.0986841134678098, 0.45508986056222733));
      expect(sqrt(w)).toBeComplexCloseTo(new Complex(1.6741492280355401, 0.895977476129838));
    });

    describe('Special Cases', () => {
      const testCases = [
        { input: ZERO, expected: ZERO, name: 'Zero' },
        { input: INFINITY, expected: INFINITY, name: 'Infinity' },
        { input: NAN, expected: NAN, name: 'NaN' },
      ];

      testCases.forEach(({ input, expected, name }) => {
        test(name, () => {
          expect(sqrt(input)).toEqual(expected);
        });
      });
    });
  });

  describe('Principal Value (n-th Root)', () => {
    test('principal(z, n) for various n', () => {
      expect(principal(z, 2)).toBeComplexCloseTo(sqrt(z));
      expect(principal(w, 2)).toBeComplexCloseTo(sqrt(w));

      expect(principal(z, 3)).toBeComplexCloseTo(new Complex(1.0842150814913512, 0.2905145555072514));
      expect(principal(w, 3)).toBeComplexCloseTo(new Complex(1.451856618352664, 0.493403534104004));

      expect(principal(z, 4)).toBeComplexCloseTo(new Complex(1.0695539323639858, 0.21274750472674303));
      expect(principal(w, 4)).toBeComplexCloseTo(new Complex(1.3365960777571289, 0.33517136966065714));

      expect(principal(z, 5)).toBeComplexCloseTo(new Complex(1.0585781527063765, 0.16766230825618095));
      expect(principal(w, 5)).toBeComplexCloseTo(new Complex(1.2675064916851109, 0.252398387219317));
    });

    test('principal with real numbers', () => {
      expect(principal(8, 3)).toBeComplexCloseTo(new Complex(2, 0));
      expect(principal(16, 4)).toBeComplexCloseTo(new Complex(2, 0));
      expect(principal(-1, 2)).toBeComplexCloseTo(new Complex(0, 1));
      expect(principal(-8, 3)).toBeComplexCloseTo(new Complex(1, Math.sqrt(3)));
      expect(principal(27, 3)).toBeComplexCloseTo(new Complex(3, 0));
    });

    test('principal(z, 1) returns z', () => {
      expect(principal(z, 1)).toBeComplexCloseTo(z);
      expect(principal(w, 1)).toBeComplexCloseTo(w);
      expect(principal(5, 1)).toBeComplexCloseTo(new Complex(5, 0));
    });

    test('principal with negative n (reciprocal root)', () => {
      expect(multiply(principal(z, 2), principal(z, -2))).toBeComplexCloseTo(ONE);
      expect(multiply(principal(w, 3), principal(w, -3))).toBeComplexCloseTo(ONE);
    });

    test('Verification: (principal(z, n))^n ≈ z', () => {
      expect(pow(principal(z, 2), 2)).toBeComplexCloseTo(z);
      expect(pow(principal(z, 3), 3)).toBeComplexCloseTo(z);
      expect(pow(principal(w, 4), 4)).toBeComplexCloseTo(w);
      expect(pow(principal(w, 5), 5)).toBeComplexCloseTo(w);
    });

    describe('Special Cases', () => {
      test('Zero input', () => {
        expect(principal(ZERO, 2)).toEqual(ZERO);
        expect(principal(ZERO, 3)).toEqual(ZERO);
        expect(principal(ZERO, -2)).toEqual(INFINITY);
        expect(principal(ZERO, 0)).toEqual(NAN);
      });

      test('Infinity input', () => {
        expect(principal(INFINITY, 2)).toEqual(INFINITY);
        expect(principal(INFINITY, 3)).toEqual(INFINITY);
        expect(principal(INFINITY, -2)).toEqual(ZERO);
        expect(principal(INFINITY, 0)).toEqual(NAN);
      });

      test('NaN input', () => {
        expect(principal(NAN, 2)).toEqual(NAN);
        expect(principal(NAN, 3)).toEqual(NAN);
        expect(principal(NAN, -2)).toEqual(NAN);
      });

      test('Invalid n values', () => {
        expect(principal(z, 0)).toEqual(NAN);
        expect(principal(z, NaN)).toEqual(NAN);
        expect(principal(z, Infinity)).toEqual(NAN);
        expect(principal(z, -Infinity)).toEqual(NAN);
      });

      test('Number input with special cases', () => {
        expect(principal(0, 2)).toEqual(ZERO);
        expect(principal(0, -2)).toEqual(INFINITY);
        expect(principal(Infinity, 2)).toEqual(INFINITY);
        expect(principal(Infinity, -2)).toEqual(ZERO);
      });
    });
  });

  describe('Logarithm', () => {
    test('log(z)', () => {
      expect(log(z)).toBeComplexCloseTo(new Complex(0.3465735902799727, 0.7853981633974483));
      expect(log(w)).toBeComplexCloseTo(new Complex(1.2824746787307684, 0.982793723247329));
    });

    describe('Special Cases', () => {
      const testCases = [
        { input: ZERO, expected: NAN, name: 'Zero' },
        { input: ONE, expected: ZERO, name: 'One' },
        { input: INFINITY, expected: INFINITY, name: 'Infinity' },
        { input: NAN, expected: NAN, name: 'NaN' },
      ];

      testCases.forEach(({ input, expected, name }) => {
        test(name, () => {
          expect(log(input)).toEqual(expected);
        });
      });
    });
  });

  describe('Exponential', () => {
    test('exp(z)', () => {
      expect(exp(z)).toBeComplexCloseTo(new Complex(1.4686939399158851, 2.2873552871788423));
      expect(exp(w)).toBeComplexCloseTo(new Complex(-7.315110094901103, 1.0427436562359045));
    });

    describe('Special Cases', () => {
      const testCases = [
        { input: ZERO, expected: ONE, name: 'Zero' },
        { input: INFINITY, expected: NAN, name: 'Infinity' },
        { input: NAN, expected: NAN, name: 'NaN' },
      ];

      testCases.forEach(({ input, expected, name }) => {
        test(name, () => {
          expect(exp(input)).toEqual(expected);
        });
      });
    });
  });

  describe('Exponentiation', () => {
    test('z^w', () => {
      expect(pow(z, w)).toBeComplexCloseTo(new Complex(-0.163450932107355, 0.09600498360894891));
      expect(pow(z, 3)).toBeComplexCloseTo(new Complex(-2, 2));
      expect(pow(z, new Complex(0, 4))).toBeComplexCloseTo(new Complex(0.007927894711475971, 0.04248048042515222));
    });

    describe('Special Cases', () => {
      const testCases = [
        { base: ZERO, exponent: z, expected: ZERO, name: '0^z' },
        { base: z, exponent: ZERO, expected: ONE, name: 'z^0' },
        { base: ZERO, exponent: ZERO, expected: NAN, name: '0^0' },
        { base: INFINITY, exponent: ZERO, expected: NAN, name: '∞^0' },
        { base: ZERO, exponent: INFINITY, expected: ZERO, name: '0^∞' },
        { base: ONE, exponent: INFINITY, expected: NAN, name: '1^∞' },
        { base: INFINITY, exponent: INFINITY, expected: INFINITY, name: '∞^∞' },
        { base: z, exponent: INFINITY, expected: INFINITY, name: 'z^∞' },
      ];

      testCases.forEach(({ base, exponent, expected, name }) => {
        test(name, () => {
          expect(pow(base, exponent)).toEqual(expected);
        });
      });

      test('pow with number arguments', () => {
        expect(pow(2, 3)).toEqual(new Complex(8, 0));
        expect(pow(z, 2)).toEqual(new Complex(0, 2));
        expect(pow(2, z)).toBeComplexCloseTo(new Complex(1.5384778027279442, 1.2779225526272695));
      });
    });
  });

  describe('Inverse (Reciprocal)', () => {
    test('inverse(z)', () => {
      expect(inverse(z)).toBeComplexCloseTo(new Complex(0.5, -0.5));
      expect(inverse(w)).toBeComplexCloseTo(new Complex(0.153846153846154, -0.230769230769231));
    });

    describe('Special Cases', () => {
      const testCases = [
        { input: ZERO, expected: INFINITY, name: 'Zero' },
        { input: INFINITY, expected: ZERO, name: 'Infinity' },
        { input: NAN, expected: NAN, name: 'NaN' },
      ];

      testCases.forEach(({ input, expected, name }) => {
        test(name, () => {
          expect(inverse(input)).toEqual(expected);
        });
      });

      test('One', () => {
        expect(inverse(ONE)).toBeComplexCloseTo(ONE);
      });

      test('Verification: z * inverse(z) = 1', () => {
        expect(multiply(z, inverse(z))).toBeComplexCloseTo(ONE);
      });
    });
  });

  describe('Trigonometric Functions', () => {
    describe('sin', () => {
      test('sin(z)', () => {
        expect(sin(z)).toBeComplexCloseTo(new Complex(1.2984575814159773, 0.6349639147847361));
        expect(sin(w)).toBeComplexCloseTo(new Complex(9.15449914691143, -4.168906959966565));
      });

      describe('Special Cases', () => {
        const testCases = [
          { input: ZERO, expected: ZERO, name: 'Zero' },
          { input: INFINITY, expected: NAN, name: 'Infinity' },
          { input: NAN, expected: NAN, name: 'NaN' },
        ];

        testCases.forEach(({ input, expected, name }) => {
          test(name, () => {
            expect(sin(input)).toEqual(expected);
          });
        });
      });
    });

    describe('cos', () => {
      test('cos(z)', () => {
        expect(cos(z)).toBeComplexCloseTo(new Complex(0.8337300251311491, -0.9888977057628651));
        expect(cos(w)).toBeComplexCloseTo(new Complex(-4.189625690968807, -9.109227893755337));
      });

      describe('Special Cases', () => {
        const testCases = [
          { input: ZERO, expected: ONE, name: 'Zero' },
          { input: INFINITY, expected: NAN, name: 'Infinity' },
          { input: NAN, expected: NAN, name: 'NaN' },
        ];

        testCases.forEach(({ input, expected, name }) => {
          test(name, () => {
            expect(cos(input)).toEqual(expected);
          });
        });
      });
    });
    describe('tan', () => {
      test('tan(z)', () => {
        expect(tan(z)).toBeComplexCloseTo(new Complex(0.27175258531951174, 1.0839233273386948), 1e-14);
        expect(tan(w)).toBeComplexCloseTo(new Complex(-0.0037640256415042484, 1.0032386273536098), 1e-14);
      });

      describe('Special Cases', () => {
        const testCases = [
          { input: ZERO, expected: ZERO, name: 'Zero' },
          { input: INFINITY, expected: NAN, name: 'Infinity' },
          { input: NAN, expected: NAN, name: 'NaN' },
        ];

        testCases.forEach(({ input, expected, name }) => {
          test(name, () => {
            expect(tan(input)).toEqual(expected);
          });
        });
      });
    });

    describe('cot', () => {
      test('cot(z)', () => {
        expect(cot(z)).toBeComplexCloseTo(new Complex(0.2176215618544027, -0.868014142895925));
        expect(cot(w)).toBeComplexCloseTo(new Complex(-0.003739710376336956, -0.9967577965693583));
      });

      describe('Special Cases', () => {
        const testCases = [
          { input: ZERO, expected: INFINITY, name: 'Zero' },
          { input: INFINITY, expected: NAN, name: 'Infinity' },
          { input: NAN, expected: NAN, name: 'NaN' },
        ];

        testCases.forEach(({ input, expected, name }) => {
          test(name, () => {
            expect(cot(input)).toEqual(expected);
          });
        });
      });
    });

    describe('sec', () => {
      test('sec(z)', () => {
        expect(sec(z)).toBeComplexCloseTo(new Complex(0.49833703055518686, 0.5910838417210451));
        expect(sec(w)).toBeComplexCloseTo(new Complex(-0.04167496441114427, 0.0906111371962376));
      });

      describe('Special Cases', () => {
        const testCases = [
          { input: ZERO, expected: ONE, name: 'Zero' },
          { input: INFINITY, expected: NAN, name: 'Infinity' },
          { input: NAN, expected: NAN, name: 'NaN' },
        ];

        testCases.forEach(({ input, expected, name }) => {
          test(name, () => {
            expect(sec(input)).toEqual(expected);
          });
        });
      });
    });

    describe('csc', () => {
      test('csc(z)', () => {
        expect(csc(z)).toBeComplexCloseTo(new Complex(0.6215180171704285, -0.30393100162842646));
        expect(csc(w)).toBeComplexCloseTo(new Complex(0.09047320975320744, 0.04120098628857413));
      });

      describe('Special Cases', () => {
        const testCases = [
          { input: ZERO, expected: INFINITY, name: 'Zero' },
          { input: INFINITY, expected: NAN, name: 'Infinity' },
          { input: NAN, expected: NAN, name: 'NaN' },
        ];

        testCases.forEach(({ input, expected, name }) => {
          test(name, () => {
            expect(csc(input)).toEqual(expected);
          });
        });
      });
    });
  });

  describe('Inverse Trigonometric Functions', () => {
    describe('asin', () => {
      test('asin(z)', () => {
        expect(asin(z)).toBeComplexCloseTo(new Complex(0.6662394324925153, 1.0612750619050355));
        expect(asin(w)).toBeComplexCloseTo(new Complex(0.5706527843210972, 1.9833870299165328));
      });

      describe('Special Cases', () => {
        const testCases = [
          { input: ZERO, expected: ZERO, name: 'Zero' },
          { input: INFINITY, expected: NAN, name: 'Infinity' },
          { input: NAN, expected: NAN, name: 'NaN' },
        ];

        testCases.forEach(({ input, expected, name }) => {
          test(name, () => {
            expect(asin(input)).toEqual(expected);
          });
        });
      });
    });

    describe('acos', () => {
      test('acos(z)', () => {
        expect(acos(z)).toBeComplexCloseTo(new Complex(0.9045568943023813, -1.0612750619050355));
        expect(acos(w)).toBeComplexCloseTo(new Complex(1.0001435424737992, -1.9833870299165328));
      });

      describe('Special Cases', () => {
        const testCases = [
          { input: ZERO, expected: HALFPI, name: 'Zero' },
          { input: INFINITY, expected: NAN, name: 'Infinity' },
          { input: NAN, expected: NAN, name: 'NaN' },
        ];

        testCases.forEach(({ input, expected, name }) => {
          test(name, () => {
            expect(acos(input)).toEqual(expected);
          });
        });
      });
    });

    describe('atan', () => {
      test('atan(z)', () => {
        expect(atan(z)).toBeComplexCloseTo(new Complex(1.0172219678978514, 0.4023594781085251), 1e-14);
        expect(atan(w)).toBeComplexCloseTo(new Complex(1.4099210495965755, 0.2290726829685388), 1e-14);
      });

      describe('Special Cases', () => {
        const testCases = [
          { input: ZERO, expected: ZERO, name: 'Zero' },
          { input: INFINITY, expected: NAN, name: 'Infinity' },
          { input: NAN, expected: NAN, name: 'NaN' },
        ];

        testCases.forEach(({ input, expected, name }) => {
          test(name, () => {
            expect(atan(input)).toEqual(expected);
          });
        });
      });
    });

    describe('acot', () => {
      test('acot(z)', () => {
        expect(acot(z)).toBeComplexCloseTo(new Complex(0.5535743588970452, -0.4023594781085251));
        expect(acot(w)).toBeComplexCloseTo(new Complex(0.16087527719832106, -0.2290726829685388));
      });

      describe('Special Cases', () => {
        const testCases = [
          { input: ZERO, expected: HALFPI, name: 'Zero' },
          { input: INFINITY, expected: NAN, name: 'Infinity' },
          { input: NAN, expected: NAN, name: 'NaN' },
        ];

        testCases.forEach(({ input, expected, name }) => {
          test(name, () => {
            expect(acot(input)).toEqual(expected);
          });
        });
      });
    });

    describe('asec', () => {
      test('asec(z)', () => {
        expect(asec(z)).toBeComplexCloseTo(new Complex(1.1185178796437059, 0.5306375309525178));
        expect(asec(w)).toBeComplexCloseTo(new Complex(1.4204107224670346, 0.23133469857397318));
      });

      describe('Special Cases', () => {
        const testCases = [
          { input: INFINITY, expected: HALFPI, name: 'Infinity' },
          { input: NAN, expected: NAN, name: 'NaN' },
        ];

        testCases.forEach(({ input, expected, name }) => {
          test(name, () => {
            expect(asec(input)).toEqual(expected);
          });
        });
      });
    });

    describe('acsc', () => {
      test('acsc(z)', () => {
        expect(acsc(z)).toBeComplexCloseTo(new Complex(0.45227844715119064, -0.5306375309525178));
        expect(acsc(w)).toBeComplexCloseTo(new Complex(0.150385604327862, -0.23133469857397318));
      });

      describe('Special Cases', () => {
        const testCases = [
          { input: INFINITY, expected: ZERO, name: 'Infinity' },
          { input: NAN, expected: NAN, name: 'NaN' },
        ];

        testCases.forEach(({ input, expected, name }) => {
          test(name, () => {
            expect(acsc(input)).toEqual(expected);
          });
        });
      });
    });
  });

  describe('Hyperbolic', () => {
    describe('sinh', () => {
      test('sinh(z)', () => {
        expect(sinh(z)).toBeComplexCloseTo(new Complex(0.6349639147847361, 1.2984575814159773));
        expect(sinh(w)).toBeComplexCloseTo(new Complex(-3.59056458998578, 0.53092108624852));
      });

      describe('Special Cases', () => {
        const testCases = [
          { input: ZERO, expected: ZERO, name: 'Zero' },
          { input: INFINITY, expected: NAN, name: 'Infinity' },
          { input: NAN, expected: NAN, name: 'NaN' },
        ];

        testCases.forEach(({ input, expected, name }) => {
          test(name, () => {
            expect(sinh(input)).toEqual(expected);
          });
        });
      });
    });

    describe('cosh', () => {
      test('cosh(z)', () => {
        expect(cosh(z)).toBeComplexCloseTo(new Complex(0.8337300251311491, 0.9888977057628651));
        expect(cosh(w)).toBeComplexCloseTo(new Complex(-3.72454550491532, 0.511822569987384));
      });

      describe('Special Cases', () => {
        const testCases = [
          { input: ZERO, expected: ONE, name: 'Zero' },
          { input: INFINITY, expected: NAN, name: 'Infinity' },
          { input: NAN, expected: NAN, name: 'NaN' },
        ];

        testCases.forEach(({ input, expected, name }) => {
          test(name, () => {
            expect(cosh(input)).toEqual(expected);
          });
        });
      });
    });

    describe('tanh', () => {
      test('tanh(z)', () => {
        expect(tanh(z)).toBeComplexCloseTo(new Complex(1.0839233273386948, 0.27175258531951174), 1e-14);
        expect(tanh(w)).toBeComplexCloseTo(new Complex(0.965385879022133, -0.009884375038322), 1e-14);
      });

      describe('Special Cases', () => {
        const testCases = [
          { input: ZERO, expected: ZERO, name: 'Zero' },
          { input: INFINITY, expected: NAN, name: 'Infinity' },
          { input: NAN, expected: NAN, name: 'NaN' },
        ];

        testCases.forEach(({ input, expected, name }) => {
          test(name, () => {
            expect(tanh(input)).toEqual(expected);
          });
        });
      });
    });

    describe('coth', () => {
      test('coth(z)', () => {
        expect(coth(z)).toBeComplexCloseTo(new Complex(0.868014142895925, -0.2176215618544027));
        expect(coth(w)).toBeComplexCloseTo(new Complex(1.035746637764995, 0.010604783470337));
      });

      describe('Special Cases', () => {
        const testCases = [
          { input: ZERO, expected: INFINITY, name: 'Zero' },
          { input: INFINITY, expected: NAN, name: 'Infinity' },
          { input: NAN, expected: NAN, name: 'NaN' },
        ];

        testCases.forEach(({ input, expected, name }) => {
          test(name, () => {
            expect(coth(input)).toEqual(expected);
          });
        });
      });
    });

    describe('sech', () => {
      test('sech(z)', () => {
        expect(sech(z)).toBeComplexCloseTo(new Complex(0.49833703055518686, -0.5910838417210451));
        expect(sech(w)).toBeComplexCloseTo(new Complex(-0.263512975158389, -0.036211636558768));
      });

      describe('Special Cases', () => {
        const testCases = [
          { input: ZERO, expected: ONE, name: 'Zero' },
          { input: INFINITY, expected: NAN, name: 'Infinity' },
          { input: NAN, expected: NAN, name: 'NaN' },
        ];

        testCases.forEach(({ input, expected, name }) => {
          test(name, () => {
            expect(sech(input)).toEqual(expected);
          });
        });
      });
    });

    describe('csch', () => {
      test('csch(z)', () => {
        expect(csch(z)).toBeComplexCloseTo(new Complex(0.30393100162842646, -0.6215180171704285));
        expect(csch(w)).toBeComplexCloseTo(new Complex(-0.27254866146294, -0.040300578856891));
      });

      describe('Special Cases', () => {
        const testCases = [
          { input: ZERO, expected: INFINITY, name: 'Zero' },
          { input: INFINITY, expected: NAN, name: 'Infinity' },
          { input: NAN, expected: NAN, name: 'NaN' },
        ];

        testCases.forEach(({ input, expected, name }) => {
          test(name, () => {
            expect(csch(input)).toEqual(expected);
          });
        });
      });
    });
  });

  describe('Inverse Hyperbolic Functions', () => {
    describe('asinh', () => {
      test('asinh(z)', () => {
        expect(asinh(z)).toBeComplexCloseTo(new Complex(1.0612750619050357, 0.6662394324925153));
        expect(asinh(w)).toBeComplexCloseTo(new Complex(1.968637925793096, 0.964658504407603));
      });

      describe('Special Cases', () => {
        const testCases = [
          { input: ZERO, expected: ZERO, name: 'Zero' },
          { input: INFINITY, expected: NAN, name: 'Infinity' },
          { input: NAN, expected: NAN, name: 'NaN' },
        ];

        testCases.forEach(({ input, expected, name }) => {
          test(name, () => {
            expect(asinh(input)).toEqual(expected);
          });
        });
      });
    });

    describe('acosh', () => {
      test('acosh(z)', () => {
        expect(acosh(z)).toBeComplexCloseTo(new Complex(1.0612750619050355, 0.9045568943023813));
        expect(acosh(w)).toBeComplexCloseTo(new Complex(1.9833870299165328, 1.0001435424737992));
      });

      describe('Special Cases', () => {
        const testCases = [
          { input: ZERO, expected: new Complex(0, Math.PI / 2), name: 'Zero' },
          { input: INFINITY, expected: NAN, name: 'Infinity' },
          { input: NAN, expected: NAN, name: 'NaN' },
        ];

        testCases.forEach(({ input, expected, name }) => {
          test(name, () => {
            expect(acosh(input)).toEqual(expected);
          });
        });
      });
    });

    describe('atanh', () => {
      test('atanh(z)', () => {
        expect(atanh(z)).toBeComplexCloseTo(new Complex(0.4023594781085251, 1.0172219678978514), 1e-14);
        expect(atanh(w)).toBeComplexCloseTo(new Complex(0.146946666225529, 1.33897252229449), 1e-14);
      });

      describe('Special Cases', () => {
        const testCases = [
          { input: ZERO, expected: ZERO, name: 'Zero' },
          { input: INFINITY, expected: NAN, name: 'Infinity' },
          { input: NAN, expected: NAN, name: 'NaN' },
        ];

        testCases.forEach(({ input, expected, name }) => {
          test(name, () => {
            expect(atanh(input)).toEqual(expected);
          });
        });
      });
    });

    describe('acoth', () => {
      test('acoth(z)', () => {
        expect(acoth(z)).toBeComplexCloseTo(new Complex(0.4023594781085251, -0.5535743588970452));
        expect(acoth(w)).toBeComplexCloseTo(new Complex(0.146946666225529, -0.231823804500403));
      });

      describe('Special Cases', () => {
        const testCases = [
          { input: ZERO, expected: NAN, name: 'Zero' },
          { input: INFINITY, expected: ZERO, name: 'Infinity' },
          { input: NAN, expected: NAN, name: 'NaN' },
        ];

        testCases.forEach(({ input, expected, name }) => {
          test(name, () => {
            expect(acoth(input)).toEqual(expected);
          });
        });
      });
    });

    describe('asech', () => {
      test('asech(z)', () => {
        expect(asech(z)).toBeComplexCloseTo(new Complex(0.5306375309525178, -1.1185178796437059));
        expect(asech(w)).toBeComplexCloseTo(new Complex(0.23133469857397318, -1.4204107224670346));
      });

      describe('Special Cases', () => {
        const testCases = [
          { input: ZERO, expected: NAN, name: 'Zero' },
          { input: INFINITY, expected: new Complex(0, Math.PI / 2), name: 'Infinity' },
          { input: NAN, expected: NAN, name: 'NaN' },
        ];

        testCases.forEach(({ input, expected, name }) => {
          test(name, () => {
            expect(asech(input)).toEqual(expected);
          });
        });
      });
    });

    describe('acsch', () => {
      test('acsch(z)', () => {
        expect(acsch(z)).toBeComplexCloseTo(new Complex(0.5306375309525178, -0.45227844715119064));
        expect(acsch(w)).toBeComplexCloseTo(new Complex(0.157355498844985, -0.229962902377207));
      });

      describe('Special Cases', () => {
        const testCases = [
          { input: ZERO, expected: NAN, name: 'Zero' },
          { input: INFINITY, expected: ZERO, name: 'Infinity' },
          { input: NAN, expected: NAN, name: 'NaN' },
        ];

        testCases.forEach(({ input, expected, name }) => {
          test(name, () => {
            expect(acsch(input)).toEqual(expected);
          });
        });
      });
    });
  });
});
