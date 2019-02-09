import { Complex } from '../src/complex';

const INFINITY: Complex = Complex.INFINITY;
const NAN: Complex = Complex.NAN;
const ZERO: Complex = Complex.ZERO;
const ONE: Complex = Complex.ONE;
const HALFPI: Complex = Complex.HALFPI;

// Numerical values are calculated with wolframalpha online calculator
// http://www.wolframalpha.com/

describe('Functions', () => {
  test('They should exist', () => {
    expect(Complex.prototype.sqrt).toBeDefined();
    expect(Complex.prototype.log).toBeDefined();
    expect(Complex.prototype.exp).toBeDefined();
    expect(Complex.prototype.pow).toBeDefined();
    // expect(Complex.prototype.root).toBeDefined();
    expect(Complex.prototype.sin).toBeDefined();
    expect(Complex.prototype.cos).toBeDefined();
    expect(Complex.prototype.tan).toBeDefined();
    expect(Complex.prototype.cot).toBeDefined();
    expect(Complex.prototype.sec).toBeDefined();
    expect(Complex.prototype.csc).toBeDefined();
    expect(Complex.prototype.asin).toBeDefined();
    expect(Complex.prototype.acos).toBeDefined();
    expect(Complex.prototype.atan).toBeDefined();
    expect(Complex.prototype.acot).toBeDefined();
    expect(Complex.prototype.asec).toBeDefined();
    expect(Complex.prototype.acsc).toBeDefined();
    expect(Complex.prototype.sinh).toBeDefined();
    expect(Complex.prototype.cosh).toBeDefined();
    expect(Complex.prototype.tanh).toBeDefined();
    expect(Complex.prototype.coth).toBeDefined();
    expect(Complex.prototype.sech).toBeDefined();
    expect(Complex.prototype.csch).toBeDefined();
    expect(Complex.prototype.asinh).toBeDefined();
    expect(Complex.prototype.acosh).toBeDefined();
    expect(Complex.prototype.atanh).toBeDefined();
    expect(Complex.prototype.acoth).toBeDefined();
    expect(Complex.prototype.asech).toBeDefined();
    expect(Complex.prototype.acsch).toBeDefined();
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

  describe('Exponentiation', () => {
    const ez: Complex = z.pow(w);
    const en: Complex = z.pow(3);
    const ei: Complex = z.pow(new Complex(0,4));
    test('z^w', () => {
      expect(ez.getRe()).toBeCloseTo(-0.163450932107354980775160670016733431436618517751780613, 10);
      expect(ez.getIm()).toBeCloseTo(0.0960049836089488857637305260166438329767859619495163582, 10);
      expect(en.getRe()).toBeCloseTo(-2, 10);
      expect(en.getIm()).toBeCloseTo(2, 10);
      expect(ei.getRe()).toBeCloseTo(0.00792789471147596867707293596691392242441194951611723415, 10);
      expect(ei.getIm()).toBeCloseTo(0.0424804804251522110983614991496454374843832377622877467, 10);
    });

    describe('Special Cases', () => {
      test('0^z', () => {
        expect(ZERO.pow(z)).toEqual(ZERO);
      });

      test('z^0', () => {
        expect(z.pow(ZERO)).toEqual(ONE);
      });

      test('0^0', () => {
        expect(ZERO.pow(ZERO)).toEqual(NAN);
      });

      test('∞^0', () => {
        expect(INFINITY.pow(ZERO)).toEqual(NAN);
      });

      test('0^∞', () => {
        expect(ZERO.pow(INFINITY)).toEqual(ZERO);
      });

      test('1^∞', () => {
        expect(ONE.pow(INFINITY)).toEqual(NAN);
      });

      test('∞^∞', () => {
        expect(INFINITY.pow(INFINITY)).toEqual(INFINITY);
      });

      test('z^∞', () => {
        expect(z.pow(INFINITY)).toEqual(INFINITY);
      });
    });
  });

  describe('Trigonometric Functions', () => {
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

  describe('Inverse Trigonometric Functions', () => {
    describe('asin', () => {
      const sz: Complex = z.asin();
      const sw: Complex = w.asin();

      test('asin(z)', () => {
        expect(sz.getRe()).toBeCloseTo(0.66623943249251525510400489597779272066749013872594784283, 10);
        expect(sz.getIm()).toBeCloseTo(1.0612750619050356520330189162135734858067854989386336963, 10);
        expect(sw.getRe()).toBeCloseTo(0.57065278432109940071028387968566965018280324509604013653, 10);
        expect(sw.getIm()).toBeCloseTo(1.9833870299165354323470769028940395650142483029093453561, 10);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(ZERO.asin()).toEqual(ZERO);
        });

        test('Infinity', () => {
          expect(INFINITY.asin()).toEqual(NAN);
        });

        test('NaN', () => {
          expect(NAN.asin()).toEqual(NAN);
        });
      });
    });

    describe('acos', () => {
      const sz: Complex = z.acos();
      const sw: Complex = w.acos();

      test('acos(z)', () => {
        expect(sz.getRe()).toBeCloseTo(0.90455689430238136412731679566195872143109456096160506765, 10);
        expect(sz.getIm()).toBeCloseTo(-1.0612750619050356520330189162135734858067854989386336963, 10);
        expect(sw.getRe()).toBeCloseTo(1.00014354247379721852103781195408179191578145459151277395, 10);
        expect(sw.getIm()).toBeCloseTo(-1.98338702991653543234707690289403956501424830290934535612, 10);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(ZERO.acos()).toEqual(HALFPI);
        });

        test('Infinity', () => {
          expect(INFINITY.acos()).toEqual(NAN);
        });

        test('NaN', () => {
          expect(NAN.acos()).toEqual(NAN);
        });
      });
    });

    describe('atan', () => {
      const sz: Complex = z.atan();
      const sw: Complex = w.atan();

      test('atan(z)', () => {
        expect(sz.getRe()).toBeCloseTo(1.0172219678978513677227889615504829220635608769868365871, 10);
        expect(sz.getIm()).toBeCloseTo(0.40235947810852509365018983330654690988140033856712943047, 10);
        expect(sw.getRe()).toBeCloseTo(1.4099210495965755225306193844604207825882070519087248147, 10);
        expect(sw.getIm()).toBeCloseTo(0.22907268296853876629588180294200276786252530497706561694, 10);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(ZERO.atan()).toEqual(ZERO);
        });

        test('Infinity', () => {
          expect(INFINITY.atan()).toEqual(NAN);
        });

        test('NaN', () => {
          expect(NAN.atan()).toEqual(NAN);
        });
      });
    });

    describe('acot', () => {
      const sz: Complex = z.acot();
      const sw: Complex = w.acot();

      test('acot(z)', () => {
        expect(sz.getRe()).toBeCloseTo(0.55357435889704525150853273008926852003502382270071632333, 10);
        expect(sz.getIm()).toBeCloseTo(-0.40235947810852509365018983330654690988140033856712943047, 10);
        expect(sw.getRe()).toBeCloseTo(0.16087527719832109670070230717933065951037764777882809571, 10);
        expect(sw.getIm()).toBeCloseTo(-0.22907268296853876629588180294200276786252530497706561694, 10);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(ZERO.acot()).toEqual(HALFPI);
        });

        test('Infinity', () => {
          expect(INFINITY.acot()).toEqual(NAN);
        });

        test('NaN', () => {
          expect(NAN.acot()).toEqual(NAN);
        });
      });
    });

    describe('asec', () => {
      const sz: Complex = z.asec();
      const sw: Complex = w.asec();

      test('asec(z)', () => {
        expect(sz.getRe()).toBeCloseTo(1.1185178796437059371676632938087720813830374192067503766, 10);
        expect(sz.getIm()).toBeCloseTo(0.53063753095251782601650945810678674290339274946931684819, 10);
        expect(sw.getRe()).toBeCloseTo(1.420410722467034655979845270384446098088561447594643043, 10);
        expect(sw.getIm()).toBeCloseTo(0.23133469857397331454695145510960989630673868362559657012, 10);
      });

      describe('Special Cases', () => {
        test('Infinity', () => {
          expect(INFINITY.asec()).toEqual(HALFPI);
        });

        test('NaN', () => {
          expect(NAN.asec()).toEqual(NAN);
        });
      });
    });

    describe('acsc', () => {
      const sz: Complex = z.acsc();
      const sw: Complex = w.acsc();

      test('acsc(z)', () => {
        expect(sz.getRe()).toBeCloseTo(0.45227844715119068206365839783097936071554728048080253382, 10);
        expect(sz.getIm()).toBeCloseTo(-0.53063753095251782601650945810678674290339274946931684819, 10);
        expect(sw.getRe()).toBeCloseTo(0.15038560432786196325147642125530534401002325209290986747, 10);
        expect(sw.getIm()).toBeCloseTo(-0.23133469857397331454695145510960989630673868362559657012, 10);
      });

      describe('Special Cases', () => {
        test('Infinity', () => {
          expect(INFINITY.acsc()).toEqual(ZERO);
        });

        test('NaN', () => {
          expect(NAN.acsc()).toEqual(NAN);
        });
      });
    });
  });

  describe('Hyperbolic', () => {
    describe('sinh', () => {
      test('sinh(z)', () => {
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
      test('cosh(z)', () => {
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
      test('tanh(z)', () => {
        const tz: Complex = z.tanh();
        const tw: Complex = w.tanh();

        expect(tz.getRe()).toBeCloseTo(1.0839233273386945434757520612119717213449675274753898563, 10);
        expect(tz.getIm()).toBeCloseTo(0.27175258531951171652884372249858892070946411146177945309, 10);
        expect(tw.getRe()).toBeCloseTo(0.965385879022133124278480269394560685879729650005757773, 10);
        expect(tw.getIm()).toBeCloseTo(-0.00988437503832249372031403430350121097961813353467039031, 10);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(ZERO.tanh()).toEqual(ZERO);
        });

        test('Infinity', () => {
          expect(INFINITY.tanh()).toEqual(NAN);
        });

        test('NaN', () => {
          expect(NAN.tanh()).toEqual(NAN);
        });
      });
    });

    describe('coth', () => {
      test('coth(z)', () => {
        const tz: Complex = z.coth();
        const tw: Complex = w.coth();

        expect(tz.getRe()).toBeCloseTo(0.86801414289592494863584920891627388827343874994609327121, 10);
        expect(tz.getIm()).toBeCloseTo(-0.21762156185440268136513424360523807352075436916785404091, 10);
        expect(tw.getRe()).toBeCloseTo(1.035746637764995396112758656897908320248306959923214042, 10);
        expect(tw.getIm()).toBeCloseTo(0.01060478347033710175031689620777929239726759093914072464, 10);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(ZERO.coth()).toEqual(INFINITY);
        });

        test('Infinity', () => {
          expect(INFINITY.coth()).toEqual(NAN);
        });

        test('NaN', () => {
          expect(NAN.coth()).toEqual(NAN);
        });
      });
    });

    describe('sech', () => {
      test('sech(z)', () => {
        const tz: Complex = z.sech();
        const tw: Complex = w.sech();

        expect(tz.getRe()).toBeCloseTo(0.49833703055518678521380589177216953443287793247109398814, 10);
        expect(tz.getIm()).toBeCloseTo(-0.59108384172104504805039169297433507150365868212588646424, 10);
        expect(tw.getRe()).toBeCloseTo(-0.263512975158389309643604174605426263933263536951180308, 10);
        expect(tw.getIm()).toBeCloseTo(-0.0362116365587685208714568977895357612063361777665787908, 10);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(ZERO.sech()).toEqual(ONE);
        });

        test('Infinity', () => {
          expect(INFINITY.sech()).toEqual(NAN);
        });

        test('NaN', () => {
          expect(NAN.sech()).toEqual(NAN);
        });
      });
    });

    describe('csch', () => {
      test('csch(z)', () => {
        const tz: Complex = z.csch();
        const tw: Complex = w.csch();

        expect(tz.getRe()).toBeCloseTo(0.30393100162842645033448560450970327348872988190146275166, 10);
        expect(tz.getIm()).toBeCloseTo(-0.62151801717042842123490780585592014816751214181074260992, 10);
        expect(tw.getRe()).toBeCloseTo(-0.272548661462940199512498477932708924053539864495446014, 10);
        expect(tw.getIm()).toBeCloseTo(-0.0403005788568915218751324795428698677808424754242681263, 10);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(ZERO.csch()).toEqual(INFINITY);
        });

        test('Infinity', () => {
          expect(INFINITY.csch()).toEqual(NAN);
        });

        test('NaN', () => {
          expect(NAN.csch()).toEqual(NAN);
        });
      });
    });
  });

  describe('Inverse Hyperbolic Functions', () => {
    describe('asinh', () => {
      test('asinh(z)', () => {
        const tz: Complex = z.asinh();
        const tw: Complex = w.asinh();

        expect(tz.getRe()).toBeCloseTo(1.0612750619050356520330189162135734858067854989386336963, 10);
        expect(tz.getIm()).toBeCloseTo(0.66623943249251525510400489597779272066749013872594784283, 10);
        expect(tw.getRe()).toBeCloseTo(1.9686379257930962917886650952454981895207310126820105738, 10);
        expect(tw.getIm()).toBeCloseTo(0.96465850440760279204541105949953235551977737250733165271, 10);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(ZERO.asinh()).toEqual(ZERO);
        });

        test('Infinity', () => {
          expect(INFINITY.asinh()).toEqual(NAN);
        });

        test('NaN', () => {
          expect(NAN.asinh()).toEqual(NAN);
        });
      });
    });

    describe('acosh', () => {
      test('acosh(z)', () => {
        const tz: Complex = z.acosh();
        const tw: Complex = w.acosh();

        expect(tz.getRe()).toBeCloseTo(1.0612750619050356520330189162135734858067854989386336963, 10);
        expect(tz.getIm()).toBeCloseTo(0.90455689430238136412731679566195872143109456096160506765, 10);
        expect(tw.getRe()).toBeCloseTo(1.98338702991653543234707690289403956501424830290934535612, 10);
        expect(tw.getIm()).toBeCloseTo(1.00014354247379721852103781195408179191578145459151277395, 10);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(ZERO.acosh()).toEqual(new Complex(0, Math.PI / 2));
        });

        test('Infinity', () => {
          expect(INFINITY.acosh()).toEqual(NAN);
        });

        test('NaN', () => {
          expect(NAN.acosh()).toEqual(NAN);
        });
      });
    });

    describe('atanh', () => {
      test('atanh(z)', () => {
        const tz: Complex = z.atanh();
        const tw: Complex = w.atanh();

        expect(tz.getRe()).toBeCloseTo(0.40235947810852509365018983330654690988140033856712943047, 10);
        expect(tz.getIm()).toBeCloseTo(1.0172219678978513677227889615504829220635608769868365871, 10);
        expect(tw.getRe()).toBeCloseTo(0.14694666622552975204743278515471594244234494034424529538, 10);
        expect(tw.getIm()).toBeCloseTo(1.3389725222944935611241935759091442410843161725444927785, 10);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(ZERO.atanh()).toEqual(ZERO);
        });

        test('Infinity', () => {
          expect(INFINITY.atanh()).toEqual(NAN);
        });

        test('NaN', () => {
          expect(NAN.atanh()).toEqual(NAN);
        });
      });
    });

    describe('acoth', () => {
      test('acoth(z)', () => {
        const tz: Complex = z.acoth();
        const tw: Complex = w.acoth();

        expect(tz.getRe()).toBeCloseTo(0.40235947810852509365018983330654690988140033856712943047, 10);
        expect(tz.getIm()).toBeCloseTo(-0.55357435889704525150853273008926852003502382270071632333, 10);
        expect(tw.getRe()).toBeCloseTo(0.14694666622552975204743278515471594244234494034424529538, 10);
        expect(tw.getIm()).toBeCloseTo(-0.2318238045004030581071281157306072010142685271430601319, 10);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(ZERO.acoth()).toEqual(NAN);
        });

        test('Infinity', () => {
          expect(INFINITY.acoth()).toEqual(ZERO);
        });

        test('NaN', () => {
          expect(NAN.acoth()).toEqual(NAN);
        });
      });
    });

    describe('asech', () => {
      test('asech(z)', () => {
        const tz: Complex = z.asech();
        const tw: Complex = w.asech();

        expect(tz.getRe()).toBeCloseTo(0.53063753095251782601650945810678674290339274946931684819, 10);
        expect(tz.getIm()).toBeCloseTo(-1.1185178796437059371676632938087720813830374192067503766, 10);
        expect(tw.getRe()).toBeCloseTo(0.23133469857397331454695145510960989630673868362559657012, 10);
        expect(tw.getIm()).toBeCloseTo(-1.420410722467034655979845270384446098088561447594643043, 10);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(ZERO.asech()).toEqual(NAN);
        });

        test('Infinity', () => {
          expect(INFINITY.asech()).toEqual(new Complex(0, Math.PI / 2));
        });

        test('NaN', () => {
          expect(NAN.asech()).toEqual(NAN);
        });
      });
    });

    describe('acsch', () => {
      test('acsch(z)', () => {
        const tz: Complex = z.acsch();
        const tw: Complex = w.acsch();

        expect(tz.getRe()).toBeCloseTo(0.53063753095251782601650945810678674290339274946931684819, 10);
        expect(tz.getIm()).toBeCloseTo(-0.45227844715119068206365839783097936071554728048080253382, 10);
        expect(tw.getRe()).toBeCloseTo(0.15735549884498542878232884070374809348875711668583239203, 10);
        expect(tw.getIm()).toBeCloseTo(-0.22996290237720785451396729701376055364030873702291137157, 10);
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(ZERO.acsch()).toEqual(NAN);
        });

        test('Infinity', () => {
          expect(INFINITY.acsch()).toEqual(ZERO);
        });

        test('NaN', () => {
          expect(NAN.acsch()).toEqual(NAN);
        });
      });
    });
  });
});
