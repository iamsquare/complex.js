import Complex from '~/complex';
import inverse from '~/functions/inverse';
import asinh from '~/functions/inverseHyperbolic/asinh';
/**
 * Calculates the inverse hyperbolic cosecant of a Complex number.
 */
export default function acsch(z: Complex) {
  return asinh(inverse(z));
}
