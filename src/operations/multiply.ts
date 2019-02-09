import { Complex, isZero, isInfinite, isReal } from '../';

/**
 * Calculates z * w.
 */
export default function multiply(
  z: Complex | number,
  w: Complex | number
): Complex {
  let zc: Complex;
  let wc: Complex;

  if (typeof z === 'number') zc = new Complex(z, 0);
  if (z instanceof Complex) zc = z;

  if (typeof w === 'number') wc = new Complex(w, 0);
  if (w instanceof Complex) wc = w;

  if ((isZero(zc) && isInfinite(wc)) || (isInfinite(zc) && isZero(wc))) {
    return Complex.NAN;
  }

  if (isInfinite(zc) || isInfinite(wc)) return Complex.INFINITY;
  if (isZero(zc) || isZero(wc)) return Complex.ZERO;
  if (isReal(zc) && isReal(wc)) return new Complex(zc.getRe() * wc.getRe(), 0);

  const a: number = zc.getRe();
  const b: number = zc.getIm();
  const c: number = wc.getRe();
  const d: number = wc.getIm();

  return new Complex(
    a * c - b * d,
    a * d + b * c
  );
}
