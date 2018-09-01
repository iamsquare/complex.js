import Complex from '../src/complex';

const INFINITY = Complex.INFINITY;
const NAN = Complex.NAN;
const ZERO = Complex.ZERO;
const ONE = Complex.ONE;

// Numerical values are calculated with wolframalpha online calculator
// http://www.wolframalpha.com/

describe('Functions', () => {
  const z: Complex = new Complex(1, 1);
  const w: Complex = new Complex(2, 3);
  describe('Square Root', () => {
    const sz: Complex = z.sqrt();
    const sw: Complex = w.sqrt();
    test('sqrt(z)', () => {
      expect(sz.getRe()).toBeCloseTo(1.0986841134678099660398011952406783785443931209271577437, 10);
      expect(sz.getIm()).toBeCloseTo(0.45508986056222734130435775782246856962019037848315009258, 10);
      expect(sw.getRe()).toBeCloseTo(1.6741492280355400404480393008490518216747086778839203667, 10);
      expect(sw.getIm()).toBeCloseTo(0.89597747612983812471573375529004344104332419955493149324, 10);
    });

    describe('Special Cases', () => {
      test('Infinity', () => {
        expect(INFINITY.sqrt()).toEqual(INFINITY);
      });
      test('NaN', () => {
        expect(NAN.sqrt()).toEqual(NAN);
      });
    });
  });
  describe('Logarithm', () => {
    const sz: Complex = z.log();
    const sw: Complex = w.log();
    test('log(z)', () => {
      expect(sz.getRe()).toBeCloseTo(0.34657359027997265470861606072908828403775006718012762706, 10);
      expect(sz.getIm()).toBeCloseTo(0.78539816339744830961566084581987572104929234984377645524, 10);
      expect(sw.getRe()).toBeCloseTo(1.2824746787307683680267437207826593024026339723801035582, 10);
      expect(sw.getIm()).toBeCloseTo(0.98279372324732906798571061101466601449687745363162855676, 10);
    });

    describe('Special Cases', () => {
      test('Zero', () => {
        expect(ZERO.log()).toEqual(NAN);
      });
      test('Infinity', () => {
        expect(INFINITY.log()).toEqual(INFINITY);
      });
      test('NaN', () => {
        expect(NAN.log()).toEqual(NAN);
      });
    });
  });

  describe('Exponential', () => {
    const sz: Complex = z.exp();
    const sw: Complex = w.exp();
    test('exp(z)', () => {
      expect(sz.getRe()).toBeCloseTo(1.46869393991588515713896759732660426132695673662900872279, 10);
      expect(sz.getIm()).toBeCloseTo(2.28735528717884239120817190670050180895558625666835568093, 10);
      expect(sw.getRe()).toBeCloseTo(-7.3151100949011025174865361510507893218698794489446322367, 10);
      expect(sw.getIm()).toBeCloseTo(1.0427436562359044141015039404625521939183300604422348975, 10);
    });

    describe('Special Cases', () => {
      test('Zero', () => {
        expect(ZERO.exp()).toEqual(ONE);
      });
      test('Infinity', () => {
        expect(INFINITY.exp()).toEqual(NAN);
      });
      test('NaN', () => {
        expect(NAN.exp()).toEqual(NAN);
      });
    });
  });
});
