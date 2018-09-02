import { Cartesian, Polar, isCartesian, isPolar } from '../src/helpers';

describe('Helpers', () => {
  test('They should exist', () => {
    expect(isCartesian).toBeDefined();
    expect(isPolar).toBeDefined();
  });

  const c: Cartesian = { x: 10, y: 20 };
  const p: Polar = { r: 11, p: Math.PI };

  describe('Helper functions', () => {
    test('isCartesian(object)', () => {
      expect(isCartesian(c)).toBeTruthy();
      expect(isCartesian(p)).toBeFalsy();
    });

    test('isPolar(object)', () => {
      expect(isPolar(c)).toBeFalsy();
      expect(isPolar(p)).toBeTruthy();
    });
  });
});
