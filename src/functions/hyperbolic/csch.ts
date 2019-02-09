import { Complex, isInfinite, isNaNC, isZero } from '../../';

/**
 * Calculates the hyperbolic cosecant of a Complex number.
 */
export default function csch(z: Complex): Complex {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.INFINITY;

  // We avoid numeric cancellation by expanding the denominator and simplifying with trig rules.
  const a: number = z.getRe();
  const b: number = z.getIm();
  const d: number = Math.cos(2 * b) - Math.cosh(2 * a);

  return new Complex(
    (-2 * Math.sinh(a) * Math.cos(b)) / d,
    (2 * Math.cosh(a) * Math.sin(b)) / d
  );
}
