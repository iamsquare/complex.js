//TODO: test and eventually fix precision errors
/**
 * Cartesian Coordinate type definition
 */
export type Cartesian = {
  x: number;
  y: number;
};

/**
 * An helper function that checks if an object is a Cartesian coordinate
 *
 * @export
 * @param x
 */
export function isCartesian(x: any): x is Cartesian {
  if (x === undefined) return false;
  return x.x !== undefined && x.y !== undefined;
}

/**
 * Polar coordinate type definition
 */
export type Polar = {
  r: number;
  p: number;
};

/**
 * An helper function that checks if an object is a Polar coordinate
 *
 * @export
 * @param x
 */
export function isPolar(x: any): x is Polar {
  if (x === undefined) return false;
  return x.r !== undefined && x.p !== undefined;
}

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
    } else if (r === Infinity || i === Infinity) {
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
   * Gets the real part of a complex number.
   */
  getRe(): number {
    return this.re;
  }

  /**
   * Gets the imaginary part of a complex number.
   */
  getIm(): number {
    return this.im;
  }

  round(): Complex {
    let r: number = Math.abs(this.re) > Complex.EPSILON ? this.re : 0;
    let i: number = Math.abs(this.im) > Complex.EPSILON ? this.im : 0;
    return new Complex(r, i);
  }

  /**
   * Calculates the modulus squared of a complex number.
   */
  modulus2(): number {
    let m2: number = this.re * this.re + this.im * this.im;
    let gtEpsilon = Math.abs(m2) > Complex.EPSILON;

    return gtEpsilon ? m2 : 1;
  }

  /**
   * Calculates the modulus of a complex number.
   */
  modulus(): number {
    return Math.sqrt(this.modulus2());
  }

  /**
   * Gets the argument of a complex number.
   */
  argument(): number {
    return Math.atan2(this.im, this.re);
  }

  isReal(): boolean {
    return Math.abs(this.im) <= Complex.EPSILON;
  }

  /**
   * Returns true when a complex number is 0 + 0i.
   */
  isZero(): boolean {
    return this.equals(Complex.ZERO);
  }

  /**
   * Returns true when a complex number is ∞.
   */
  isInfinite(): boolean {
    return this.equals(Complex.INFINITY);
  }

  /**
   * Returns true whe a complex number is NaN.
   */
  isNaN(): boolean {
    return isNaN(this.re) || isNaN(this.im);
  }

  /**
   * Negates a complex number
   */
  negate(): Complex {
    if (this.isInfinite()) return Complex.INFINITY;
    if (this.isNaN()) return Complex.NAN;

    return new Complex(-this.re, -this.im);
  }

  /**
   * Calculates the complex-conjugate of a complex number.
   */
  conjugate(): Complex {
    if (this.isInfinite()) return Complex.INFINITY;
    if (this.isNaN()) return Complex.NAN;

    return new Complex(this.re, -this.im);
  }

  /**
   * Calculates 1 / z
   */
  inverse(): Complex {
    if (this.isZero()) return Complex.INFINITY;
    if (this.isInfinite()) return Complex.ZERO;

    let d: number = this.modulus2();

    return new Complex(this.re / d, -this.im / d);
  }

  /**
   * Calculates the unit vector of a complex number.
   */
  unit(): Complex {
    if (this.isInfinite()) return Complex.INFINITY;
    if (this.isNaN()) return Complex.NAN;

    const m: number = this.modulus();

    return new Complex(this.re / m, this.im / m);
  }

  /**
   * Calculates the square-root of a complex number.
   */
  sqrt(): Complex {
    if (this.isInfinite()) return Complex.INFINITY;
    if (this.isNaN()) return Complex.NAN;

    const a: number = Math.SQRT1_2; //0.5 * sqrt(2)
    const m: number = this.modulus();
    const is: number = this.im >= 0 ? 1 : -1;

    return new Complex(a * Math.sqrt(m + this.re), a * is * Math.sqrt(m - this.re));
  }

  /**
   * Calculates e^z
   */
  exp(): Complex {
    if (this.im === Infinity || this.isInfinite()) return Complex.NAN;
    if (this.isZero()) return Complex.ONE;

    return new Complex({ r: Math.exp(this.re), p: this.im });
  }

  /**
   * Calculates the principal value of Ln(z)
   */
  log(): Complex {
    return new Complex(Math.log(this.modulus()), this.argument());
  }

  /**
   * Calculates z + w
   */
  plus(z: Complex): Complex {
    if ((this.isInfinite() && z.isInfinite()) || this.isNaN() || z.isNaN()) return Complex.NAN;
    if (this.isInfinite() || z.isInfinite()) return Complex.INFINITY;

    return new Complex(this.re + z.re, this.im + z.im);
  }

  /**
   * Calculates z - w
   */
  minus(z: Complex): Complex {
    return this.plus(z.negate());
  }

  /**
   * Calculates z * w
   */
  times(z: Complex): Complex {
    if ((this.isZero() && z.isInfinite()) || (this.isInfinite() && z.isZero())) return Complex.NAN;
    if (this.isInfinite() || z.isInfinite()) return Complex.INFINITY;
    //if (this.isReal() && z.isReal()) return new Complex(this.re * z.re, 0);

    return new Complex(this.re * z.re - this.im * z.im, this.re * z.im + this.im * z.re);
  }

  /**
   * Calculates z / w
   * */
  divide(z: Complex): Complex {
    if ((this.isZero() && z.isZero()) || (this.isInfinite() && z.isInfinite())) return Complex.NAN;
    if (this.isInfinite() || z.isZero()) return Complex.INFINITY;
    if (this.isZero() || z.isInfinite()) return Complex.ZERO;

    let d: number = z.re * z.re + z.im * z.im;
    return new Complex((this.re * z.re + this.im * z.im) / d, (this.im * z.re - this.re * z.im) / d);
  }

  /**
   * Returns true when z === w
   */
  equals(z: Complex): boolean {
    if ((this.re === Infinity && z.re === Infinity) || (this.im === Infinity && z.im === Infinity)) return true;
    if (this.isNaN() || z.isNaN()) return false;

    return Math.abs(this.re - z.re) <= Complex.EPSILON && Math.abs(this.im - z.im) <= Complex.EPSILON;
  }

  /**
   * Returns true when z !== w
   */
  notEquals(z: Complex): boolean {
    return !this.equals(z);
  }

  /**
   * A method that formats a complex number to: a + bi
   */
  toString(): string {
    if (this.isNaN()) return 'NaN';
    if (this.isInfinite()) return 'Infinite';
    if (this.isZero()) return '0';

    let re: string = this.re !== 0 || this.isReal() ? `${this.re}` : '';
    let im: string = !this.isReal() ? `${Math.abs(this.im)} i` : '';
    let i: string = !this.isReal() ? (Math.sign(this.im) ? ' + ' : ' - ') : '';

    return `${re}${i}${im}`;
  }

  /**
   * A method that returns a complex number in Cartesian coordinates
   */
  toCartesian(): Cartesian {
    let x = Math.abs(this.re) > Complex.EPSILON ? this.re : 0;
    let y = Math.abs(this.im) > Complex.EPSILON ? this.im : 0;
    return { x, y };
  }

  /**
   * A method that returns a complex number in Polar coordinates
   */
  toPolar(): Polar {
    return { r: this.modulus(), p: this.argument() };
  }

  /**
   * Costant zero
   */
  static ZERO: Complex = new Complex(0, 0);

  /**
   * Constant one
   */
  static ONE: Complex = new Complex(1, 0);

  /**
   * Constant i
   */
  static I: Complex = new Complex(0, 1);

  /**
   * Constant pi
   */
  static PI: Complex = new Complex(Math.PI, 0);

  /**
   * Constant e
   */
  static E: Complex = new Complex(Math.E, 0);

  /**
   * Infinity
   */
  static INFINITY: Complex = new Complex(Infinity, Infinity);

  /**
   * Not a number
   */
  static NAN: Complex = new Complex(NaN, NaN);

  /**
   * Maximum floating precision - smaller values are considered as 0
   */
  //TODO: add configuration to EPSILON static member
  static EPSILON: number = 10e-10;
}
