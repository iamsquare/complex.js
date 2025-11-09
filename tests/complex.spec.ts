import { describe, expect, test } from 'vitest';

import { Complex } from '~/complex';

const ZERO = Complex.ZERO;
const ONE = Complex.ONE;
const I = Complex.I;
const INFINITY = Complex.INFINITY;
const NAN = Complex.NAN;

describe('Complex', () => {
  describe('Constructor', () => {
    describe('from numeric arguments', () => {
      test('new Complex() creates zero', () => {
        expect(new Complex()).toEqual(ZERO);
      });

      test('new Complex(re) creates real number', () => {
        expect(new Complex(5)).toBeComplexCloseTo(new Complex(5, 0));
      });

      test('new Complex(re, im) creates complex number', () => {
        expect(new Complex(3, 4)).toBeComplexCloseTo(new Complex(3, 4));
      });

      test('new Complex(re, im) handles negative values', () => {
        expect(new Complex(-5, -3)).toBeComplexCloseTo(new Complex(-5, -3));
      });

      test('new Complex(re, im) handles decimal values', () => {
        expect(new Complex(0.1, 0.2)).toBeComplexCloseTo(new Complex(0.1, 0.2));
      });

      test('new Complex(re, im) handles very small values', () => {
        expect(new Complex(1e-15, 2e-15)).toBeComplexCloseTo(new Complex(1e-15, 2e-15));
      });

      test('new Complex(re, im) handles very large values', () => {
        expect(new Complex(1e15, 2e15)).toBeComplexCloseTo(new Complex(1e15, 2e15));
      });
    });

    describe('from Complex instance', () => {
      test('new Complex(z) creates copy', () => {
        const z = new Complex(3, 4);
        const w = new Complex(z);

        expect(w).not.toBe(z);
        expect(w).toBeComplexCloseTo(z);
      });

      test('new Complex(z) copies special values correctly', () => {
        expect(new Complex(INFINITY)).toEqual(INFINITY);
        expect(new Complex(NAN)).toEqual(NAN);
        expect(new Complex(ZERO)).toEqual(ZERO);
        expect(new Complex(ONE)).toEqual(ONE);
        expect(new Complex(I)).toEqual(I);
      });
    });

    describe('from Cartesian coordinates', () => {
      test('new Complex({x, y}) creates complex number', () => {
        expect(new Complex({ x: 3, y: 4 })).toBeComplexCloseTo(new Complex(3, 4));
      });

      test('new Complex({x, y}) handles negative values', () => {
        expect(new Complex({ x: -5, y: -3 })).toBeComplexCloseTo(new Complex(-5, -3));
      });

      test('new Complex({x, y}) handles zero', () => {
        expect(new Complex({ x: 0, y: 0 })).toEqual(ZERO);
      });
    });

    describe('from Polar coordinates', () => {
      test('new Complex({r, p}) converts to Cartesian correctly', () => {
        expect(new Complex({ r: 1, p: Math.PI / 2 })).toBeComplexCloseTo(new Complex(0, 1));
      });

      test('new Complex({r, p}) handles zero radius', () => {
        expect(new Complex({ r: 0, p: 0 })).toEqual(ZERO);
      });

      test('new Complex({r, p}) handles unit circle', () => {
        const angles = [0, Math.PI / 4, Math.PI / 2, Math.PI, -Math.PI / 2];
        const expected = [
          new Complex(1, 0),
          new Complex(Math.SQRT2 / 2, Math.SQRT2 / 2),
          new Complex(0, 1),
          new Complex(-1, 0),
          new Complex(0, -1),
        ];

        angles.forEach((angle, i) => {
          expect(new Complex({ r: 1, p: angle })).toBeComplexCloseTo(expected[i]);
        });
      });

      test('new Complex({r, p}) handles different quadrants', () => {
        const testCases = [
          { r: Math.SQRT2, p: Math.PI / 4, expected: new Complex(1, 1) },
          { r: Math.SQRT2, p: (3 * Math.PI) / 4, expected: new Complex(-1, 1) },
          { r: Math.SQRT2, p: -(3 * Math.PI) / 4, expected: new Complex(-1, -1) },
          { r: Math.SQRT2, p: -Math.PI / 4, expected: new Complex(1, -1) },
        ];

        testCases.forEach(({ r, p, expected }) => {
          expect(new Complex({ r, p })).toBeComplexCloseTo(expected);
        });
      });
    });

    describe('NaN handling', () => {
      test('new Complex(NaN) creates NAN', () => {
        expect(new Complex(NaN)).toEqual(NAN);
      });

      test('new Complex(NaN, NaN) creates NAN', () => {
        expect(new Complex(NaN, NaN)).toEqual(NAN);
      });

      test('new Complex(NaN, value) creates NAN', () => {
        expect(new Complex(NaN, 5)).toEqual(NAN);
      });

      test('new Complex(value, NaN) creates NAN', () => {
        expect(new Complex(5, NaN)).toEqual(NAN);
      });
    });

    describe('Infinity handling', () => {
      test('new Complex(Infinity) creates INFINITY', () => {
        expect(new Complex(Infinity)).toEqual(INFINITY);
      });

      test('new Complex(Infinity, Infinity) creates INFINITY', () => {
        expect(new Complex(Infinity, Infinity)).toEqual(INFINITY);
      });

      test('new Complex(Infinity, value) creates INFINITY', () => {
        expect(new Complex(Infinity, 5)).toEqual(INFINITY);
      });

      test('new Complex(value, Infinity) creates INFINITY', () => {
        expect(new Complex(5, Infinity)).toEqual(INFINITY);
      });

      test('new Complex(-Infinity) creates INFINITY', () => {
        expect(new Complex(-Infinity)).toEqual(INFINITY);
      });

      test('new Complex(-Infinity, -Infinity) creates INFINITY', () => {
        expect(new Complex(-Infinity, -Infinity)).toEqual(INFINITY);
      });
    });
  });

  describe('Getters', () => {
    describe('getRe()', () => {
      test('returns real part for standard complex number', () => {
        expect(new Complex(3, 4).getRe()).toBe(3);
      });

      test('returns negative real part', () => {
        expect(new Complex(-5, 3).getRe()).toBe(-5);
      });

      test('returns zero for pure imaginary number', () => {
        expect(I.getRe()).toBe(0);
        expect(new Complex(0, 5).getRe()).toBe(0);
      });

      test('handles special values', () => {
        expect(ZERO.getRe()).toBe(0);
        expect(ONE.getRe()).toBe(1);
        expect(INFINITY.getRe()).toBe(Infinity);
        expect(Number.isNaN(NAN.getRe())).toBe(true);
      });
    });

    describe('getIm()', () => {
      test('returns imaginary part for standard complex number', () => {
        expect(new Complex(3, 4).getIm()).toBe(4);
      });

      test('returns negative imaginary part', () => {
        expect(new Complex(5, -3).getIm()).toBe(-3);
      });

      test('returns zero for real number', () => {
        expect(ONE.getIm()).toBe(0);
        expect(new Complex(5, 0).getIm()).toBe(0);
      });

      test('handles special values', () => {
        expect(ZERO.getIm()).toBe(0);
        expect(I.getIm()).toBe(1);
        expect(INFINITY.getIm()).toBe(Infinity);
        expect(Number.isNaN(NAN.getIm())).toBe(true);
      });
    });

    describe('getComponents()', () => {
      test('returns both real and imaginary parts for standard complex number', () => {
        const z = new Complex(3, 4);
        const { re, im } = z.getComponents();

        expect(re).toBe(3);
        expect(im).toBe(4);
      });

      test('returns negative values correctly', () => {
        const z = new Complex(-5, -3);
        const { re, im } = z.getComponents();

        expect(re).toBe(-5);
        expect(im).toBe(-3);
      });

      test('returns zero for both parts', () => {
        const { re, im } = ZERO.getComponents();

        expect(re).toBe(0);
        expect(im).toBe(0);
      });

      test('returns correct values for real number', () => {
        const { re, im } = ONE.getComponents();

        expect(re).toBe(1);
        expect(im).toBe(0);
      });

      test('returns correct values for pure imaginary number', () => {
        const { re, im } = I.getComponents();

        expect(re).toBe(0);
        expect(im).toBe(1);
      });

      test('handles special values', () => {
        const infComponents = INFINITY.getComponents();
        const nanComponents = NAN.getComponents();

        expect(infComponents.re).toBe(Infinity);
        expect(infComponents.im).toBe(Infinity);

        expect(Number.isNaN(nanComponents.re)).toBe(true);
        expect(Number.isNaN(nanComponents.im)).toBe(true);
      });

      test('returns same values as getRe() and getIm()', () => {
        const z = new Complex(3, 4);
        const { re, im } = z.getComponents();

        expect(re).toBe(z.getRe());
        expect(im).toBe(z.getIm());
      });
    });
  });

  describe('toString()', () => {
    describe('special values', () => {
      test('ZERO.toString() returns "0"', () => {
        expect(ZERO.toString()).toBe('0');
      });

      test('NAN.toString() returns "NaN"', () => {
        expect(NAN.toString()).toBe('NaN');
      });

      test('INFINITY.toString() returns "Infinite"', () => {
        expect(INFINITY.toString()).toBe('Infinite');
      });
    });

    describe('real numbers', () => {
      test('returns number string for positive real numbers', () => {
        expect(ONE.toString()).toBe('1');
        expect(new Complex(5, 0).toString()).toBe('5');
      });

      test('returns number string for negative real numbers', () => {
        expect(new Complex(-3, 0).toString()).toBe('-3');
        expect(new Complex(-100, 0).toString()).toBe('-100');
      });
    });

    describe('pure imaginary numbers', () => {
      test('returns "bi" for positive imaginary part', () => {
        expect(I.toString()).toBe('1 i');
        expect(new Complex(0, 5).toString()).toBe('5 i');
      });

      test('returns "-bi" for negative imaginary part', () => {
        expect(new Complex(0, -3).toString()).toBe('-3 i');
        expect(new Complex(0, -100).toString()).toBe('-100 i');
      });
    });

    describe('complex numbers with both parts', () => {
      test('returns "a + bi" for positive imaginary part', () => {
        expect(new Complex(3, 4).toString()).toBe('3 + 4 i');
        expect(new Complex(-2, 5).toString()).toBe('-2 + 5 i');
      });

      test('returns "a - bi" for negative imaginary part', () => {
        expect(new Complex(3, -4).toString()).toBe('3 - 4 i');
        expect(new Complex(-2, -5).toString()).toBe('-2 - 5 i');
      });
    });

    describe('edge cases', () => {
      test('handles small numbers', () => {
        expect(new Complex(0.1, 0.2).toString()).toBe('0.1 + 0.2 i');
      });

      test('handles large numbers', () => {
        expect(new Complex(1000, 2000).toString()).toBe('1000 + 2000 i');
      });

      test('handles very small numbers', () => {
        expect(new Complex(1e-10, 2e-10).toString()).toBe('1e-10 + 2e-10 i');
      });
    });
  });

  describe('toCartesian()', () => {
    test('returns correct Cartesian coordinates', () => {
      expect(new Complex(3, 4).toCartesian()).toEqual({ x: 3, y: 4 });
    });

    test('returns negative coordinates', () => {
      expect(new Complex(-5, -3).toCartesian()).toEqual({ x: -5, y: -3 });
    });

    test('handles special values', () => {
      expect(ZERO.toCartesian()).toEqual({ x: 0, y: 0 });
      expect(ONE.toCartesian()).toEqual({ x: 1, y: 0 });
      expect(I.toCartesian()).toEqual({ x: 0, y: 1 });

      const infCart = INFINITY.toCartesian();
      expect(infCart.x).toBe(Infinity);
      expect(infCart.y).toBe(Infinity);

      const nanCart = NAN.toCartesian();
      expect(Number.isNaN(nanCart.x)).toBe(true);
      expect(Number.isNaN(nanCart.y)).toBe(true);
    });
  });

  describe('toPolar()', () => {
    test('returns correct polar coordinates for standard complex number', () => {
      expect(new Complex(1, 1).toPolar()).toBePolarCloseTo({ r: Math.SQRT2, p: Math.PI / 4 });
    });

    test('handles zero', () => {
      expect(ZERO.toPolar()).toEqual({ r: 0, p: 0 });
    });

    test('handles real numbers', () => {
      expect(ONE.toPolar()).toEqual({ r: 1, p: 0 });

      expect(new Complex(-1, 0).toPolar()).toBePolarCloseTo({ r: 1, p: Math.PI });
    });

    test('handles pure imaginary numbers', () => {
      expect(I.toPolar()).toBePolarCloseTo({ r: 1, p: Math.PI / 2 });
      expect(new Complex(0, -1).toPolar()).toBePolarCloseTo({ r: 1, p: -Math.PI / 2 });
    });

    test('handles all quadrants', () => {
      const testCases = [
        { z: new Complex(1, 1), r: Math.SQRT2, p: Math.PI / 4 },
        { z: new Complex(-1, 1), r: Math.SQRT2, p: (3 * Math.PI) / 4 },
        { z: new Complex(-1, -1), r: Math.SQRT2, p: -(3 * Math.PI) / 4 },
        { z: new Complex(1, -1), r: Math.SQRT2, p: -Math.PI / 4 },
      ];

      testCases.forEach(({ z, r, p }) => {
        expect(z.toPolar()).toBePolarCloseTo({ r, p });
      });
    });

    test('handles special values', () => {
      const infPolar = INFINITY.toPolar();
      expect(infPolar.r).toBe(Infinity);
      expect(infPolar.p).toBe(Infinity);

      const nanPolar = NAN.toPolar();
      expect(Number.isNaN(nanPolar.r)).toBe(true);
      expect(Number.isNaN(nanPolar.p)).toBe(true);
    });
  });

  describe('Static properties', () => {
    describe('ZERO', () => {
      test('has correct real and imaginary parts', () => {
        expect(Complex.ZERO.getRe()).toBe(0);
        expect(Complex.ZERO.getIm()).toBe(0);
      });

      test('equals new Complex(0, 0)', () => {
        expect(Complex.ZERO).toEqual(new Complex(0, 0));
      });
    });

    describe('ONE', () => {
      test('has correct real and imaginary parts', () => {
        expect(Complex.ONE.getRe()).toBe(1);
        expect(Complex.ONE.getIm()).toBe(0);
      });

      test('equals new Complex(1, 0)', () => {
        expect(Complex.ONE).toEqual(new Complex(1, 0));
      });
    });

    describe('I', () => {
      test('has correct real and imaginary parts', () => {
        expect(Complex.I.getRe()).toBe(0);
        expect(Complex.I.getIm()).toBe(1);
      });

      test('equals new Complex(0, 1)', () => {
        expect(Complex.I).toEqual(new Complex(0, 1));
      });
    });

    describe('PI', () => {
      test('has correct real and imaginary parts', () => {
        expect(Complex.PI.getRe()).toBe(Math.PI);
        expect(Complex.PI.getIm()).toBe(0);
      });

      test('equals new Complex(Math.PI, 0)', () => {
        expect(Complex.PI).toEqual(new Complex(Math.PI, 0));
      });
    });

    describe('HALFPI', () => {
      test('has correct real and imaginary parts', () => {
        expect(Complex.HALFPI.getRe()).toBe(Math.PI / 2);
        expect(Complex.HALFPI.getIm()).toBe(0);
      });

      test('equals new Complex(Math.PI / 2, 0)', () => {
        expect(Complex.HALFPI).toEqual(new Complex(Math.PI / 2, 0));
      });
    });

    describe('E', () => {
      test('has correct real and imaginary parts', () => {
        expect(Complex.E.getRe()).toBe(Math.E);
        expect(Complex.E.getIm()).toBe(0);
      });

      test('equals new Complex(Math.E, 0)', () => {
        expect(Complex.E).toEqual(new Complex(Math.E, 0));
      });
    });

    describe('INFINITY', () => {
      test('has correct real and imaginary parts', () => {
        expect(Complex.INFINITY.getRe()).toBe(Infinity);
        expect(Complex.INFINITY.getIm()).toBe(Infinity);
      });

      test('equals new Complex(Infinity, Infinity)', () => {
        expect(Complex.INFINITY).toEqual(new Complex(Infinity, Infinity));
      });
    });

    describe('NAN', () => {
      test('has NaN real and imaginary parts', () => {
        expect(Number.isNaN(Complex.NAN.getRe())).toBe(true);
        expect(Number.isNaN(Complex.NAN.getIm())).toBe(true);
      });

      test('equals new Complex(NaN, NaN)', () => {
        expect(Complex.NAN).toEqual(new Complex(NaN, NaN));
      });
    });
  });
});
