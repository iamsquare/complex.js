import { Complex } from '../src/';
import {
  argument,
  conjugate,
  modulus,
  negate,
  pythagoras,
  unit,
  isInfinite,
  isNaNC,
  isPureImaginary,
  isReal,
  isZero,
  add,
  multiply,
  subtract,
  divide,
  equals,
  notEquals
} from '../src/operations';

const NAN = Complex.NAN;
const INFINITY = Complex.INFINITY;
const ZERO = Complex.ZERO;
const ONE = Complex.ONE;
const I = Complex.I;

describe('Operators', () => {
  const z: Complex = new Complex(1, 1);
  const w: Complex = new Complex(2, 3);

  describe('Addition', () => {
    test('z + w', () => {
      const c: Complex = add(z, w);
      expect(c.getRe()).toEqual(3);
      expect(c.getIm()).toEqual(4);
    });

    describe('Special Cases', () => {
      test('Infinite + Infinite', () => {
        expect(add(INFINITY, INFINITY)).toEqual(NAN);
      });

      test('Value + Infinite', () => {
        expect(add(z, INFINITY)).toEqual(INFINITY);
      });

      test('NaN + NaN', () => {
        expect(add(NAN, NAN)).toEqual(NAN);
      });

      test('Value + NaN', () => {
        expect(add(z, NAN)).toEqual(NAN);
      });
    });
  });

  describe('Subtraction', () => {
    test('z - w', () => {
      const c: Complex = subtract(z, w);
      expect(c.getRe()).toEqual(-1);
      expect(c.getIm()).toEqual(-2);
    });

    describe('Special Cases', () => {
      test('Infinite - Infinite', () => {
        expect(subtract(INFINITY, INFINITY)).toEqual(NAN);
      });

      test('Value - Infinite', () => {
        expect(subtract(z, INFINITY)).toEqual(INFINITY);
      });

      test('NaN - NaN', () => {
        expect(subtract(NAN, NAN)).toEqual(NAN);
      });

      test('Value - NaN', () => {
        expect(subtract(z, NAN)).toEqual(NAN);
      });
    });
  });

  describe('Multiplication', () => {
    test('z * w', () => {
      const c: Complex = multiply(z, w);
      const d: Complex = multiply(z, 2);
      expect(c.getRe()).toEqual(-1);
      expect(c.getIm()).toEqual(5);
      expect(d.getRe()).toEqual(2);
      expect(d.getIm()).toEqual(2);
    });

    describe('Special cases', () => {
      test('Infinite * Infinite', () => {
        expect(multiply(INFINITY, INFINITY)).toEqual(INFINITY);
      });

      test('Value * Infinite', () => {
        expect(multiply(z, INFINITY)).toEqual(INFINITY);
      });

      test('NaN * NaN', () => {
        expect(multiply(NAN, NAN)).toEqual(NAN);
      });

      test('Value * NaN', () => {
        expect(multiply(z, NAN)).toEqual(NAN);
      });
    });
  });

  describe('Division', () => {
    test('z / w', () => {
      const c: Complex = divide(z, w);
      const d: Complex = divide(z, 2);
      expect(c.getRe()).toBeCloseTo(5 / 13, 10);
      expect(c.getIm()).toBeCloseTo(-1 / 13, 10);
      expect(d.getRe()).toEqual(0.5);
      expect(d.getIm()).toEqual(0.5);
    });

    describe('Special Cases', () => {
      test('Infinite / Infinite', () => {
        expect(divide(INFINITY, INFINITY)).toEqual(NAN);
      });

      test('Value / Infinite', () => {
        expect(divide(z, INFINITY)).toEqual(ZERO);
      });

      test('NaN / NaN', () => {
        expect(divide(NAN, NAN)).toEqual(NAN);
      });

      test('Value / NaN', () => {
        expect(divide(z, NAN)).toEqual(NAN);
      });
    });
  });

  describe('Negation', () => {
    test('-z', () => {
      const c: Complex = negate(z);
      expect(c.getRe()).toEqual(-1);
      expect(c.getIm()).toEqual(-1);
    });

    describe('Special Cases', () => {
      test('-Infinite', () => {
        expect(negate(INFINITY)).toEqual(INFINITY);
      });

      test('-NaN', () => {
        expect(negate(NAN)).toEqual(NAN);
      });
    });
  });

  describe('Conjugate', () => {
    test('Conj(z)', () => {
      const c: Complex = conjugate(z);
      expect(c.getRe()).toEqual(z.getRe());
      expect(c.getIm()).toEqual(-z.getIm());
    });

    describe('Special Cases', () => {
      test('Infinity', () => {
        expect(conjugate(INFINITY)).toEqual(INFINITY);
      });

      test('NaN', () => {
        expect(conjugate(NAN)).toEqual(NAN);
      });
    });
  });

  describe('Equality', () => {
    test('eq()', () => {
      expect(equals(z, z)).toBeTruthy();
      expect(equals(z, w)).toBeFalsy();
    });

    test('neq()', () => {
      expect(notEquals(z, z)).toBeFalsy();
      expect(notEquals(z, w)).toBeTruthy();
    });

    describe('Special Cases', () => {
      test('Infinity', () => {
        expect(equals(INFINITY, INFINITY)).toBeTruthy();
        expect(notEquals(INFINITY, INFINITY)).toBeFalsy();
      });

      test('NaN', () => {
        expect(equals(NAN, NAN)).toBeFalsy();
        expect(notEquals(NAN, NAN)).toBeTruthy();
      });
    });
  });

  describe('Real Part', () => {
    test('Re(z)', () => {
      expect(z.getRe()).toEqual(1);
    });

    describe('Special Cases', () => {
      test('Infinity', () => {
        expect(INFINITY.getRe()).toEqual(Infinity);
      });

      test('NaN', () => {
        expect(Number.isNaN(NAN.getRe())).toBeTruthy();
      });
    });
  });

  describe('Imaginary Part', () => {
    test('Im(z)', () => {
      expect(z.getIm()).toEqual(1);
    });

    describe('Special Cases', () => {
      test('Infinity', () => {
        expect(INFINITY.getIm()).toEqual(Infinity);
      });

      test('NaN', () => {
        expect(Number.isNaN(NAN.getIm())).toBeTruthy();
      });
    });
  });

  describe('Modulus', () => {
    test('|z|', () => {
      expect(modulus(z)).toBeCloseTo(Math.SQRT2, 10);
      expect(modulus(w)).toBeCloseTo(Math.sqrt(13), 10);
    });

    describe('Special Cases', () => {
      test('Infinity', () => {
        expect(modulus(INFINITY)).toEqual(Infinity);
      });

      test('NaN', () => {
        expect(modulus(NAN)).toEqual(NaN);
      });
    });
  });

  describe('Argument', () => {
    test('∠z', () => {
      expect(argument(z)).toBeCloseTo(Math.PI / 4, 10);
      expect(argument(w)).toBeCloseTo(Math.atan2(w.getIm(), w.getRe()), 10);
    });

    describe('Special Cases', () => {
      test('Infinity', () => {
        expect(argument(INFINITY)).toEqual(Infinity);
      });

      test('NaN', () => {
        expect(argument(NAN)).toEqual(NaN);
      });
    });
  });

  describe('Unit', () => {
    const zu = unit(z);
    const wu = unit(w);
    test('ẑ', () => {
      expect(zu.getRe()).toBeCloseTo(Math.SQRT1_2, 10);
      expect(zu.getIm()).toBeCloseTo(Math.SQRT1_2, 10);
      expect(wu.getRe()).toBeCloseTo(2 / Math.sqrt(13), 10);
      expect(wu.getIm()).toBeCloseTo(3 / Math.sqrt(13), 10);
    });
    describe('Special Cases', () => {
      test('Zero', () => {
        expect(unit(ZERO)).toEqual(NAN);
      });

      test('Infinity', () => {
        expect(unit(INFINITY)).toEqual(INFINITY);
      });

      test('NaN', () => {
        expect(unit(NAN)).toEqual(NAN);
      });
    });
  });

  describe('Pythagoras', () => {
    test('a^2 + b^2', () => {
      expect(pythagoras(z)).toEqual(2);
      expect(pythagoras(w)).toEqual(13);
    });

    describe('Special Cases', () => {
      test('Infinity', () => {
        expect(pythagoras(INFINITY)).toEqual(Infinity);
      });

      test('NaN', () => {
        expect(pythagoras(NAN)).toEqual(NaN);
      });
    });
  });

  describe('Misc.', () => {
    describe('isReal()', () => {
      expect(isReal(z)).toBeFalsy();
      expect(isReal(ZERO)).toBeTruthy();
      expect(isReal(ONE)).toBeTruthy();
      expect(isReal(I)).toBeFalsy();
      expect(isReal(INFINITY)).toBeFalsy();
      expect(isReal(NAN)).toBeFalsy();
    });

    describe('isPureImaginary()', () => {
      expect(isPureImaginary(z)).toBeFalsy();
      expect(isPureImaginary(ZERO)).toBeFalsy();
      expect(isPureImaginary(ONE)).toBeFalsy();
      expect(isPureImaginary(I)).toBeTruthy();
      expect(isPureImaginary(INFINITY)).toBeFalsy();
      expect(isPureImaginary(NAN)).toBeFalsy();
    });

    describe('isZero()', () => {
      expect(isZero(z)).toBeFalsy();
      expect(isZero(ZERO)).toBeTruthy();
      expect(isZero(ONE)).toBeFalsy();
      expect(isZero(I)).toBeFalsy();
      expect(isZero(INFINITY)).toBeFalsy();
      expect(isZero(NAN)).toBeFalsy();
    });

    describe('isInfinite()', () => {
      expect(isInfinite(z)).toBeFalsy();
      expect(isInfinite(ZERO)).toBeFalsy();
      expect(isInfinite(ONE)).toBeFalsy();
      expect(isInfinite(I)).toBeFalsy();
      expect(isInfinite(INFINITY)).toBeTruthy();
      expect(isInfinite(NAN)).toBeFalsy();
    });

    describe('isNaN()', () => {
      expect(isNaNC(z)).toBeFalsy();
      expect(isNaNC(ZERO)).toBeFalsy();
      expect(isNaNC(ONE)).toBeFalsy();
      expect(isNaNC(I)).toBeFalsy();
      expect(isNaNC(INFINITY)).toBeFalsy();
      expect(isNaNC(NAN)).toBeTruthy();
    });
  });
});
