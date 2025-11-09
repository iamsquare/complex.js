import { Complex } from '~/complex';
import { isApproximatelyEqual } from '~/helpers';
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

  const AB = Math.max(Math.abs(zc.getRe()), Math.abs(zc.getIm()));
  const CD = Math.max(Math.abs(wc.getRe()), Math.abs(wc.getIm()));

  const xScaleDown = AB >= overflowBoundary ? 2 : 1;
  const yScaleDown = CD >= overflowBoundary ? 0.5 : 1;
  const xScaleUp = AB < underflowBoundary ? 1 / scalingFactor : 1;
  const yScaleUp = CD < underflowBoundary ? scalingFactor : 1;

  const scaledX = multiply(zc, xScaleDown * xScaleUp);
  const scaledY = multiply(wc, yScaleDown * yScaleUp);
  const scale = xScaleDown * yScaleDown * xScaleUp * yScaleUp;

  if (Math.abs(scaledY.getIm()) <= Math.abs(scaledY.getRe())) {
    const r = scaledY.getIm() / scaledY.getRe();
    const t = scaledY.getRe() + scaledY.getIm() * r;

    return multiply(
      isApproximatelyEqual(r, 0)
        ? new Complex(
            (scaledX.getRe() + scaledY.getIm() * (scaledX.getIm() / scaledY.getRe())) / t,
            (scaledX.getIm() - scaledY.getIm() * (scaledX.getRe() / scaledY.getRe())) / t,
          )
        : new Complex((scaledX.getRe() + scaledX.getIm() * r) / t, (scaledX.getIm() - scaledX.getRe() * r) / t),
      scale,
    );
  } else {
    const r = scaledY.getRe() / scaledY.getIm();
    const t = scaledY.getRe() * r + scaledY.getIm();

    return multiply(
      isApproximatelyEqual(r, 0)
        ? new Complex(
            (scaledY.getRe() * (scaledX.getRe() / scaledY.getIm()) + scaledX.getIm()) / t,
            (scaledY.getRe() * (scaledX.getIm() / scaledY.getIm()) - scaledX.getRe()) / t,
          )
        : new Complex((scaledX.getRe() * r + scaledX.getIm()) / t, (scaledX.getIm() * r - scaledX.getRe()) / t),
      scale,
    );
  }
}
