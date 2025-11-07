// TODO: test and fix eventual precision errors
// TODO: add rounding function

import { Cartesian, isCartesian, isPolar, Polar } from '~/helpers';
import argument from '~/operations/argument';
import isInfinite from '~/operations/isInfinite';
import isNaNC from '~/operations/isNaNC';
import isReal from '~/operations/isReal';
import isZero from '~/operations/isZero';
import modulus from '~/operations/modulus';

/**
 * A class that descibes Complex numbers and their operations.
 *
 * To define a new Complex:
  ```
  new Complex(1, -1); // Numeric arguments
  new Complex({ x: 1, y: -3 }); // Cartesian argument
  new Complex({ r: 1, p: Math.PI / 2 }); // Polar argument
  new Complex(z); // Complex argument
  ```
 *
 */
export default class Complex {
  /**
   * Creates an instance of Complex from another Complex number.
   * @param z - The Complex number.
   */
  constructor(z: Complex);
  /**
   * Creates an instance of Complex from a Cartesian coordinate.
   * @param c - The Cartesian coordinate.
   */
  constructor(c: Cartesian);
  /**
   * Creates an instance of Complex from a Polar coordinate.
   * @param p - The Polar coordinate.
   */
  constructor(p: Polar);
  /**
   * Creates an instance of Complex from two optional values.
   * If a value is omitted it's considered 0.
   * @param re - The real part.
   * @param im - The imaginary part.
   */
  constructor(re?: number, im?: number);

  constructor(r: number | Polar | Cartesian | Complex = 0, i: number = 0) {
    if (isCartesian(r)) {
      this.re = r.x;
      this.im = r.y;
    } else if (isPolar(r)) {
      this.re = r.r * Math.cos(r.p);
      this.im = r.r * Math.sin(r.p);
    } else if (r instanceof Complex) {
      this.re = r.re;
      this.im = r.im;
    } else if (Number.isNaN(r) || Number.isNaN(i)) {
      this.re = NaN;
      this.im = NaN;
    } else if (!Number.isFinite(r) || !Number.isFinite(i)) {
      this.re = Infinity;
      this.im = Infinity;
    } else {
      this.re = r;
      this.im = i;
    }
  }

  /**
   * The real part.
   *
   * @private
   */
  private re: number;

  /**
   * The imaginary part.
   *
   * @private
   */
  private im: number;

  /**
   * Gets the real part of a Complex number.
   */
  getRe() {
    return this.re;
  }

  /**
   * Gets the imaginary part of a Complex number.
   */
  getIm() {
    return this.im;
  }

  /**
   * A method that formats a complex number to: ±a ± bi.
   * @todo Find a more elegant solution.
   */
  toString() {
    if (isNaNC(this)) return 'NaN';
    if (isInfinite(this)) return 'Infinite';
    if (isZero(this)) return '0';

    const re = this.re !== 0 || isReal(this) ? `${this.re}` : '';
    const im = !isReal(this) ? `${Math.abs(this.im)} i` : '';
    const sign = !isReal(this) ? (Math.sign(this.im) > 0 ? ' + ' : ' - ') : '';

    return `${re}${sign}${im}`;
  }

  /**
   * A method that returns a complex number in Cartesian coordinates.
   */
  toCartesian() {
    return { x: this.re, y: this.im } as Cartesian;
  }

  /**
   * A method that returns a complex number in Polar coordinates.
   */
  toPolar() {
    return { r: modulus(this), p: argument(this) } as Polar;
  }

  /**
   * Costant zero: z = 0.
   */
  static ZERO = new Complex(0, 0);

  /**
   * Constant one: z = 1.
   */
  static ONE = new Complex(1, 0);

  /**
   * Constant i: z = i.
   */
  static I = new Complex(0, 1);

  /**
   * Constant pi: z = π.
   */
  static PI = new Complex(Math.PI, 0);

  /**
   * Constant pi: z = π / 2.
   */
  static HALFPI = new Complex(Math.PI / 2, 0);

  /**
   * Constant e: z = e.
   */
  static E = new Complex(Math.E, 0);

  /**
   * Infinity: [z = ∞](https://en.wikipedia.org/wiki/Riemann_sphere).
   */
  static INFINITY = new Complex(Infinity, Infinity);

  /**
   * Not a number: z = NaN.
   */
  static NAN = new Complex(NaN, NaN);

  /**
   * Difference between 1 and the smallest floating point number greater than 1.
   * Simply stores Number.EPSILON in a static property.
   */
  static EPSILON = Number.EPSILON;
}
