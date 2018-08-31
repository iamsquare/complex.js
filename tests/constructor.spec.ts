import Complex, { isCartesian, Cartesian, isPolar, Polar } from '../src/complex';

describe('Complex constructor', () => {
  test('Should Exist', () => {
    expect(Complex).toBeDefined();
  });

  describe('Value is Complex', () => {
    test('new Complex(z: Complex) => re: z.re, im: z.im', () => {
      let z: Complex = new Complex(1, 0);
      let w: Complex = new Complex(z);

      expect(w).toEqual(z);
    });
  });

  describe('Value is a number', () => {
    test('new Complex() => re: 0, im: 0', () => {
      let z: Complex = new Complex();

      expect(z).toEqual(Complex.ZERO);
    });

    test('new Complex(1) => re: 1, im: 0', () => {
      let z: Complex = new Complex(1);

      expect(z).toEqual(Complex.ONE);
    });

    test('new Complex(1, 1) => re: 1, im: 0', () => {
      let z: Complex = new Complex(1, 1);

      expect(z.getRe()).toEqual(1);
      expect(z.getIm()).toEqual(1);
    });
  });
  describe('Special inputs', () => {
    let cartesian: Cartesian = { x: 1, y: 1 };
    let polar: Polar = { r: 1, p: Math.PI / 2 };

    describe('Value is a Polar coordinate', () => {
      test('isCartesian({r: number, p: number})', () => {
        expect(isPolar(cartesian)).toBeFalsy();
        expect(isPolar(polar)).toBeTruthy();
      });

      test('new Complex({r: 1, p: Math.PI / 2}) => re: 0, im: 1', () => {
        let z: Complex = new Complex(polar);

        expect(z.getRe()).toBeCloseTo(0, 5);
        expect(z.getIm()).toBeCloseTo(1, 5);
      });
    });

    describe('Value is a Cartesian coordinate', () => {
      test('isCartesian({x: number, y: number})', () => {
        expect(isCartesian(cartesian)).toBeTruthy();
        expect(isCartesian(polar)).toBeFalsy();
      });

      test('new Complex({x: 1, y: 1}) => re: 1, im: 1', () => {
        let z: Complex = new Complex(cartesian);

        expect(z.getRe()).toEqual(1);
        expect(z.getIm()).toEqual(1);
      });
    });
  });

  describe('Value is NaN', () => {
    test('new Complex(NaN) => re: NaN, im: NaN', () => {
      let z: Complex = new Complex(NaN);

      expect(z).toEqual(Complex.NAN);
    });

    test('new Complex(NaN, NaN) => re: NaN, im: NaN', () => {
      let z: Complex = new Complex(NaN, NaN);

      expect(z).toEqual(Complex.NAN);
    });
  });

  describe('Value is Infinity', () => {
    test('new Complex(Infinity) => re: Infinity, im: Infinity', () => {
      let z: Complex = new Complex(Infinity);

      expect(z).toEqual(Complex.INFINITY);
    });

    test('new Complex(Infinity, Infinity) => re: Infinity, im: Infinity', () => {
      let z: Complex = new Complex(Infinity, Infinity);

      expect(z).toEqual(Complex.INFINITY);
    });
  });
});
