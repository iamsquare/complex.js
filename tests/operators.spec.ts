import Complex from '../src/complex';

describe('Operators', () => {
  let z: Complex = new Complex(1, 1);
  let w: Complex = new Complex(2, 3);

  test('Addition', () => {
    let c: Complex = z.plus(w);

    expect(c.getRe()).toEqual(3);
    expect(c.getIm()).toEqual(4);
  });

  test('Subtraction', () => {
    let c: Complex = z.minus(w);

    expect(c.getRe()).toEqual(-1);
    expect(c.getIm()).toEqual(-2);
  });

  test('Multiplication', () => {
    let c: Complex = z.times(w);

    expect(c.getRe()).toEqual(-1);
    expect(c.getIm()).toEqual(5);
  });

  test('Division', () => {
    let c: Complex = z.divide(w);

    expect(c.getRe()).toBeCloseTo(5 / 13, 5);
    expect(c.getIm()).toBeCloseTo(-1 / 13, 5);
  });

  test('Negation', () => {
    let c: Complex = z.negate();

    expect(c.getRe()).toEqual(-1);
    expect(c.getIm()).toEqual(-1);
  });

  test('Real Part', () => {
    expect(z.getRe()).toEqual(1);
  });

  test('Imaginary Part', () => {
    expect(z.getIm()).toEqual(1);
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

    test('-Infinite', () => {
      expect(Complex.INFINITY.negate()).toEqual(Complex.INFINITY);
    });

    test('-NaN', () => {
      expect(Complex.NAN.negate()).toEqual(Complex.NAN);
    });
  });
});
