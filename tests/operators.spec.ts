import Complex from '../src/complex';

describe('Operators', () => {
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
        expect(Complex.INFINITY.plus(Complex.INFINITY)).toEqual(Complex.NAN);
      });

      test('Value + Infinite', () => {
        expect(z.plus(Complex.INFINITY)).toEqual(Complex.INFINITY);
      });

      test('NaN + NaN', () => {
        expect(Complex.NAN.plus(Complex.NAN)).toEqual(Complex.NAN);
      });

      test('Value + NaN', () => {
        expect(z.plus(Complex.NAN)).toEqual(Complex.NAN);
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
        expect(Complex.INFINITY.minus(Complex.INFINITY)).toEqual(Complex.NAN);
      });

      test('Value - Infinite', () => {
        expect(z.minus(Complex.INFINITY)).toEqual(Complex.INFINITY);
      });

      test('NaN - NaN', () => {
        expect(Complex.NAN.minus(Complex.NAN)).toEqual(Complex.NAN);
      });

      test('Value - NaN', () => {
        expect(z.minus(Complex.NAN)).toEqual(Complex.NAN);
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
        expect(Complex.INFINITY.times(Complex.INFINITY)).toEqual(Complex.INFINITY);
      });

      test('Value * Infinite', () => {
        expect(z.times(Complex.INFINITY)).toEqual(Complex.INFINITY);
      });

      test('NaN * NaN', () => {
        expect(Complex.NAN.times(Complex.NAN)).toEqual(Complex.NAN);
      });

      test('Value * NaN', () => {
        expect(z.times(Complex.NAN)).toEqual(Complex.NAN);
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
        expect(Complex.INFINITY.divide(Complex.INFINITY)).toEqual(Complex.NAN);
      });

      test('Value / Infinite', () => {
        expect(z.divide(Complex.INFINITY)).toEqual(Complex.ZERO);
      });

      test('NaN / NaN', () => {
        expect(Complex.NAN.divide(Complex.NAN)).toEqual(Complex.NAN);
      });

      test('Value / NaN', () => {
        expect(z.divide(Complex.NAN)).toEqual(Complex.NAN);
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
        expect(Complex.INFINITY.negate()).toEqual(Complex.INFINITY);
      });

      test('-NaN', () => {
        expect(Complex.NAN.negate()).toEqual(Complex.NAN);
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
        expect(Complex.INFINITY.conjugate()).toEqual(Complex.INFINITY);
      });

      test('NaN', () => {
        expect(Complex.NAN.conjugate()).toEqual(Complex.NAN);
      });
    });
  });

  describe('Real Part', () => {
    test('Re(z)', () => {
      expect(z.getRe()).toEqual(1);
    });

    describe('Special Cases', () => {
      test('Infinity', () => {
        expect(Complex.INFINITY.getRe()).toEqual(Infinity);
      });

      test('NaN', () => {
        expect(isNaN(Complex.NAN.getRe())).toBeTruthy();
      });
    });
  });

  describe('Imaginary Part', () => {
    test('Im(z)', () => {
      expect(z.getIm()).toEqual(1);
    });

    describe('Special Cases', () => {
      test('Infinity', () => {
        expect(Complex.INFINITY.getIm()).toEqual(Infinity);
      });

      test('NaN', () => {
        expect(isNaN(Complex.NAN.getIm())).toBeTruthy();
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
        expect(Complex.INFINITY.modulus()).toEqual(Infinity);
      });

      test('NaN', () => {
        expect(Complex.NAN.modulus()).toEqual(NaN);
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
        expect(Complex.INFINITY.argument()).toEqual(Infinity);
      });

      test('NaN', () => {
        expect(Complex.NAN.argument()).toEqual(NaN);
      });
    });
  });
});
