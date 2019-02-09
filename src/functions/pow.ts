import {
  Complex,
  isZero,
  isInfinite,
  equals,
  notEquals,
  multiply,
  pythagoras,
  argument
} from '../';

export default function pow(z: Complex | number, w: Complex | number): Complex {
  let zc: Complex;
  let wc: Complex;

  if (typeof z === 'number') zc = new Complex(z, 0);
  if (z instanceof Complex) zc = z;
  if (typeof w === 'number') wc = new Complex(w, 0);
  if (w instanceof Complex) wc = w;

  if (isZero(zc) && !isZero(wc)) return Complex.ZERO;
  if (!isZero(zc) && !isInfinite(zc) && isZero(wc)) return Complex.ONE;
  if (!isZero(zc) && notEquals(zc, Complex.ONE) && isInfinite(wc)) {
    return Complex.INFINITY;
  }

  if (
    (equals(zc, Complex.ONE) && isInfinite(wc)) ||
    (isZero(zc) && isZero(wc)) ||
    (isInfinite(zc) && isZero(wc))
  ) {
    return Complex.NAN;
  }
  const c: number = wc.getRe();
  const d: number = wc.getIm();

  const pyt: number = pythagoras(zc);
  const arg: number = argument(zc);
  const par: number = c * arg + d / 2 * Math.log(pyt);

  const m: number = Math.pow(pyt, c / 2) * Math.exp(-d * arg);

  return multiply(m, new Complex(Math.cos(par), Math.sin(par)));
}
