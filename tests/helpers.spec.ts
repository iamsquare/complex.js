import { Cartesian, Polar, isCartesian, isPolar } from '../src';

describe('Helpers', () => {
  test('They should exist', () => {
    expect(isCartesian).toBeDefined();
    expect(isPolar).toBeDefined();
  });

  const c: Cartesian = { x: 10, y: 20 };
  const p: Polar = { r: 11, p: Math.PI };
  const cz: Cartesian = { x: 0,  y: 0 };
  const pz: Polar = { r: 0,  p: 0 };
  const u: any = undefined;

  describe('Helper functions', () => {
    test('isCartesian(object)', () => {
      expect(isCartesian(c)).toBeTruthy();
      expect(isCartesian(cz)).toBeTruthy();
      expect(isCartesian(p)).toBeFalsy();
      expect(isCartesian(u)).toBeFalsy();
    });

    test('isPolar(object)', () => {
      expect(isPolar(c)).toBeFalsy();
      expect(isPolar(p)).toBeTruthy();
      expect(isPolar(pz)).toBeTruthy();
      expect(isPolar(u)).toBeFalsy();
    });
  });
});
