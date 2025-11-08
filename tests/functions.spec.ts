import { describe, expect, test } from 'vitest';

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
  // inverse, // TODO: Add inverse functions
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
import { Complex } from '~/index';

const INFINITY: Complex = Complex.INFINITY;
const NAN: Complex = Complex.NAN;
const ZERO: Complex = Complex.ZERO;
const ONE: Complex = Complex.ONE;
const HALFPI: Complex = Complex.HALFPI;

describe('Functions', () => {
  const z: Complex = new Complex(1, 1);
  const w: Complex = new Complex(2, 3);

  describe('Square Root', () => {
    const sz: Complex = sqrt(z);
    const sw: Complex = sqrt(w);
    test('sqrt(z)', () => {
      expect(sz.getRe()).toBeCloseTo(1.09868411346781, 15);
      expect(sz.getIm()).toBeCloseTo(0.455089860562227, 15);
      expect(sw.getRe()).toBeCloseTo(1.67414922803554, 15);
      expect(sw.getIm()).toBeCloseTo(0.895977476129838, 15);
    });

    describe('Special Cases', () => {
      test('Infinity', () => {
        expect(sqrt(INFINITY)).toEqual(INFINITY);
      });
      test('NaN', () => {
        expect(sqrt(NAN)).toEqual(NAN);
      });
    });
  });

  describe('Logarithm', () => {
    const lz: Complex = log(z);
    const lw: Complex = log(w);
    test('log(z)', () => {
      expect(lz.getRe()).toBeCloseTo(0.346573590279973, 15);
      expect(lz.getIm()).toBeCloseTo(0.785398163397448, 15);
      expect(lw.getRe()).toBeCloseTo(1.282474678730768, 15);
      expect(lw.getIm()).toBeCloseTo(0.982793723247329, 15);
    });

    describe('Special Cases', () => {
      test('Zero', () => {
        expect(log(ZERO)).toEqual(NAN);
      });
      test('Infinity', () => {
        expect(log(INFINITY)).toEqual(INFINITY);
      });
      test('NaN', () => {
        expect(log(NAN)).toEqual(NAN);
      });
    });
  });

  describe('Exponential', () => {
    const ez: Complex = exp(z);
    const ew: Complex = exp(w);
    test('exp(z)', () => {
      expect(ez.getRe()).toBeCloseTo(1.468693939915885, 15);
      expect(ez.getIm()).toBeCloseTo(2.287355287178842, 15);
      expect(ew.getRe()).toBeCloseTo(-7.315110094901103, 15);
      expect(ew.getIm()).toBeCloseTo(1.042743656235904, 15);
    });

    describe('Special Cases', () => {
      test('Zero', () => {
        expect(exp(ZERO)).toEqual(ONE);
      });
      test('Infinity', () => {
        expect(exp(INFINITY)).toEqual(NAN);
      });
      test('NaN', () => {
        expect(exp(NAN)).toEqual(NAN);
      });
    });
  });

  describe('Exponentiation', () => {
    const ez: Complex = pow(z, w);
    const en: Complex = pow(z, 3);
    const ei: Complex = pow(z, new Complex(0, 4));
    test('z^w', () => {
      expect(ez.getRe()).toBeCloseTo(-0.163450932107355, 15);
      expect(ez.getIm()).toBeCloseTo(0.0960049836089489, 15);
      expect(en.getRe()).toBeCloseTo(-2, 15);
      expect(en.getIm()).toBeCloseTo(2, 15);
      expect(ei.getRe()).toBeCloseTo(0.00792789471147597, 15);
      expect(ei.getIm()).toBeCloseTo(0.0424804804251522, 15);
    });

    describe('Special Cases', () => {
      test('0^z', () => {
        expect(pow(ZERO, z)).toEqual(ZERO);
      });

      test('z^0', () => {
        expect(pow(z, ZERO)).toEqual(ONE);
      });

      test('0^0', () => {
        expect(pow(ZERO, ZERO)).toEqual(NAN);
      });

      test('∞^0', () => {
        expect(pow(INFINITY, ZERO)).toEqual(NAN);
      });

      test('0^∞', () => {
        expect(pow(ZERO, INFINITY)).toEqual(ZERO);
      });

      test('1^∞', () => {
        expect(pow(ONE, INFINITY)).toEqual(NAN);
      });

      test('∞^∞', () => {
        expect(pow(INFINITY, INFINITY)).toEqual(INFINITY);
      });

      test('z^∞', () => {
        expect(pow(z, INFINITY)).toEqual(INFINITY);
      });
    });
  });

  describe('Trigonometric Functions', () => {
    describe('sin', () => {
      const sz: Complex = sin(z);
      const sw: Complex = sin(w);

      test('sin(z)', () => {
        expect(sz.getRe()).toBeCloseTo(1.298457581415977, 15);
        expect(sz.getIm()).toBeCloseTo(0.634963914784736, 15);
        expect(sw.getRe()).toBeCloseTo(9.15449914691143, 15);
        expect(sw.getIm()).toBeCloseTo(-4.16890695996656, 14);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(sin(ZERO)).toEqual(ZERO);
        });

        test('Infinity', () => {
          expect(sin(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(sin(NAN)).toEqual(NAN);
        });
      });
    });

    describe('cos', () => {
      const sz: Complex = cos(z);
      const sw: Complex = cos(w);
      test('cos(z)', () => {
        expect(sz.getRe()).toBeCloseTo(0.833730025131149, 15);
        expect(sz.getIm()).toBeCloseTo(-0.988897705762865, 15);
        expect(sw.getRe()).toBeCloseTo(-4.189625690968807, 15);
        expect(sw.getIm()).toBeCloseTo(-9.109227893755337, 15);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(cos(ZERO)).toEqual(ONE);
        });

        test('Infinity', () => {
          expect(cos(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(cos(NAN)).toEqual(NAN);
        });
      });
    });
    describe('tan', () => {
      const sz: Complex = tan(z);
      const sw: Complex = tan(w);

      test('tan(z)', () => {
        expect(sz.getRe()).toBeCloseTo(0.271752585319511, 14);
        expect(sz.getIm()).toBeCloseTo(1.08392332733869, 14);
        expect(sw.getRe()).toBeCloseTo(-0.003764025641504, 14);
        expect(sw.getIm()).toBeCloseTo(1.00323862735361, 14);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(tan(ZERO)).toEqual(ZERO);
        });

        test('Infinity', () => {
          expect(tan(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(tan(NAN)).toEqual(NAN);
        });
      });
    });

    describe('cot', () => {
      const sz: Complex = cot(z);
      const sw: Complex = cot(w);

      test('cot(z)', () => {
        expect(sz.getRe()).toBeCloseTo(0.217621561854402, 14);
        expect(sz.getIm()).toBeCloseTo(-0.868014142895925, 14);
        expect(sw.getRe()).toBeCloseTo(-0.003739710376336, 14);
        expect(sw.getIm()).toBeCloseTo(-0.996757796569358, 14);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(cot(ZERO)).toEqual(INFINITY);
        });

        test('Infinity', () => {
          expect(cot(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(cot(NAN)).toEqual(NAN);
        });
      });
    });

    describe('sec', () => {
      const sz: Complex = sec(z);
      const sw: Complex = sec(w);

      test('sec(z)', () => {
        expect(sz.getRe()).toBeCloseTo(0.498337030555186, 14);
        expect(sz.getIm()).toBeCloseTo(0.591083841721045, 14);
        expect(sw.getRe()).toBeCloseTo(-0.041674964411144, 14);
        expect(sw.getIm()).toBeCloseTo(0.090611137196237, 14);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(sec(ZERO)).toEqual(ONE);
        });

        test('Infinity', () => {
          expect(sec(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(sec(NAN)).toEqual(NAN);
        });
      });
    });

    describe('csc', () => {
      const sz: Complex = csc(z);
      const sw: Complex = csc(w);

      test('sec(z)', () => {
        expect(sz.getRe()).toBeCloseTo(0.621518017170428, 14);
        expect(sz.getIm()).toBeCloseTo(-0.303931001628426, 14);
        expect(sw.getRe()).toBeCloseTo(0.090473209753207, 14);
        expect(sw.getIm()).toBeCloseTo(0.041200986288574, 14);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(csc(ZERO)).toEqual(INFINITY);
        });

        test('Infinity', () => {
          expect(csc(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(csc(NAN)).toEqual(NAN);
        });
      });
    });
  });

  describe('Inverse Trigonometric Functions', () => {
    describe('asin', () => {
      const sz: Complex = asin(z);
      const sw: Complex = asin(w);

      test('asin(z)', () => {
        expect(sz.getRe()).toBeCloseTo(0.666239432492515, 14);
        expect(sz.getIm()).toBeCloseTo(1.061275061905035, 14);
        expect(sw.getRe()).toBeCloseTo(0.570652784321099, 14);
        expect(sw.getIm()).toBeCloseTo(1.983387029916535, 14);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(asin(ZERO)).toEqual(ZERO);
        });

        test('Infinity', () => {
          expect(asin(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(asin(NAN)).toEqual(NAN);
        });
      });
    });

    describe('acos', () => {
      const sz: Complex = acos(z);
      const sw: Complex = acos(w);

      test('acos(z)', () => {
        expect(sz.getRe()).toBeCloseTo(0.904556894302381, 14);
        expect(sz.getIm()).toBeCloseTo(-1.061275061905035, 14);
        expect(sw.getRe()).toBeCloseTo(1.000143542473797, 14);
        expect(sw.getIm()).toBeCloseTo(-1.983387029916535, 14);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(acos(ZERO)).toEqual(HALFPI);
        });

        test('Infinity', () => {
          expect(acos(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(acos(NAN)).toEqual(NAN);
        });
      });
    });

    describe('atan', () => {
      const sz: Complex = atan(z);
      const sw: Complex = atan(w);

      test('atan(z)', () => {
        expect(sz.getRe()).toBeCloseTo(1.01722196789785, 13);
        expect(sz.getIm()).toBeCloseTo(0.402359478108525, 13);
        expect(sw.getRe()).toBeCloseTo(1.40992104959657, 13);
        expect(sw.getIm()).toBeCloseTo(0.229072682968538, 13);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(atan(ZERO)).toEqual(ZERO);
        });

        test('Infinity', () => {
          expect(atan(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(atan(NAN)).toEqual(NAN);
        });
      });
    });

    describe('acot', () => {
      const sz: Complex = acot(z);
      const sw: Complex = acot(w);

      test('acot(z)', () => {
        expect(sz.getRe()).toBeCloseTo(0.553574358897045, 14);
        expect(sz.getIm()).toBeCloseTo(-0.402359478108525, 14);
        expect(sw.getRe()).toBeCloseTo(0.160875277198321, 14);
        expect(sw.getIm()).toBeCloseTo(-0.229072682968538, 14);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(acot(ZERO)).toEqual(HALFPI);
        });

        test('Infinity', () => {
          expect(acot(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(acot(NAN)).toEqual(NAN);
        });
      });
    });

    describe('asec', () => {
      const sz: Complex = asec(z);
      const sw: Complex = asec(w);

      test('asec(z)', () => {
        expect(sz.getRe()).toBeCloseTo(1.118517879643705, 14);
        expect(sz.getIm()).toBeCloseTo(0.530637530952517, 14);
        expect(sw.getRe()).toBeCloseTo(1.420410722467034, 14);
        expect(sw.getIm()).toBeCloseTo(0.231334698573973, 14);
      });

      describe('Special Cases', () => {
        test('Infinity', () => {
          expect(asec(INFINITY)).toEqual(HALFPI);
        });

        test('NaN', () => {
          expect(asec(NAN)).toEqual(NAN);
        });
      });
    });

    describe('acsc', () => {
      const sz: Complex = acsc(z);
      const sw: Complex = acsc(w);

      test('acsc(z)', () => {
        expect(sz.getRe()).toBeCloseTo(0.45227844715119, 14);
        expect(sz.getIm()).toBeCloseTo(-0.530637530952517, 14);
        expect(sw.getRe()).toBeCloseTo(0.150385604327861, 14);
        expect(sw.getIm()).toBeCloseTo(-0.231334698573973, 14);
      });

      describe('Special Cases', () => {
        test('Infinity', () => {
          expect(acsc(INFINITY)).toEqual(ZERO);
        });

        test('NaN', () => {
          expect(acsc(NAN)).toEqual(NAN);
        });
      });
    });
  });

  describe('Hyperbolic', () => {
    describe('sinh', () => {
      test('sinh(z)', () => {
        const sz: Complex = sinh(z);
        const sw: Complex = sinh(w);

        expect(sz.getRe()).toBeCloseTo(0.634963914784736, 15);
        expect(sz.getIm()).toBeCloseTo(1.298457581415977, 15);
        expect(sw.getRe()).toBeCloseTo(-3.59056458998578, 15);
        expect(sw.getIm()).toBeCloseTo(0.53092108624852, 15);
      });

      describe('Special Cases', () => {
        test('Infinity', () => {
          expect(sinh(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(sinh(NAN)).toEqual(NAN);
        });
      });
    });

    describe('cosh', () => {
      test('cosh(z)', () => {
        const cz: Complex = cosh(z);
        const cw: Complex = cosh(w);

        expect(cz.getRe()).toBeCloseTo(0.833730025131149, 14);
        expect(cz.getIm()).toBeCloseTo(0.988897705762865, 14);
        expect(cw.getRe()).toBeCloseTo(-3.72454550491532, 14);
        expect(cw.getIm()).toBeCloseTo(0.511822569987384, 14);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(cosh(ZERO)).toEqual(ONE);
        });

        test('Infinity', () => {
          expect(cosh(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(cosh(NAN)).toEqual(NAN);
        });
      });
    });

    describe('tanh', () => {
      test('tanh(z)', () => {
        const tz: Complex = tanh(z);
        const tw: Complex = tanh(w);

        expect(tz.getRe()).toBeCloseTo(1.08392332733869, 14);
        expect(tz.getIm()).toBeCloseTo(0.271752585319511, 14);
        expect(tw.getRe()).toBeCloseTo(0.965385879022133, 14);
        expect(tw.getIm()).toBeCloseTo(-0.009884375038322, 14);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(tanh(ZERO)).toEqual(ZERO);
        });

        test('Infinity', () => {
          expect(tanh(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(tanh(NAN)).toEqual(NAN);
        });
      });
    });

    describe('coth', () => {
      test('coth(z)', () => {
        const tz: Complex = coth(z);
        const tw: Complex = coth(w);

        expect(tz.getRe()).toBeCloseTo(0.868014142895925, 14);
        expect(tz.getIm()).toBeCloseTo(-0.217621561854402, 14);
        expect(tw.getRe()).toBeCloseTo(1.035746637764995, 14);
        expect(tw.getIm()).toBeCloseTo(0.010604783470337, 14);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(coth(ZERO)).toEqual(INFINITY);
        });

        test('Infinity', () => {
          expect(coth(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(coth(NAN)).toEqual(NAN);
        });
      });
    });

    describe('sech', () => {
      test('sech(z)', () => {
        const tz: Complex = sech(z);
        const tw: Complex = sech(w);

        expect(tz.getRe()).toBeCloseTo(0.498337030555186, 14);
        expect(tz.getIm()).toBeCloseTo(-0.591083841721045, 14);
        expect(tw.getRe()).toBeCloseTo(-0.263512975158389, 14);
        expect(tw.getIm()).toBeCloseTo(-0.036211636558768, 14);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(sech(ZERO)).toEqual(ONE);
        });

        test('Infinity', () => {
          expect(sech(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(sech(NAN)).toEqual(NAN);
        });
      });
    });

    describe('csch', () => {
      test('csch(z)', () => {
        const tz: Complex = csch(z);
        const tw: Complex = csch(w);

        expect(tz.getRe()).toBeCloseTo(0.303931001628426, 14);
        expect(tz.getIm()).toBeCloseTo(-0.621518017170428, 14);
        expect(tw.getRe()).toBeCloseTo(-0.27254866146294, 14);
        expect(tw.getIm()).toBeCloseTo(-0.040300578856891, 14);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(csch(ZERO)).toEqual(INFINITY);
        });

        test('Infinity', () => {
          expect(csch(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(csch(NAN)).toEqual(NAN);
        });
      });
    });
  });

  describe('Inverse Hyperbolic Functions', () => {
    describe('asinh', () => {
      test('asinh(z)', () => {
        const tz: Complex = asinh(z);
        const tw: Complex = asinh(w);

        expect(tz.getRe()).toBeCloseTo(1.061275061905036, 15);
        expect(tz.getIm()).toBeCloseTo(0.666239432492515, 15);
        expect(tw.getRe()).toBeCloseTo(1.968637925793096, 15);
        expect(tw.getIm()).toBeCloseTo(0.964658504407603, 15);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(asinh(ZERO)).toEqual(ZERO);
        });

        test('Infinity', () => {
          expect(asinh(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(asinh(NAN)).toEqual(NAN);
        });
      });
    });

    describe('acosh', () => {
      test('acosh(z)', () => {
        const tz: Complex = acosh(z);
        const tw: Complex = acosh(w);

        expect(tz.getRe()).toBeCloseTo(1.061275061905035, 14);
        expect(tz.getIm()).toBeCloseTo(0.904556894302381, 14);
        expect(tw.getRe()).toBeCloseTo(1.983387029916535, 14);
        expect(tw.getIm()).toBeCloseTo(1.000143542473797, 14);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(acosh(ZERO)).toEqual(new Complex(0, Math.PI / 2));
        });

        test('Infinity', () => {
          expect(acosh(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(acosh(NAN)).toEqual(NAN);
        });
      });
    });

    describe('atanh', () => {
      test('atanh(z)', () => {
        const tz: Complex = atanh(z);
        const tw: Complex = atanh(w);

        expect(tz.getRe()).toBeCloseTo(0.402359478108525, 14);
        expect(tz.getIm()).toBeCloseTo(1.01722196789785, 14);
        expect(tw.getRe()).toBeCloseTo(0.146946666225529, 14);
        expect(tw.getIm()).toBeCloseTo(1.33897252229449, 14);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(atanh(ZERO)).toEqual(ZERO);
        });

        test('Infinity', () => {
          expect(atanh(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(atanh(NAN)).toEqual(NAN);
        });
      });
    });

    describe('acoth', () => {
      test('acoth(z)', () => {
        const tz: Complex = acoth(z);
        const tw: Complex = acoth(w);

        expect(tz.getRe()).toBeCloseTo(0.402359478108525, 14);
        expect(tz.getIm()).toBeCloseTo(-0.553574358897045, 14);
        expect(tw.getRe()).toBeCloseTo(0.146946666225529, 14);
        expect(tw.getIm()).toBeCloseTo(-0.231823804500403, 14);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(acoth(ZERO)).toEqual(NAN);
        });

        test('Infinity', () => {
          expect(acoth(INFINITY)).toEqual(ZERO);
        });

        test('NaN', () => {
          expect(acoth(NAN)).toEqual(NAN);
        });
      });
    });

    describe('asech', () => {
      test('asech(z)', () => {
        const tz: Complex = asech(z);
        const tw: Complex = asech(w);

        expect(tz.getRe()).toBeCloseTo(0.530637530952517, 14);
        expect(tz.getIm()).toBeCloseTo(-1.118517879643705, 14);
        expect(tw.getRe()).toBeCloseTo(0.231334698573973, 14);
        expect(tw.getIm()).toBeCloseTo(-1.420410722467034, 14);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(asech(ZERO)).toEqual(NAN);
        });

        test('Infinity', () => {
          expect(asech(INFINITY)).toEqual(new Complex(0, Math.PI / 2));
        });

        test('NaN', () => {
          expect(asech(NAN)).toEqual(NAN);
        });
      });
    });

    describe('acsch', () => {
      test('acsch(z)', () => {
        const tz: Complex = acsch(z);
        const tw: Complex = acsch(w);

        expect(tz.getRe()).toBeCloseTo(0.530637530952517, 14);
        expect(tz.getIm()).toBeCloseTo(-0.45227844715119, 14);
        expect(tw.getRe()).toBeCloseTo(0.157355498844985, 14);
        expect(tw.getIm()).toBeCloseTo(-0.229962902377207, 14);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(acsch(ZERO)).toEqual(NAN);
        });

        test('Infinity', () => {
          expect(acsch(INFINITY)).toEqual(ZERO);
        });

        test('NaN', () => {
          expect(acsch(NAN)).toEqual(NAN);
        });
      });
    });
  });
});
