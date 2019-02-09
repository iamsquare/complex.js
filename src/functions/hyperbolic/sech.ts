import { Complex, isInfinite, isNaNC, isZero } from '../../';

/**
 * Calculates the hyperbolic secant of a Complex number.
 */
export default function sech(z: Complex): Complex {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ONE;

  // We avoid numeric cancellation by expanding the denominator and simplifying with trig rules.
  const a: number = z.getRe();
  const b: number = z.getIm();
  const d: number = Math.cosh(2 * a) + Math.cos(2 * b);

  return new Complex(
    (2 * Math.cosh(a) * Math.cos(b)) / d,
    (-2 * Math.sinh(a) * Math.sin(b)) / d
  );
}
