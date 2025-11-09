import type { Complex } from '~/complex';
import type { Polar } from '~/helpers';

declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Assertion<T = unknown> {
    toBeApproximatelyEqual(expected: number, epsilon?: number): void;
    toBeComplexCloseTo(expected: Complex, epsilon?: number): void;
    toBePolarCloseTo(expected: Polar, epsilon?: number): void;
  }

  interface AsymmetricMatchersContaining {
    toBeApproximatelyEqual(expected: number, epsilon?: number): void;
    toBeComplexCloseTo(expected: Complex, epsilon?: number): void;
    toBePolarCloseTo(expected: Polar, epsilon?: number): void;
  }
}
