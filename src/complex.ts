// TODO: test and fix eventual precision errors
// TODO: add rounding function

import { type Cartesian, isCartesian, isPolar, type Polar } from '~/helpers';
import { isPureImaginary } from '~/operations';
import { argument } from '~/operations/argument';
import { isInfinite } from '~/operations/isInfinite';
import { isNaNC } from '~/operations/isNaNC';
import { isReal } from '~/operations/isReal';
import { isZero } from '~/operations/isZero';
import { modulus } from '~/operations/modulus';

/**
 * A class that represents complex numbers and provides operations for working with them.
 *
 * Complex numbers are numbers of the form a + ib, where a is the real part and b is the imaginary part,
 * and i is the imaginary unit (i² = -1).
 *
 * @example
 * ```typescript
 * // Create from numeric arguments (real, imaginary)
 * const z1 = new Complex(1, -1);
 *
 * // Create from Cartesian coordinates
 * const z2 = new Complex({ x: 1, y: -3 });
 *
 * // Create from Polar coordinates (radius, phase in radians)
 * const z3 = new Complex({ r: 1, p: Math.PI / 2 });
 *
 * // Create from another Complex number
 * const z4 = new Complex(z1);
 * ```
 */
export class Complex {
  /**
   * Creates an instance of Complex from another Complex number.
   *
   * @param z - The Complex number to copy.
   * @returns A new Complex instance with the same real and imaginary parts as z.
   *
   * @example
   * ```typescript
   * const z1 = new Complex(3, 4);
   * const z2 = new Complex(z1);
   * console.log(z2.toString()); // => "3 + 4i"
   * ```
   */
  constructor(z: Complex);
  /**
   * Creates an instance of Complex from a Cartesian coordinate.
   *
   * @param c - The Cartesian coordinate object with x (real) and y (imaginary) properties.
   * @returns A new Complex instance with real part c.x and imaginary part c.y.
   *
   * @example
   * ```typescript
   * const z = new Complex({ x: 2, y: 3 });
   * console.log(z.toString()); // => "2 + 3i"
   * ```
   */
  constructor(c: Cartesian);
  /**
   * Creates an instance of Complex from a Polar coordinate.
   *
   * @param p - The Polar coordinate object with r (radius/modulus) and p (phase/argument in radians).
   * @returns A new Complex instance converted from polar form to Cartesian form.
   *
   * @example
   * ```typescript
   * const z = new Complex({ r: 1, p: Math.PI / 2 });
   * console.log(z.toString()); // => "0 + 1i" (approximately)
   * ```
   */
  constructor(p: Polar);
  /**
   * Creates an instance of Complex from two optional numeric values.
   *
   * If a value is omitted, it defaults to 0. If either value is NaN, the result is Complex.NAN.
   * If either value is infinite, the result is Complex.INFINITY.
   *
   * @param re - The real part of the complex number. Defaults to 0 if omitted.
   * @param im - The imaginary part of the complex number. Defaults to 0 if omitted.
   * @returns A new Complex instance with the specified real and imaginary parts.
   *
   * @example
   * ```typescript
   * const z1 = new Complex(1, -1);
   * const z2 = new Complex(5); // imaginary part defaults to 0
   * const z3 = new Complex(); // both default to 0
   * ```
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
   * Gets the real part of this Complex number.
   *
   * @returns The real part (a) of the complex number a + ib.
   *
   * @example
   * ```typescript
   * const z = new Complex(3, 4);
   * console.log(z.getRe()); // => 3
   * ```
   */
  getRe() {
    return this.re;
  }

  /**
   * Gets the imaginary part of this Complex number.
   *
   * @returns The imaginary part (b) of the complex number a + ib.
   *
   * @example
   * ```typescript
   * const z = new Complex(3, 4);
   * console.log(z.getIm()); // => 4
   * ```
   */
  getIm() {
    return this.im;
  }

  /**
   * Formats this complex number as a string in the form "±a ± bi".
   *
   * Special cases:
   * - Returns "NaN" if the number is Complex.NAN
   * - Returns "Infinite" if the number is Complex.INFINITY
   * - Returns "0" if the number is zero
   * - Omits the real part if it's zero and the imaginary part is non-zero
   * - Omits the imaginary part if it's zero
   *
   * @returns A string representation of the complex number in the format "±a ± bi".
   *
   * @example
   * ```typescript
   * const z1 = new Complex(3, 4);
   * console.log(z1.toString()); // => "3 + 4i"
   *
   * const z2 = new Complex(-2, -5);
   * console.log(z2.toString()); // => "-2 - 5i"
   *
   * const z3 = new Complex(0, 3);
   * console.log(z3.toString()); // => "3i"
   * ```
   */
  toString() {
    if (isNaNC(this)) return 'NaN';
    if (isInfinite(this)) return 'Infinite';
    if (isZero(this)) return '0';
    if (isReal(this)) return `${this.re}`;
    if (isPureImaginary(this)) return `${this.im} i`;

    const sign = this.im > 0 ? ' + ' : ' - ';

    return `${this.re}${sign}${this.im} i`;
  }

  /**
   * Converts this complex number to Cartesian coordinates.
   *
   * @returns An object with x (real part) and y (imaginary part) properties.
   *
   * @example
   * ```typescript
   * const z = new Complex(3, 4);
   * const cart = z.toCartesian();
   * console.log(cart); // => { x: 3, y: 4 }
   * ```
   */
  toCartesian() {
    return { x: this.re, y: this.im } as Cartesian;
  }

  /**
   * Converts this complex number to Polar coordinates.
   *
   * @returns An object with r (modulus/radius) and p (argument/phase in radians) properties.
   *
   * @example
   * ```typescript
   * const z = new Complex(1, 1);
   * const polar = z.toPolar();
   * console.log(polar.r); // => ~1.414 (√2)
   * console.log(polar.p); // => ~0.785 (π/4)
   * ```
   */
  toPolar() {
    return { r: modulus(this), p: argument(this) } as Polar;
  }

  /**
   * The complex number zero: 0 + 0i.
   *
   * @example
   * ```typescript
   * const z = Complex.ZERO;
   * console.log(z.toString()); // => "0"
   * ```
   */
  static ZERO = new Complex(0, 0);

  /**
   * The complex number one: 1 + 0i.
   *
   * @example
   * ```typescript
   * const z = Complex.ONE;
   * console.log(z.toString()); // => "1"
   * ```
   */
  static ONE = new Complex(1, 0);

  /**
   * The imaginary unit: 0 + 1i.
   *
   * @example
   * ```typescript
   * const z = Complex.I;
   * console.log(z.toString()); // => "1i"
   * ```
   */
  static I = new Complex(0, 1);

  /**
   * The complex number pi: π + 0i.
   *
   * @example
   * ```typescript
   * const z = Complex.PI;
   * console.log(z.getRe()); // => Math.PI
   * ```
   */
  static PI = new Complex(Math.PI, 0);

  /**
   * The complex number pi/2: π/2 + 0i.
   *
   * @example
   * ```typescript
   * const z = Complex.HALFPI;
   * console.log(z.getRe()); // => Math.PI / 2
   * ```
   */
  static HALFPI = new Complex(Math.PI / 2, 0);

  /**
   * The complex number e (Euler's number): e + 0i.
   *
   * @example
   * ```typescript
   * const z = Complex.E;
   * console.log(z.getRe()); // => Math.E
   * ```
   */
  static E = new Complex(Math.E, 0);

  /**
   * The complex number infinity: ∞ + ∞i.
   *
   * Represents complex infinity on the [Riemann sphere](https://en.wikipedia.org/wiki/Riemann_sphere).
   *
   * @example
   * ```typescript
   * const z = Complex.INFINITY;
   * console.log(z.toString()); // => "Infinite"
   * ```
   */
  static INFINITY = new Complex(Infinity, Infinity);

  /**
   * The complex number NaN: NaN + NaNi.
   *
   * Represents an invalid complex number result.
   *
   * @example
   * ```typescript
   * const z = Complex.NAN;
   * console.log(z.toString()); // => "NaN"
   * ```
   */
  static NAN = new Complex(NaN, NaN);

  /**
   * The machine epsilon value: the difference between 1 and the smallest floating point number greater than 1.
   *
   * This is equivalent to `Number.EPSILON` and is used for floating-point comparisons.
   *
   * @example
   * ```typescript
   * console.log(Complex.EPSILON); // => Number.EPSILON
   * ```
   */
  static EPSILON = Number.EPSILON;
}
