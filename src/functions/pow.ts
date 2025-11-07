import Complex from '~/complex';
import { argument, equals, isInfinite, isZero, multiply, notEquals, pythagoras } from '~/operations';

export default function pow(z: Complex | number, w: Complex | number) {
  const zc = z instanceof Complex ? z : new Complex(z, 0);
  const wc = w instanceof Complex ? w : new Complex(w, 0);

  if (isZero(zc) && !isZero(wc)) return Complex.ZERO;
  if (!isZero(zc) && !isInfinite(zc) && isZero(wc)) return Complex.ONE;
  if (!isZero(zc) && notEquals(zc, Complex.ONE) && isInfinite(wc)) {
    return Complex.INFINITY;
  }

  if ((equals(zc, Complex.ONE) && isInfinite(wc)) || (isZero(zc) && isZero(wc)) || (isInfinite(zc) && isZero(wc))) {
    return Complex.NAN;
  }
  const c = wc.getRe();
  const d = wc.getIm();

  const pyt = pythagoras(zc);
  const arg = argument(zc);
  const par = c * arg + (d / 2) * Math.log(pyt);

  const m = Math.pow(pyt, c / 2) * Math.exp(-d * arg);

  return multiply(m, new Complex(Math.cos(par), Math.sin(par)));
}
