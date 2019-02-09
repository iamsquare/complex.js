import { Complex, isZero, isInfinite, isNaNC } from '../';

// tslint:disable:max-line-length
/**
 * Calculates z / w using a [modified Smith's Method](http://forge.scilab.org/index.php/p/compdiv/source/tree/21/doc/improved_cdiv.pdf).
 * @todo Test if this implementation is actually SO better than the original Smith's method.
 * */
// tslint:enable:max-line-length
export default function divide(
  z: Complex | number,
  w: Complex | number
): Complex {
  let zc: Complex;
  let wc: Complex;

  if (typeof z === 'number') zc = new Complex(z, 0);
  if (z instanceof Complex) zc = z;

  if (typeof w === 'number') wc = new Complex(w, 0);
  if (w instanceof Complex) wc = w;

  if (
    (isZero(zc) && isZero(wc)) ||
    (isInfinite(zc) && isInfinite(wc)) ||
    isNaNC(zc) ||
    isNaNC(wc)
  ) {
    return Complex.NAN;
  }

  if (isInfinite(zc) || isZero(wc)) return Complex.INFINITY;
  if (isZero(zc) || isInfinite(wc)) return Complex.ZERO;

  const a: number = zc.getRe();
  const b: number = zc.getIm();
  const c: number = wc.getRe();
  const d: number = wc.getIm();

  let r: number;
  let t: number;

  if (Math.abs(d) < Math.abs(c)) {
    r = d / c;
    t = 1 / (c + d * r);

    if (r === 0) {
      return new Complex((a + d * (b / c)) * t, (b - d * (a / c)) * t);
    }
    return new Complex((a + b * r) * t, (b - a * r) * t);
  }

  r = c / d;
  t = 1 / (c * r + d);

  if (r === 0) {
    return new Complex((c * (a / d) + b) * t, (c * (b / d) - a) * t);
  }
  return new Complex((a * r + b) * t, (b * r - a) * t);
}
