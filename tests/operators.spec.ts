import { Complex } from '../src/complex';

const NAN = Complex.NAN;
const INFINITY = Complex.INFINITY;
const ZERO = Complex.ZERO;
const ONE = Complex.ONE;
const I = Complex.I;

describe('Operators', () => {
  test('They should exist', () => {
    expect(Complex.prototype.argument).toBeDefined();
    expect(Complex.prototype.conjugate).toBeDefined();
    expect(Complex.prototype.divide).toBeDefined();
    expect(Complex.prototype.equals).toBeDefined();
    expect(Complex.prototype.notEquals).toBeDefined();
    expect(Complex.prototype.getIm).toBeDefined();
    expect(Complex.prototype.getRe).toBeDefined();
    expect(Complex.prototype.minus).toBeDefined();
    expect(Complex.prototype.modulus).toBeDefined();
    expect(Complex.prototype.negate).toBeDefined();
    expect(Complex.prototype.plus).toBeDefined();
    expect(Complex.prototype.times).toBeDefined();
    expect(Complex.prototype.unit).toBeDefined();
    expect(Complex.prototype.pythagoras).toBeDefined();
    expect(Complex.prototype.isPureImaginary).toBeDefined();
    expect(Complex.prototype.isReal).toBeDefined();
    expect(Complex.prototype.isInfinite).toBeDefined();
    expect(Complex.prototype.isNaN).toBeDefined();
    expect(Complex.prototype.isZero).toBeDefined();
  });

  let z: Complex = new Complex(1, 1);
  let w: Complex = new Complex(2, 3);

  describe('Addition', () => {
    test('z + w', () => {
      let c: Complex = z.plus(w);
      expect(c.getRe()).toEqual(3);
      expect(c.getIm()).toEqual(4);
    });

    describe('Special Cases', () => {
      test('Infinite + Infinite', () => {
        expect(INFINITY.plus(INFINITY)).toEqual(NAN);
      });

      test('Value + Infinite', () => {
        expect(z.plus(INFINITY)).toEqual(INFINITY);
      });

      test('NaN + NaN', () => {
        expect(NAN.plus(NAN)).toEqual(NAN);
      });

      test('Value + NaN', () => {
        expect(z.plus(NAN)).toEqual(NAN);
      });
    });
  });

  describe('Subtraction', () => {
    test('z - w', () => {
      let c: Complex = z.minus(w);
      expect(c.getRe()).toEqual(-1);
      expect(c.getIm()).toEqual(-2);
    });

    describe('Special Cases', () => {
      test('Infinite - Infinite', () => {
        expect(INFINITY.minus(INFINITY)).toEqual(NAN);
      });

      test('Value - Infinite', () => {
        expect(z.minus(INFINITY)).toEqual(INFINITY);
      });

      test('NaN - NaN', () => {
        expect(NAN.minus(NAN)).toEqual(NAN);
      });

      test('Value - NaN', () => {
        expect(z.minus(NAN)).toEqual(NAN);
      });
    });
  });

  describe('Multiplication', () => {
    test('z * w', () => {
      let c: Complex = z.times(w);
      expect(c.getRe()).toEqual(-1);
      expect(c.getIm()).toEqual(5);
    });

    describe('Special cases', () => {
      test('Infinite * Infinite', () => {
        expect(INFINITY.times(INFINITY)).toEqual(INFINITY);
      });

      test('Value * Infinite', () => {
        expect(z.times(INFINITY)).toEqual(INFINITY);
      });

      test('NaN * NaN', () => {
        expect(NAN.times(NAN)).toEqual(NAN);
      });

      test('Value * NaN', () => {
        expect(z.times(NAN)).toEqual(NAN);
      });
    });
  });

  describe('Division', () => {
    test('z / w', () => {
      let c: Complex = z.divide(w);
      expect(c.getRe()).toBeCloseTo(5 / 13, 10);
      expect(c.getIm()).toBeCloseTo(-1 / 13, 10);
    });

    describe('Special Cases', () => {
      test('Infinite / Infinite', () => {
        expect(INFINITY.divide(INFINITY)).toEqual(NAN);
      });

      test('Value / Infinite', () => {
        expect(z.divide(INFINITY)).toEqual(ZERO);
      });

      test('NaN / NaN', () => {
        expect(NAN.divide(NAN)).toEqual(NAN);
      });

      test('Value / NaN', () => {
        expect(z.divide(NAN)).toEqual(NAN);
      });
    });
  });

  describe('Negation', () => {
    test('-z', () => {
      let c: Complex = z.negate();
      expect(c.getRe()).toEqual(-1);
      expect(c.getIm()).toEqual(-1);
    });

    describe('Special Cases', () => {
      test('-Infinite', () => {
        expect(INFINITY.negate()).toEqual(INFINITY);
      });

      test('-NaN', () => {
        expect(NAN.negate()).toEqual(NAN);
      });
    });
  });

  describe('Conjugate', () => {
    test('Conj(z)', () => {
      let c: Complex = z.conjugate();
      expect(c.getRe()).toEqual(z.getRe());
      expect(c.getIm()).toEqual(-z.getIm());
    });

    describe('Special Cases', () => {
      test('Infinity', () => {
        expect(INFINITY.conjugate()).toEqual(INFINITY);
      });

      test('NaN', () => {
        expect(NAN.conjugate()).toEqual(NAN);
      });
    });
  });

  describe('Equality', () => {
    test('eq()', () => {
      expect(z.equals(z)).toBeTruthy();
      expect(z.equals(w)).toBeFalsy();
    });

    test('neq()', () => {
      expect(z.notEquals(z)).toBeFalsy();
      expect(z.notEquals(w)).toBeTruthy();
    });

    describe('Special Cases', () => {
      test('Infinity', () => {
        expect(INFINITY.equals(INFINITY)).toBeTruthy();
        expect(INFINITY.notEquals(INFINITY)).toBeFalsy();
      });

      test('NaN', () => {
        expect(NAN.equals(NAN)).toBeFalsy();
        expect(NAN.notEquals(NAN)).toBeTruthy();
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
        expect(isNaN(NAN.getRe())).toBeTruthy();
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
        expect(isNaN(NAN.getIm())).toBeTruthy();
      });
    });
  });

  describe('Modulus', () => {
    test('|z|', () => {
      expect(z.modulus()).toBeCloseTo(Math.SQRT2, 10);
      expect(w.modulus()).toBeCloseTo(Math.sqrt(13), 10);
    });

    describe('Special Cases', () => {
      test('Infinity', () => {
        expect(INFINITY.modulus()).toEqual(Infinity);
      });

      test('NaN', () => {
        expect(NAN.modulus()).toEqual(NaN);
      });
    });
  });

  describe('Argument', () => {
    test('∠z', () => {
      expect(z.argument()).toBeCloseTo(Math.PI / 4, 10);
      expect(w.argument()).toBeCloseTo(Math.atan2(w.getIm(), w.getRe()), 10);
    });

    describe('Special Cases', () => {
      test('Infinity', () => {
        expect(INFINITY.argument()).toEqual(Infinity);
      });

      test('NaN', () => {
        expect(NAN.argument()).toEqual(NaN);
      });
    });
  });

  describe('Unit', () => {
    const zu = z.unit();
    const wu = w.unit();
    test('ẑ', () => {
      expect(zu.getRe()).toBeCloseTo(Math.SQRT1_2, 10);
      expect(zu.getIm()).toBeCloseTo(Math.SQRT1_2, 10);
      expect(wu.getRe()).toBeCloseTo(2 / Math.sqrt(13), 10);
      expect(wu.getIm()).toBeCloseTo(3 / Math.sqrt(13), 10);
    });
    describe('Special Cases', () => {
      test('Zero', () => {
        expect(ZERO.unit()).toEqual(NAN);
      });

      test('Infinity', () => {
        expect(INFINITY.unit()).toEqual(INFINITY);
      });

      test('NaN', () => {
        expect(NAN.unit()).toEqual(NAN);
      });
    });
  });

  describe('Pythagoras', () => {
    test('a^2 + b^2', () => {
      expect(z.pythagoras()).toEqual(2);
      expect(w.pythagoras()).toEqual(13);
    });

    describe('Special Cases', () => {
      test('Infinity', () => {
        expect(INFINITY.pythagoras()).toEqual(Infinity);
      });

      test('NaN', () => {
        expect(NAN.pythagoras()).toEqual(NaN);
      });
    });
  });

  describe('Misc.', () => {
    describe('isReal()', () => {
      expect(z.isReal()).toBeFalsy();
      expect(ZERO.isReal()).toBeTruthy();
      expect(ONE.isReal()).toBeTruthy();
      expect(I.isReal()).toBeFalsy();
      expect(INFINITY.isReal()).toBeFalsy();
      expect(NAN.isReal()).toBeFalsy();
    });

    describe('isPureImaginary()', () => {
      expect(z.isPureImaginary()).toBeFalsy();
      expect(ZERO.isPureImaginary()).toBeFalsy();
      expect(ONE.isPureImaginary()).toBeFalsy();
      expect(I.isPureImaginary()).toBeTruthy();
      expect(INFINITY.isPureImaginary()).toBeFalsy();
      expect(NAN.isPureImaginary()).toBeFalsy();
    });

    describe('isZero()', () => {
      expect(z.isZero()).toBeFalsy();
      expect(ZERO.isZero()).toBeTruthy();
      expect(ONE.isZero()).toBeFalsy();
      expect(I.isZero()).toBeFalsy();
      expect(INFINITY.isZero()).toBeFalsy();
      expect(NAN.isZero()).toBeFalsy();
    });

    describe('isInfinite()', () => {
      expect(z.isInfinite()).toBeFalsy();
      expect(ZERO.isInfinite()).toBeFalsy();
      expect(ONE.isInfinite()).toBeFalsy();
      expect(I.isInfinite()).toBeFalsy();
      expect(INFINITY.isInfinite()).toBeTruthy();
      expect(NAN.isInfinite()).toBeFalsy();
    });

    describe('isNaN()', () => {
      expect(z.isNaN()).toBeFalsy();
      expect(ZERO.isNaN()).toBeFalsy();
      expect(ONE.isNaN()).toBeFalsy();
      expect(I.isNaN()).toBeFalsy();
      expect(INFINITY.isNaN()).toBeFalsy();
      expect(NAN.isNaN()).toBeTruthy();
    });
  });
});
