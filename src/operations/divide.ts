import { Complex } from '~/complex';
import { isApproximatelyEqual } from '~/lib/isApproximatelyEqual';
import { isInfinite } from '~/operations/isInfinite';
import { isNaNC } from '~/operations/isNaNC';
import { isZero } from '~/operations/isZero';
import { multiply } from '~/operations/multiply';

/**
 * Divides two complex numbers or a complex number by a real number: z / w.
 *
 * Uses a [modified Smith's Method](http://www.finetune.co.jp/~lyuka/technote/cdiv/cdiv.html)
 * to avoid numerical overflow and underflow issues in complex division. The implementation uses
 * numerically stable addition and subtraction algorithms, along with scaling techniques to handle
 * extreme values, to further improve precision and robustness.
 * Also accepts real numbers, which are treated as complex numbers with zero imaginary part.
 *
 * @param z - The complex number to divide (dividend).
 * @param w - The complex number or real number to divide by (divisor).
 * @returns A new Complex number representing z / w.
 *
 * @example
 * ```typescript
 * const z = new Complex(1, 2);
 * const w = new Complex(3, 4);
 * const quotient = divide(z, w);
 * console.log(quotient.toString()); // => "0.44 + 0.08i" (approximately)
 *
 * // Divide by a real number
 * const realQuotient = divide(z, 2);
 * console.log(realQuotient.toString()); // => "0.5 + 1i"
 * ```
 */
export function divide(z: Complex | number, w: Complex | number) {
  const zc = z instanceof Complex ? z : new Complex(z, 0);
  const wc = w instanceof Complex ? w : new Complex(w, 0);

  if ((isZero(zc) && isZero(wc)) || (isInfinite(zc) && isInfinite(wc)) || isNaNC(zc) || isNaNC(wc)) {
    return Complex.NAN;
  }
  if (isInfinite(zc) || isZero(wc)) return Complex.INFINITY;
  if (isZero(zc) || isInfinite(wc)) return Complex.ZERO;

  const overflowBoundary = Number.MAX_VALUE / 2;
  const underflowBoundary = (Number.MIN_VALUE * 2) / Number.EPSILON;
  const scalingFactor = 2 / (Number.EPSILON * Number.EPSILON);

  const zMaxComponent = Math.max(Math.abs(zc.getRe()), Math.abs(zc.getIm()));
  const wMaxComponent = Math.max(Math.abs(wc.getRe()), Math.abs(wc.getIm()));

  const zScaleDown = zMaxComponent >= overflowBoundary ? 2 : 1;
  const wScaleDown = wMaxComponent >= overflowBoundary ? 0.5 : 1;
  const zScaleUp = zMaxComponent < underflowBoundary ? 1 / scalingFactor : 1;
  const wScaleUp = wMaxComponent < underflowBoundary ? scalingFactor : 1;
  const scale = zScaleDown * wScaleDown * zScaleUp * wScaleUp;

  const { re: zScaledRe, im: zScaledIm } = multiply(zc, zScaleDown * zScaleUp).getComponents();
  const { re: wScaledRe, im: wScaledIm } = multiply(wc, wScaleDown * wScaleUp).getComponents();

  if (Math.abs(wScaledIm) <= Math.abs(wScaledRe)) {
    const r = wScaledIm / wScaledRe;
    const t = wScaledRe + wScaledIm * r;

    return multiply(
      isApproximatelyEqual(r, 0)
        ? new Complex(
            (zScaledRe + wScaledIm * (zScaledIm / wScaledRe)) / t,
            (zScaledIm - wScaledIm * (zScaledRe / wScaledRe)) / t,
          )
        : new Complex((zScaledRe + zScaledIm * r) / t, (zScaledIm - zScaledRe * r) / t),
      scale,
    );
  }

  const r = wScaledRe / wScaledIm;
  const t = wScaledRe * r + wScaledIm;

  return multiply(
    isApproximatelyEqual(r, 0)
      ? new Complex(
          (wScaledRe * (zScaledRe / wScaledIm) + zScaledIm) / t,
          (wScaledRe * (zScaledIm / wScaledIm) - zScaledRe) / t,
        )
      : new Complex((zScaledRe * r + zScaledIm) / t, (zScaledIm * r - zScaledRe) / t),
    scale,
  );
}
