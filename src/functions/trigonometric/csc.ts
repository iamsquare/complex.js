import { Complex, isInfinite, isZero, isNaNC } from '../../';

/**
 * Calculates the cosecant of a Complex number.
 */
export default function csc(z: Complex): Complex {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.INFINITY;

  // We avoid numeric cancellation by expanding the denominator and simplifying with trigonometric rules.
  const a: number = z.getRe();
  const b: number = z.getIm();
  const d: number = Math.cosh(2 * b) - Math.cos(2 * a);

  return new Complex(
    (2 * (Math.sin(a) * Math.cosh(b))) / d,
    -(2 * (Math.cos(a) * Math.sinh(b))) / d
  );
}
