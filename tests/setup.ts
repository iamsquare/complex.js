import { expect } from 'vitest';

import { toBeApproximatelyEqual, toBeComplexCloseTo, toBePolarCloseTo } from '~/tests/utils/test-utils';

expect.extend({
  toBeApproximatelyEqual,
  toBeComplexCloseTo,
  toBePolarCloseTo,
});
