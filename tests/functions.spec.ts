import Complex from '../src/complex';

const INFINITY = Complex.INFINITY;
const NAN = Complex.NAN;
const ZERO = Complex.ZERO;
const ONE = Complex.ONE;

// Numerical values are calculated with wolframalpha online calculator
// http://www.wolframalpha.com/

describe('Functions', () => {
  test('They should exist', () => {
    expect(Complex.prototype.sqrt).toBeDefined();
    expect(Complex.prototype.log).toBeDefined();
    expect(Complex.prototype.exp).toBeDefined();
    expect(Complex.prototype.sin).toBeDefined();
    expect(Complex.prototype.cos).toBeDefined();
    expect(Complex.prototype.tan).toBeDefined();
    expect(Complex.prototype.cot).toBeDefined();
    expect(Complex.prototype.sec).toBeDefined();
    expect(Complex.prototype.csc).toBeDefined();
    expect(Complex.prototype.sinh).toBeDefined();
    expect(Complex.prototype.cosh).toBeDefined();
    expect(Complex.prototype.tanh).toBeDefined();
  });

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
    const lz: Complex = z.log();
    const lw: Complex = w.log();
    test('log(z)', () => {
      expect(lz.getRe()).toBeCloseTo(0.34657359027997265470861606072908828403775006718012762706, 10);
      expect(lz.getIm()).toBeCloseTo(0.78539816339744830961566084581987572104929234984377645524, 10);
      expect(lw.getRe()).toBeCloseTo(1.2824746787307683680267437207826593024026339723801035582, 10);
      expect(lw.getIm()).toBeCloseTo(0.98279372324732906798571061101466601449687745363162855676, 10);
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
    const ez: Complex = z.exp();
    const ew: Complex = w.exp();
    test('exp(z)', () => {
      expect(ez.getRe()).toBeCloseTo(1.46869393991588515713896759732660426132695673662900872279, 10);
      expect(ez.getIm()).toBeCloseTo(2.28735528717884239120817190670050180895558625666835568093, 10);
      expect(ew.getRe()).toBeCloseTo(-7.3151100949011025174865361510507893218698794489446322367, 10);
      expect(ew.getIm()).toBeCloseTo(1.0427436562359044141015039404625521939183300604422348975, 10);
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

  describe('Trigonometric', () => {
    describe('sin', () => {
      const sz: Complex = z.sin();
      const sw: Complex = w.sin();

      test('sin(z)', () => {
        expect(sz.getRe()).toBeCloseTo(1.2984575814159772948260423658078156203134365616352080734, 10);
        expect(sz.getIm()).toBeCloseTo(0.63496391478473610825508220299150978151708195141937941052, 10);
        expect(sw.getRe()).toBeCloseTo(9.15449914691142957346729954460983255915886056876518297789, 10);
        expect(sw.getIm()).toBeCloseTo(-4.16890695996656435075481305885375484357356560475805588996, 10);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(ZERO.sin()).toEqual(ZERO);
        });

        test('Infinity', () => {
          expect(INFINITY.sin()).toEqual(NAN);
        });

        test('NaN', () => {
          expect(NAN.sin()).toEqual(NAN);
        });
      });
    });

    describe('cos', () => {
      const sz: Complex = z.cos();
      const sw: Complex = w.cos();
      test('cos(z)', () => {
        expect(sz.getRe()).toBeCloseTo(0.83373002513114904888388539433509447980987478520962931227, 10);
        expect(sz.getIm()).toBeCloseTo(-0.98889770576286509638212954089268618864214969503314760753, 10);
        expect(sw.getRe()).toBeCloseTo(-4.1896256909688072301325550196159737286219454041279210357, 10);
        expect(sw.getIm()).toBeCloseTo(-9.1092278937553365979791972627788621213326202389201695649, 10);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(ZERO.cos()).toEqual(ONE);
        });

        test('Infinity', () => {
          expect(INFINITY.cos()).toEqual(NAN);
        });

        test('NaN', () => {
          expect(NAN.cos()).toEqual(NAN);
        });
      });
    });
    describe('tan', () => {
      const sz: Complex = z.tan();
      const sw: Complex = w.tan();

      test('tan(z)', () => {
        expect(sz.getRe()).toBeCloseTo(0.27175258531951171652884372249858892070946411146177945309, 10);
        expect(sz.getIm()).toBeCloseTo(1.0839233273386945434757520612119717213449675274753898563, 10);
        expect(sw.getRe()).toBeCloseTo(-0.0037640256415042482927512211303226908396306202016580864, 10);
        expect(sw.getIm()).toBeCloseTo(1.0032386273536098014463585978219272598077897241071003, 10);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(ZERO.tan()).toEqual(ZERO);
        });

        test('Infinity', () => {
          expect(INFINITY.tan()).toEqual(NAN);
        });

        test('NaN', () => {
          expect(NAN.tan()).toEqual(NAN);
        });
      });
    });

    describe('cot', () => {
      const sz: Complex = z.cot();
      const sw: Complex = w.cot();

      test('cot(z)', () => {
        expect(sz.getRe()).toBeCloseTo(0.21762156185440268136513424360523807352075436916785404091, 10);
        expect(sz.getIm()).toBeCloseTo(-0.86801414289592494863584920891627388827343874994609327121, 10);
        expect(sw.getRe()).toBeCloseTo(-0.0037397103763369566601174086919025762400058903825787505, 10);
        expect(sw.getIm()).toBeCloseTo(-0.99675779656935831046096879711747071833201292579034236, 10);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(ZERO.cot()).toEqual(INFINITY);
        });

        test('Infinity', () => {
          expect(INFINITY.cot()).toEqual(NAN);
        });

        test('NaN', () => {
          expect(NAN.cot()).toEqual(NAN);
        });
      });
    });

    describe('sec', () => {
      const sz: Complex = z.sec();
      const sw: Complex = w.sec();

      test('sec(z)', () => {
        expect(sz.getRe()).toBeCloseTo(0.49833703055518678521380589177216953443287793247109398814, 10);
        expect(sz.getIm()).toBeCloseTo(0.59108384172104504805039169297433507150365868212588646424, 10);
        expect(sw.getRe()).toBeCloseTo(-0.0416749644111442700483499083803288960718713703427135394, 10);
        expect(sw.getIm()).toBeCloseTo(0.0906111371962375965296611983372727984226074826771616783, 10);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(ZERO.sec()).toEqual(ONE);
        });

        test('Infinity', () => {
          expect(INFINITY.sec()).toEqual(NAN);
        });

        test('NaN', () => {
          expect(NAN.sec()).toEqual(NAN);
        });
      });
    });


    describe('csc', () => {
      const sz: Complex = z.csc();
      const sw: Complex = w.csc();

      test('sec(z)', () => {
        expect(sz.getRe()).toBeCloseTo(0.62151801717042842123490780585592014816751214181074260992, 10);
        expect(sz.getIm()).toBeCloseTo(-0.30393100162842645033448560450970327348872988190146275166, 10);
        expect(sw.getRe()).toBeCloseTo(0.09047320975320743980579047913588321135593772687324480684, 10);
        expect(sw.getIm()).toBeCloseTo(0.04120098628857412646300981299403968750528596447974263627, 10);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(ZERO.csc()).toEqual(INFINITY);
        });

        test('Infinity', () => {
          expect(INFINITY.csc()).toEqual(NAN);
        });

        test('NaN', () => {
          expect(NAN.csc()).toEqual(NAN);
        });
      });
    });
  });

  describe('Hyperbolic', () => {
    describe('sinh', () => {
      test('Complex', () => {
        const sz: Complex = z.sinh();
        const sw: Complex = w.sinh();

        expect(sz.getRe()).toBeCloseTo(0.63496391478473610825508220299150978151708195141937941052, 10);
        expect(sz.getIm()).toBeCloseTo(1.2984575814159772948260423658078156203134365616352080734, 10);
        expect(sw.getRe()).toBeCloseTo(-3.590564589985779952012565447794816793194913675729301509, 10);
        expect(sw.getIm()).toBeCloseTo(0.53092108624851980526704009066067655967277345095149103, 10);
      });

      describe('Special Cases', () => {
        test('Infinity', () => {
          expect(INFINITY.sinh()).toEqual(NAN);
        });

        test('NaN', () => {
          expect(NAN.sinh()).toEqual(NAN);
        });
      });
    });

    describe('cosh', () => {
      test('Complex', () => {
        const cz: Complex = z.cosh();
        const cw: Complex = w.cosh();

        expect(cz.getRe()).toBeCloseTo(0.83373002513114904888388539433509447980987478520962931227, 10);
        expect(cz.getIm()).toBeCloseTo(0.98889770576286509638212954089268618864214969503314760753, 10);
        expect(cw.getRe()).toBeCloseTo(-3.724545504915322565473970703255972528674965773215330726, 10);
        expect(cw.getIm()).toBeCloseTo(0.5118225699873846088344638498018756342455566094907438674, 10);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(ZERO.cosh()).toEqual(ONE);
        });

        test('Infinity', () => {
          expect(INFINITY.cosh()).toEqual(NAN);
        });

        test('NaN', () => {
          expect(NAN.cosh()).toEqual(NAN);
        });
      });
    });

    describe('tanh', () => {
      test('Complex', () => {
        const tz: Complex = z.tanh();
        const tw: Complex = w.tanh();

        expect(tz.getRe()).toBeCloseTo(1.0839233273386945434757520612119717213449675274753898563, 10);
        expect(tz.getIm()).toBeCloseTo(0.27175258531951171652884372249858892070946411146177945309, 10);
        expect(tw.getRe()).toBeCloseTo(0.965385879022133124278480269394560685879729650005757773, 10);
        expect(tw.getIm()).toBeCloseTo(-0.00988437503832249372031403430350121097961813353467039031, 10);
      });

      describe('Special Cases', () => {
        test('Infinity', () => {
          expect(INFINITY.tanh()).toEqual(NAN);
        });

        test('NaN', () => {
          expect(NAN.tanh()).toEqual(NAN);
        });
      });
    });
  });
});
