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
      expect(sqrt(z)).toBeComplexCloseTo(new Complex(1.09868411346781, 0.455089860562227));
      expect(sqrt(w)).toBeComplexCloseTo(new Complex(1.67414922803554, 0.895977476129838));
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

  describe('Logarithm', () => {
    test('log(z)', () => {
      expect(log(z)).toBeComplexCloseTo(new Complex(0.346573590279973, 0.785398163397448));
      expect(log(w)).toBeComplexCloseTo(new Complex(1.282474678730768, 0.982793723247329));
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
      expect(exp(z)).toBeComplexCloseTo(new Complex(1.468693939915885, 2.287355287178842));
      expect(exp(w)).toBeComplexCloseTo(new Complex(-7.315110094901103, 1.042743656235904));
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
      expect(pow(z, w)).toBeComplexCloseTo(new Complex(-0.163450932107355, 0.0960049836089489));
      expect(pow(z, 3)).toBeComplexCloseTo(new Complex(-2, 2));
      expect(pow(z, new Complex(0, 4))).toBeComplexCloseTo(new Complex(0.00792789471147597, 0.0424804804251522));
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
        expect(sin(z)).toBeComplexCloseTo(new Complex(1.298457581415977, 0.634963914784736));
        expect(sin(w)).toBeComplexCloseTo(new Complex(9.15449914691143, -4.16890695996656));
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
        expect(cos(z)).toBeComplexCloseTo(new Complex(0.833730025131149, -0.988897705762865));
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
        expect(tan(z)).toBeComplexCloseTo(new Complex(0.271752585319511, 1.08392332733869), 1e-14);
        expect(tan(w)).toBeComplexCloseTo(new Complex(-0.003764025641504, 1.00323862735361), 1e-14);
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
        expect(cot(z)).toBeComplexCloseTo(new Complex(0.217621561854402, -0.868014142895925));
        expect(cot(w)).toBeComplexCloseTo(new Complex(-0.003739710376336, -0.996757796569358));
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
        expect(sec(z)).toBeComplexCloseTo(new Complex(0.498337030555186, 0.591083841721045));
        expect(sec(w)).toBeComplexCloseTo(new Complex(-0.041674964411144, 0.090611137196237));
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
        expect(csc(z)).toBeComplexCloseTo(new Complex(0.621518017170428, -0.303931001628426));
        expect(csc(w)).toBeComplexCloseTo(new Complex(0.090473209753207, 0.041200986288574));
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
        expect(asin(z)).toBeComplexCloseTo(new Complex(0.666239432492515, 1.061275061905035));
        expect(asin(w)).toBeComplexCloseTo(new Complex(0.570652784321099, 1.983387029916535));
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
        expect(acos(z)).toBeComplexCloseTo(new Complex(0.904556894302381, -1.061275061905035));
        expect(acos(w)).toBeComplexCloseTo(new Complex(1.000143542473797, -1.983387029916535));
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
        expect(atan(z)).toBeComplexCloseTo(new Complex(1.01722196789785, 0.402359478108525), 1e-14);
        expect(atan(w)).toBeComplexCloseTo(new Complex(1.40992104959657, 0.229072682968538), 1e-14);
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
        expect(acot(z)).toBeComplexCloseTo(new Complex(0.553574358897045, -0.402359478108525));
        expect(acot(w)).toBeComplexCloseTo(new Complex(0.160875277198321, -0.229072682968538));
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
        expect(asec(z)).toBeComplexCloseTo(new Complex(1.118517879643705, 0.530637530952517));
        expect(asec(w)).toBeComplexCloseTo(new Complex(1.420410722467034, 0.231334698573973));
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
        expect(acsc(z)).toBeComplexCloseTo(new Complex(0.45227844715119, -0.530637530952517));
        expect(acsc(w)).toBeComplexCloseTo(new Complex(0.150385604327861, -0.231334698573973));
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
        expect(sinh(z)).toBeComplexCloseTo(new Complex(0.634963914784736, 1.298457581415977));
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
        expect(cosh(z)).toBeComplexCloseTo(new Complex(0.833730025131149, 0.988897705762865));
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
        expect(tanh(z)).toBeComplexCloseTo(new Complex(1.08392332733869, 0.271752585319511), 1e-14);
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
        expect(coth(z)).toBeComplexCloseTo(new Complex(0.868014142895925, -0.217621561854402));
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
        expect(sech(z)).toBeComplexCloseTo(new Complex(0.498337030555186, -0.591083841721045));
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
        expect(csch(z)).toBeComplexCloseTo(new Complex(0.303931001628426, -0.621518017170428));
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
        expect(asinh(z)).toBeComplexCloseTo(new Complex(1.061275061905036, 0.666239432492515));
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
        expect(acosh(z)).toBeComplexCloseTo(new Complex(1.061275061905035, 0.904556894302381));
        expect(acosh(w)).toBeComplexCloseTo(new Complex(1.983387029916535, 1.000143542473797));
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
        expect(atanh(z)).toBeComplexCloseTo(new Complex(0.402359478108525, 1.01722196789785), 1e-14);
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
        expect(acoth(z)).toBeComplexCloseTo(new Complex(0.402359478108525, -0.553574358897045));
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
        expect(asech(z)).toBeComplexCloseTo(new Complex(0.530637530952517, -1.118517879643705));
        expect(asech(w)).toBeComplexCloseTo(new Complex(0.231334698573973, -1.420410722467034));
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
        expect(acsch(z)).toBeComplexCloseTo(new Complex(0.530637530952517, -0.45227844715119));
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
