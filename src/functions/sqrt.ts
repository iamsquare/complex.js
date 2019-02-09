import { Complex, isNaNC, isInfinite, isZero, modulus, argument } from '../';

// tslint:disable:max-line-length
/**
 * Calculates the [principal value](https://en.wikipedia.org/wiki/Principal_value) of the square-root of a Complex number.
 * @todo Test if this implementation is better than the commented algebraic formula.
 */
// tslint:enable:max-line-length
export default function sqrt(z: Complex): Complex {
  if (isNaNC(z)) return Complex.NAN;
  if (isInfinite(z)) return Complex.INFINITY;
  if (isZero(z)) return Complex.ZERO;

  const r: number = modulus(z);
  const p: number = argument(z);

  return new Complex(
    (r / Math.sqrt(r)) * Math.cos(p / 2),
    (r / Math.sqrt(r)) * Math.sin(p / 2)
  );

  /*
    const a: number = Math.SQRT1_2; //0.5 * sqrt(2)
    const m: number = this.modulus();
    const is: number = Math.sign(this.im);
    return new Complex(a * Math.sqrt(m + this.re), a * is * Math.sqrt(m - this.re));
  */
}
