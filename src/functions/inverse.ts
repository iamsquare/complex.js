import { Complex } from '~/complex';
import { isApproximatelyEqual } from '~/lib/isApproximatelyEqual';
import { isInfinite } from '~/operations/isInfinite';
import { isNaNC } from '~/operations/isNaNC';
import { isZero } from '~/operations/isZero';

/**
 * Calculates the multiplicative inverse (reciprocal) of a complex number: 1/z.
 *
 * For z = a + ib, the inverse is (a - ib) / (a² + b²), which is the conjugate divided by the modulus squared.
 *
 * @param z - The complex number.
 * @returns A new Complex number representing 1/z.
 *
 * @example
 * ```typescript
 * const z = new Complex(2, 3);
 * const inv = inverse(z);
 * const product = multiply(z, inv);
 * console.log(product.toString()); // => approximately "1 + 0i"
 * ```
 */
export function inverse(z: Complex) {
  if (isNaNC(z)) return Complex.NAN;
  if (isInfinite(z)) return Complex.ZERO;
  if (isZero(z)) return Complex.INFINITY;

  const { re: a, im: b } = z.getComponents();
  const maxAbs = Math.max(Math.abs(a), Math.abs(b));

  // Scale by the maximum absolute value to avoid numerical cancellation
  const aScaled = a / maxAbs;
  const bScaled = b / maxAbs;
  const modulusSquaredScaled = aScaled * aScaled + bScaled * bScaled;

  // Divide scaled values by scaled modulus squared, then divide by maxAbs to scale back
  // aScaled / modulusSquaredScaled / maxAbs = (a / maxAbs) / ((a² + b²) / maxAbs²) / maxAbs
  // = a * maxAbs / (a² + b²) / maxAbs = a / (a² + b²) ✓
  const scaleFactor = 1 / (modulusSquaredScaled * maxAbs);
  const re = aScaled * scaleFactor;
  const im = -(bScaled * scaleFactor);

  return new Complex(isApproximatelyEqual(re, 0) ? 0 : re, isApproximatelyEqual(im, 0) ? 0 : im);
}
