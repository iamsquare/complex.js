//TODO: test and fix eventual precision errors
//TODO: rounding function

import { Cartesian, isCartesian, Polar, isPolar } from './helpers';

/**
 * A class that descibes Complex numbers and their operations.
 */
export default class Complex {
  /**
   * Creates an instance of Complex from another Complex number.
   * @param z - The complex number
   */
  constructor(z: Complex);

  /**
   * Creates an instance of Complex from a Cartesian coordinate.
   * @param c - The cartesian coordinate
   */
  constructor(c: Cartesian);

  /**
   * Creates an instance of Complex from a Polar coordinate.
   * @param p - The polar coordinate
   */
  constructor(p: Polar);

  /**
   * Creates an instance of Complex from two optional values.
   * If a value is omitted it's considered 0.
   * @param re - The real part
   * @param im - The imaginary part
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
    } else if (isNaN(r) || isNaN(i)) {
      this.re = NaN;
      this.im = NaN;
    } else if (!isFinite(r) || !isFinite(i)) {
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
   * Calculates the modulus squared of a complex number.
   */
  pythagoras(): number {
    return this.re * this.re + this.im * this.im;
  }

  /**
   * Calculates the modulus of a Complex number.
   * @todo Test if this implementation easily overflows
   */
  modulus(): number {
    return Math.hypot(this.re, this.im);
  }

  /**
   * Gets the argument of a Complex number.
   */
  argument(): number {
    if (this.isNaN()) return NaN;
    if (this.isInfinite()) return Infinity;

    return Math.atan2(this.im, this.re);
  }

  /**
   * Returns true when a Complex number imaginary part is zero.
   */
  isReal(): boolean {
    return this.im === 0;
  }

  /**
   * Returns true when a Complex number real part is zero.
   */
  isPureImaginary(): boolean {
    return this.re === 0 && this.im !== 0;
  }

  /**
   * Returns true when a Complex number real and imaginary part are zero.
   */
  isZero(): boolean {
    return this.re === 0 && this.im === 0;
  }

  /**
   * Returns true when a Complex number is ∞.
   */
  isInfinite(): boolean {
    return this.re === Infinity || this.im === Infinity;
  }

  /**
   * Returns true when a Complex number is NaN.
   */
  isNaN(): boolean {
    return isNaN(this.re) || isNaN(this.im);
  }

  /**
   * Negates a Complex number.
   */
  negate(): Complex {
    if (this.isNaN()) return Complex.NAN;
    if (this.isInfinite()) return Complex.INFINITY;
    if (this.isZero()) return Complex.ZERO;

    return new Complex(-this.re, -this.im);
  }

  /**
   * Calculates the Complex-conjugate of a Complex number.
   */
  conjugate(): Complex {
    if (this.isNaN()) return Complex.NAN;
    if (this.isInfinite()) return Complex.INFINITY;
    if (this.isZero()) return Complex.ZERO;

    return new Complex(this.re, -this.im);
  }

  /**
   * Calculates 1 / z.
   * @todo Test if this implementation easily overflows.
   */
  inverse(): Complex {
    if (this.isNaN()) return Complex.NAN;
    if (this.isInfinite()) return Complex.ZERO;
    if (this.isZero()) return Complex.INFINITY;

    const a: number = this.re;
    const b: number = this.im;

    return new Complex(1 / (a * (1 + Math.pow(b / a, 2))), -1 / (b * (1 + Math.pow(a / b, 2))));
  }

  /**
   * Calculates the unit vector of a Complex number.
   */
  unit(): Complex {
    if (this.isNaN() || this.isZero()) return Complex.NAN;
    if (this.isInfinite()) return Complex.INFINITY;

    const m: number = this.modulus();

    return new Complex(this.re / m, this.im / m);
  }

  /**
   * Calculates the square-root of a Complex number.
   * @todo Test if this implementation is better than the commented algebraic formula.
   */
  sqrt(): Complex {
    if (this.isNaN()) return Complex.NAN;
    if (this.isInfinite()) return Complex.INFINITY;
    if (this.isZero()) return Complex.ZERO;

    const r: number = this.modulus();
    const p: number = this.argument();

    return new Complex((r / Math.sqrt(r)) * Math.cos(p / 2), (r / Math.sqrt(r)) * Math.sin(p / 2));

    /*const a: number = Math.SQRT1_2; //0.5 * sqrt(2)
      const m: number = this.modulus();
      const is: number = Math.sign(this.im);
  
      return new Complex(a * Math.sqrt(m + this.re), a * is * Math.sqrt(m - this.re));*/
  }

  /**
   * Calculates e^z, where z is the Complex number from which the method is called.
   */
  exp(): Complex {
    if (this.isNaN() || this.isInfinite()) return Complex.NAN;
    if (this.isZero()) return Complex.ONE;

    return new Complex({ r: Math.exp(this.re), p: this.im });
  }

  /**
   * Calculates the principal value of Ln(z).
   * https://en.wikipedia.org/wiki/Complex_logarithm#Definition_of_principal_value
   */
  log(): Complex {
    if (this.isNaN() || this.isZero()) return Complex.NAN;
    if (this.isInfinite()) return Complex.INFINITY;

    return new Complex(Math.log(this.modulus()), this.argument());
  }

  /**
   * Calculates the sine of a Complex number.
   */
  sin(): Complex {
    if (this.isInfinite() || this.isNaN()) return Complex.NAN;
    if (this.isZero()) return Complex.ZERO;

    const a: number = this.re;
    const b: number = this.im;

    return new Complex(Math.sin(a) * Math.cosh(b), Math.cos(a) * Math.sinh(b));
  }

  /**
   * Calculates the cosine of a Complex number.
   */
  cos(): Complex {
    if (this.isInfinite() || this.isNaN()) return Complex.NAN;
    if (this.isZero()) return Complex.ONE;

    const a: number = this.re;
    const b: number = this.im;

    return new Complex(Math.cos(a) * Math.cosh(b), -Math.sin(a) * Math.sinh(b));
  }

  /**
   * Calculates the tangent of a Complex number.
   */
  tan(): Complex {
    if (this.isInfinite() || this.isNaN()) return Complex.NAN;
    if (this.isZero()) return Complex.ZERO;

    // We avoid numeric cancellation by expanding the denominator and simplifying with trig rules.
    const a2: number = 2 * this.re;
    const b2: number = 2 * this.im;
    const d: number = Math.cos(a2) + Math.cosh(b2);

    return new Complex(Math.sin(a2) / d, Math.sinh(b2) / d);
  }

  /**
   * Calculates the hyperbolic sine of a Complex number.
   */
  sinh(): Complex {
    if (this.isInfinite() || this.isNaN()) return Complex.NAN;
    if (this.isZero()) return Complex.ZERO;

    const a: number = this.re;
    const b: number = this.im;

    return new Complex(Math.sinh(a) * Math.cos(b), Math.cosh(a) * Math.sin(b));
  }

  /**
   * Calculates the hyperbolic cosine of a Complex number.
   */
  cosh(): Complex {
    if (this.isInfinite() || this.isNaN()) return Complex.NAN;
    if (this.isZero()) return Complex.ONE;

    const a: number = this.re;
    const b: number = this.im;

    return new Complex(Math.cosh(a) * Math.cos(b), Math.sinh(a) * Math.sin(b));
  }

  /**
   * Calculates the hyperbolic tangent of a Complex number.
   */

  tanh(): Complex {
    if (this.isInfinite() || this.isNaN()) return Complex.NAN;
    if (this.isZero()) return Complex.ZERO;

    // We avoid numeric cancellation by expanding the denominator and simplifying with trig rules.
    const a2: number = 2 * this.re;
    const b2: number = 2 * this.im;
    const d: number = Math.cosh(a2) + Math.cos(b2);

    return new Complex(Math.sinh(a2) / d, Math.sin(b2) / d);
  }

  /**
   * Calculates z + w.
   */
  plus(z: Complex): Complex {
    if (this.isNaN() || z.isNaN() || (this.isInfinite() && z.isInfinite())) return Complex.NAN;
    if (this.isInfinite() || z.isInfinite()) return Complex.INFINITY;

    return new Complex(this.re + z.re, this.im + z.im);
  }

  /**
   * Calculates z - w.
   */
  minus(z: Complex): Complex {
    if (this.isNaN() || z.isNaN() || (this.isInfinite() && z.isInfinite())) return Complex.NAN;

    return new Complex(this.re - z.re, this.im - z.im);
  }

  /**
   * Calculates z * w.
   */
  times(z: Complex): Complex {
    if ((this.isZero() && z.isInfinite()) || (this.isInfinite() && z.isZero())) return Complex.NAN;
    if (this.isInfinite() || z.isInfinite()) return Complex.INFINITY;
    if (this.isZero() || z.isZero()) return Complex.ZERO;
    if (this.isReal() && z.isReal()) return new Complex(this.re * z.re, 0);

    return new Complex(this.re * z.re - this.im * z.im, this.re * z.im + this.im * z.re);
  }

  /**
   * Calculates z / w using a modified Smith's Method.
   * http://forge.scilab.org/index.php/p/compdiv/source/tree/21/doc/improved_cdiv.pdf
   * @todo Test if this implementation is actually SO better than the original Smith's method.
   * */
  divide(z: Complex): Complex {
    if ((this.isZero() && z.isZero()) || (this.isInfinite() && z.isInfinite()) || this.isNaN() || z.isNaN())
      return Complex.NAN;
    if (this.isInfinite() || z.isZero()) return Complex.INFINITY;
    if (this.isZero() || z.isInfinite()) return Complex.ZERO;

    const a: number = this.re;
    const b: number = this.im;
    const c: number = z.re;
    const d: number = z.im;

    if (Math.abs(d) < Math.abs(c)) {
      const r: number = d / c;
      const t: number = 1 / (c + d * r);

      if (r === 0) {
        return new Complex((a + d * (b / c)) * t, (b - d * (a / c)) * t);
      } else {
        return new Complex((a + b * r) * t, (b - a * r) * t);
      }
    } else {
      const r: number = c / d;
      const t: number = 1 / (c * r + d);

      if (r === 0) {
        return new Complex((c * (a / d) + b) * t, (c * (b / d) - a) * t);
      } else {
        return new Complex((a * r + b) * t, (b * r - a) * t);
      }
    }
  }

  /**
   * Returns true when z === w.
   */
  equals(z: Complex): boolean {
    if (this.isInfinite() && z.isInfinite()) return true;
    if (this.isNaN() || z.isNaN()) return false;

    return Math.abs(this.re - z.re) <= Complex.EPSILON && Math.abs(this.im - z.im) <= Complex.EPSILON;
  }

  /**
   * Returns true when z !== w.
   */
  notEquals(z: Complex): boolean {
    return !this.equals(z);
  }

  /**
   * A method that formats a complex number to: ±a ± bi.
   * @todo Find a more elegant solution.
   */
  toString(): string {
    if (this.isNaN()) return 'NaN';
    if (this.isInfinite()) return 'Infinite';
    if (this.isZero()) return '0';

    const re: string = this.re !== 0 || this.isReal() ? `${this.re}` : '';
    const im: string = !this.isReal() ? `${Math.abs(this.im)} i` : '';
    const sign: string = !this.isReal() ? (Math.sign(this.im) ? ' + ' : ' - ') : '';

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
    return { r: this.modulus(), p: this.argument() };
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
   * Constant e: z = e.
   */
  static E: Complex = new Complex(Math.E, 0);

  /**
   * Infinity: z = ∞.
   * https://en.wikipedia.org/wiki/Riemann_sphere
   */
  static INFINITY: Complex = new Complex(Infinity, Infinity);

  /**
   * Not a number: z = NaN.
   */
  static NAN: Complex = new Complex(NaN, NaN);

  /**
   * Difference between 1 and the smallest floating point number greater than 1.
   * Simply stores Number.EPSILON in a static property (ES5 might need a polyfill).
   */
  static EPSILON: number = Number.EPSILON;
}
