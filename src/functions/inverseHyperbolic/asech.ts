import Complex from '~/complex';
import inverse from '~/functions/inverse';
import acosh from '~/functions/inverseHyperbolic/acosh';
/**
 * Calculates the inverse hyperbolic secant of a Complex number.
 */
export default function asech(z: Complex) {
  return acosh(inverse(z));
}
