// TODO: test and fix eventual precision errors
// TODO: add rounding function

import { Cartesian, isCartesian, Polar, isPolar } from './helpers';
import { isNaNC, isInfinite, isZero, isReal, modulus, argument } from './operations';

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
class Complex {
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
  getRe(): number {
    return this.re;
  }

  /**
   * Gets the imaginary part of a Complex number.
   */
  getIm(): number {
    return this.im;
  }

  /**
   * A method that formats a complex number to: ±a ± bi.
   * @todo Find a more elegant solution.
   */
  toString(): string {
    if (isNaNC(this)) return 'NaN';
    if (isInfinite(this)) return 'Infinite';
    if (isZero(this)) return '0';

    const re: string = this.re !== 0 || isReal(this) ? `${this.re}` : '';
    const im: string = !isReal(this) ? `${Math.abs(this.im)} i` : '';
    const sign: string = !isReal(this)
      ? Math.sign(this.im) > 0
        ? ' + '
        : ' - '
      : '';

    return `${re}${sign}${im}`;
  }

  /**
   * A method that returns a complex number in Cartesian coordinates.
   */
  toCartesian(): Cartesian {
    return { x: this.re, y: this.im };
  }

  /**
   * A method that returns a complex number in Polar coordinates.
   */
  toPolar(): Polar {
    return { r: modulus(this), p: argument(this) };
  }

  /**
   * Costant zero: z = 0.
   */
  static ZERO: Complex = new Complex(0, 0);

  /**
   * Constant one: z = 1.
   */
  static ONE: Complex = new Complex(1, 0);

  /**
   * Constant i: z = i.
   */
  static I: Complex = new Complex(0, 1);

  /**
   * Constant pi: z = π.
   */
  static PI: Complex = new Complex(Math.PI, 0);

  /**
   * Constant pi: z = π / 2.
   */
  static HALFPI: Complex = new Complex(Math.PI / 2, 0);

  /**
   * Constant e: z = e.
   */
  static E: Complex = new Complex(Math.E, 0);

  /**
   * Infinity: [z = ∞](https://en.wikipedia.org/wiki/Riemann_sphere).
   */
  static INFINITY: Complex = new Complex(Infinity, Infinity);

  /**
   * Not a number: z = NaN.
   */
  static NAN: Complex = new Complex(NaN, NaN);

  /**
   * Difference between 1 and the smallest floating point number greater than 1.
   * Simply stores Number.EPSILON in a static property.
   */
  static EPSILON: number = Number.EPSILON;
}

export { Complex };
