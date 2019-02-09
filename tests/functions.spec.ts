import {
  Complex,
  sqrt,
  log,
  pow,
  inverse,
  exp,
  sin,
  cos,
  tan,
  cot,
  sec,
  csc,
  asin,
  acos,
  atan,
  acot,
  asec,
  acsc,
  sinh,
  cosh,
  tanh,
  coth,
  sech,
  csch,
  asinh,
  acosh,
  atanh,
  acoth,
  asech,
  acsch
} from '../src';

const INFINITY: Complex = Complex.INFINITY;
const NAN: Complex = Complex.NAN;
const ZERO: Complex = Complex.ZERO;
const ONE: Complex = Complex.ONE;
const HALFPI: Complex = Complex.HALFPI;

// Numerical values are calculated with wolframalpha online calculator
// http://www.wolframalpha.com/

describe('Functions', () => {
  const z: Complex = new Complex(1, 1);
  const w: Complex = new Complex(2, 3);

  describe('Square Root', () => {
    const sz: Complex = sqrt(z);
    const sw: Complex = sqrt(w);
    test('sqrt(z)', () => {
      expect(sz.getRe()).toBeCloseTo(
        1.0986841134678099660398011952406783785443931209271577437,
        10
      );
      expect(sz.getIm()).toBeCloseTo(
        0.45508986056222734130435775782246856962019037848315009258,
        10
      );
      expect(sw.getRe()).toBeCloseTo(
        1.6741492280355400404480393008490518216747086778839203667,
        10
      );
      expect(sw.getIm()).toBeCloseTo(
        0.89597747612983812471573375529004344104332419955493149324,
        10
      );
    });

    describe('Special Cases', () => {
      test('Infinity', () => {
        expect(sqrt(INFINITY)).toEqual(INFINITY);
      });
      test('NaN', () => {
        expect(sqrt(NAN)).toEqual(NAN);
      });
    });
  });

  describe('Logarithm', () => {
    const lz: Complex = log(z);
    const lw: Complex = log(w);
    test('log(z)', () => {
      expect(lz.getRe()).toBeCloseTo(
        0.34657359027997265470861606072908828403775006718012762706,
        10
      );
      expect(lz.getIm()).toBeCloseTo(
        0.78539816339744830961566084581987572104929234984377645524,
        10
      );
      expect(lw.getRe()).toBeCloseTo(
        1.2824746787307683680267437207826593024026339723801035582,
        10
      );
      expect(lw.getIm()).toBeCloseTo(
        0.98279372324732906798571061101466601449687745363162855676,
        10
      );
    });

    describe('Special Cases', () => {
      test('Zero', () => {
        expect(log(ZERO)).toEqual(NAN);
      });
      test('Infinity', () => {
        expect(log(INFINITY)).toEqual(INFINITY);
      });
      test('NaN', () => {
        expect(log(NAN)).toEqual(NAN);
      });
    });
  });

  describe('Exponential', () => {
    const ez: Complex = exp(z);
    const ew: Complex = exp(w);
    test('exp(z)', () => {
      expect(ez.getRe()).toBeCloseTo(
        1.46869393991588515713896759732660426132695673662900872279,
        10
      );
      expect(ez.getIm()).toBeCloseTo(
        2.28735528717884239120817190670050180895558625666835568093,
        10
      );
      expect(ew.getRe()).toBeCloseTo(
        -7.3151100949011025174865361510507893218698794489446322367,
        10
      );
      expect(ew.getIm()).toBeCloseTo(
        1.0427436562359044141015039404625521939183300604422348975,
        10
      );
    });

    describe('Special Cases', () => {
      test('Zero', () => {
        expect(exp(ZERO)).toEqual(ONE);
      });
      test('Infinity', () => {
        expect(exp(INFINITY)).toEqual(NAN);
      });
      test('NaN', () => {
        expect(exp(NAN)).toEqual(NAN);
      });
    });
  });

  describe('Exponentiation', () => {
    const ez: Complex = pow(z, w);
    const en: Complex = pow(z, 3);
    const ei: Complex = pow(z, new Complex(0, 4));
    test('z^w', () => {
      expect(ez.getRe()).toBeCloseTo(
        -0.163450932107354980775160670016733431436618517751780613,
        10
      );
      expect(ez.getIm()).toBeCloseTo(
        0.0960049836089488857637305260166438329767859619495163582,
        10
      );
      expect(en.getRe()).toBeCloseTo(-2, 10);
      expect(en.getIm()).toBeCloseTo(2, 10);
      expect(ei.getRe()).toBeCloseTo(
        0.00792789471147596867707293596691392242441194951611723415,
        10
      );
      expect(ei.getIm()).toBeCloseTo(
        0.0424804804251522110983614991496454374843832377622877467,
        10
      );
    });

    describe('Special Cases', () => {
      test('0^z', () => {
        expect(pow(ZERO, z)).toEqual(ZERO);
      });

      test('z^0', () => {
        expect(pow(z, ZERO)).toEqual(ONE);
      });

      test('0^0', () => {
        expect(pow(ZERO, ZERO)).toEqual(NAN);
      });

      test('∞^0', () => {
        expect(pow(INFINITY, ZERO)).toEqual(NAN);
      });

      test('0^∞', () => {
        expect(pow(ZERO, INFINITY)).toEqual(ZERO);
      });

      test('1^∞', () => {
        expect(pow(ONE, INFINITY)).toEqual(NAN);
      });

      test('∞^∞', () => {
        expect(pow(INFINITY, INFINITY)).toEqual(INFINITY);
      });

      test('z^∞', () => {
        expect(pow(z, INFINITY)).toEqual(INFINITY);
      });
    });
  });

  describe('Trigonometric Functions', () => {
    describe('sin', () => {
      const sz: Complex = sin(z);
      const sw: Complex = sin(w);

      test('sin(z)', () => {
        expect(sz.getRe()).toBeCloseTo(
          1.2984575814159772948260423658078156203134365616352080734,
          10
        );
        expect(sz.getIm()).toBeCloseTo(
          0.63496391478473610825508220299150978151708195141937941052,
          10
        );
        expect(sw.getRe()).toBeCloseTo(
          9.15449914691142957346729954460983255915886056876518297789,
          10
        );
        expect(sw.getIm()).toBeCloseTo(
          -4.16890695996656435075481305885375484357356560475805588996,
          10
        );
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(sin(ZERO)).toEqual(ZERO);
        });

        test('Infinity', () => {
          expect(sin(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(sin(NAN)).toEqual(NAN);
        });
      });
    });

    describe('cos', () => {
      const sz: Complex = cos(z);
      const sw: Complex = cos(w);
      test('cos(z)', () => {
        expect(sz.getRe()).toBeCloseTo(
          0.83373002513114904888388539433509447980987478520962931227,
          10
        );
        expect(sz.getIm()).toBeCloseTo(
          -0.98889770576286509638212954089268618864214969503314760753,
          10
        );
        expect(sw.getRe()).toBeCloseTo(
          -4.1896256909688072301325550196159737286219454041279210357,
          10
        );
        expect(sw.getIm()).toBeCloseTo(
          -9.1092278937553365979791972627788621213326202389201695649,
          10
        );
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(cos(ZERO)).toEqual(ONE);
        });

        test('Infinity', () => {
          expect(cos(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(cos(NAN)).toEqual(NAN);
        });
      });
    });
    describe('tan', () => {
      const sz: Complex = tan(z);
      const sw: Complex = tan(w);

      test('tan(z)', () => {
        expect(sz.getRe()).toBeCloseTo(
          0.27175258531951171652884372249858892070946411146177945309,
          10
        );
        expect(sz.getIm()).toBeCloseTo(
          1.0839233273386945434757520612119717213449675274753898563,
          10
        );
        expect(sw.getRe()).toBeCloseTo(
          -0.0037640256415042482927512211303226908396306202016580864,
          10
        );
        expect(sw.getIm()).toBeCloseTo(
          1.0032386273536098014463585978219272598077897241071003,
          10
        );
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(tan(ZERO)).toEqual(ZERO);
        });

        test('Infinity', () => {
          expect(tan(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(tan(NAN)).toEqual(NAN);
        });
      });
    });

    describe('cot', () => {
      const sz: Complex = cot(z);
      const sw: Complex = cot(w);

      test('cot(z)', () => {
        expect(sz.getRe()).toBeCloseTo(
          0.21762156185440268136513424360523807352075436916785404091,
          10
        );
        expect(sz.getIm()).toBeCloseTo(
          -0.86801414289592494863584920891627388827343874994609327121,
          10
        );
        expect(sw.getRe()).toBeCloseTo(
          -0.0037397103763369566601174086919025762400058903825787505,
          10
        );
        expect(sw.getIm()).toBeCloseTo(
          -0.99675779656935831046096879711747071833201292579034236,
          10
        );
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(cot(ZERO)).toEqual(INFINITY);
        });

        test('Infinity', () => {
          expect(cot(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(cot(NAN)).toEqual(NAN);
        });
      });
    });

    describe('sec', () => {
      const sz: Complex = sec(z);
      const sw: Complex = sec(w);

      test('sec(z)', () => {
        expect(sz.getRe()).toBeCloseTo(
          0.49833703055518678521380589177216953443287793247109398814,
          10
        );
        expect(sz.getIm()).toBeCloseTo(
          0.59108384172104504805039169297433507150365868212588646424,
          10
        );
        expect(sw.getRe()).toBeCloseTo(
          -0.0416749644111442700483499083803288960718713703427135394,
          10
        );
        expect(sw.getIm()).toBeCloseTo(
          0.0906111371962375965296611983372727984226074826771616783,
          10
        );
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(sec(ZERO)).toEqual(ONE);
        });

        test('Infinity', () => {
          expect(sec(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(sec(NAN)).toEqual(NAN);
        });
      });
    });

    describe('csc', () => {
      const sz: Complex = csc(z);
      const sw: Complex = csc(w);

      test('sec(z)', () => {
        expect(sz.getRe()).toBeCloseTo(
          0.62151801717042842123490780585592014816751214181074260992,
          10
        );
        expect(sz.getIm()).toBeCloseTo(
          -0.30393100162842645033448560450970327348872988190146275166,
          10
        );
        expect(sw.getRe()).toBeCloseTo(
          0.09047320975320743980579047913588321135593772687324480684,
          10
        );
        expect(sw.getIm()).toBeCloseTo(
          0.04120098628857412646300981299403968750528596447974263627,
          10
        );
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(csc(ZERO)).toEqual(INFINITY);
        });

        test('Infinity', () => {
          expect(csc(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(csc(NAN)).toEqual(NAN);
        });
      });
    });
  });

  describe('Inverse Trigonometric Functions', () => {
    describe('asin', () => {
      const sz: Complex = asin(z);
      const sw: Complex = asin(w);

      test('asin(z)', () => {
        expect(sz.getRe()).toBeCloseTo(
          0.66623943249251525510400489597779272066749013872594784283,
          10
        );
        expect(sz.getIm()).toBeCloseTo(
          1.0612750619050356520330189162135734858067854989386336963,
          10
        );
        expect(sw.getRe()).toBeCloseTo(
          0.57065278432109940071028387968566965018280324509604013653,
          10
        );
        expect(sw.getIm()).toBeCloseTo(
          1.9833870299165354323470769028940395650142483029093453561,
          10
        );
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(asin(ZERO)).toEqual(ZERO);
        });

        test('Infinity', () => {
          expect(asin(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(asin(NAN)).toEqual(NAN);
        });
      });
    });

    describe('acos', () => {
      const sz: Complex = acos(z);
      const sw: Complex = acos(w);

      test('acos(z)', () => {
        expect(sz.getRe()).toBeCloseTo(
          0.90455689430238136412731679566195872143109456096160506765,
          10
        );
        expect(sz.getIm()).toBeCloseTo(
          -1.0612750619050356520330189162135734858067854989386336963,
          10
        );
        expect(sw.getRe()).toBeCloseTo(
          1.00014354247379721852103781195408179191578145459151277395,
          10
        );
        expect(sw.getIm()).toBeCloseTo(
          -1.98338702991653543234707690289403956501424830290934535612,
          10
        );
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(acos(ZERO)).toEqual(HALFPI);
        });

        test('Infinity', () => {
          expect(acos(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(acos(NAN)).toEqual(NAN);
        });
      });
    });

    describe('atan', () => {
      const sz: Complex = atan(z);
      const sw: Complex = atan(w);

      test('atan(z)', () => {
        expect(sz.getRe()).toBeCloseTo(
          1.0172219678978513677227889615504829220635608769868365871,
          10
        );
        expect(sz.getIm()).toBeCloseTo(
          0.40235947810852509365018983330654690988140033856712943047,
          10
        );
        expect(sw.getRe()).toBeCloseTo(
          1.4099210495965755225306193844604207825882070519087248147,
          10
        );
        expect(sw.getIm()).toBeCloseTo(
          0.22907268296853876629588180294200276786252530497706561694,
          10
        );
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(atan(ZERO)).toEqual(ZERO);
        });

        test('Infinity', () => {
          expect(atan(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(atan(NAN)).toEqual(NAN);
        });
      });
    });

    describe('acot', () => {
      const sz: Complex = acot(z);
      const sw: Complex = acot(w);

      test('acot(z)', () => {
        expect(sz.getRe()).toBeCloseTo(
          0.55357435889704525150853273008926852003502382270071632333,
          10
        );
        expect(sz.getIm()).toBeCloseTo(
          -0.40235947810852509365018983330654690988140033856712943047,
          10
        );
        expect(sw.getRe()).toBeCloseTo(
          0.16087527719832109670070230717933065951037764777882809571,
          10
        );
        expect(sw.getIm()).toBeCloseTo(
          -0.22907268296853876629588180294200276786252530497706561694,
          10
        );
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(acot(ZERO)).toEqual(HALFPI);
        });

        test('Infinity', () => {
          expect(acot(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(acot(NAN)).toEqual(NAN);
        });
      });
    });

    describe('asec', () => {
      const sz: Complex = asec(z);
      const sw: Complex = asec(w);

      test('asec(z)', () => {
        expect(sz.getRe()).toBeCloseTo(
          1.1185178796437059371676632938087720813830374192067503766,
          10
        );
        expect(sz.getIm()).toBeCloseTo(
          0.53063753095251782601650945810678674290339274946931684819,
          10
        );
        expect(sw.getRe()).toBeCloseTo(
          1.420410722467034655979845270384446098088561447594643043,
          10
        );
        expect(sw.getIm()).toBeCloseTo(
          0.23133469857397331454695145510960989630673868362559657012,
          10
        );
      });

      describe('Special Cases', () => {
        test('Infinity', () => {
          expect(asec(INFINITY)).toEqual(HALFPI);
        });

        test('NaN', () => {
          expect(asec(NAN)).toEqual(NAN);
        });
      });
    });

    describe('acsc', () => {
      const sz: Complex = acsc(z);
      const sw: Complex = acsc(w);

      test('acsc(z)', () => {
        expect(sz.getRe()).toBeCloseTo(
          0.45227844715119068206365839783097936071554728048080253382,
          10
        );
        expect(sz.getIm()).toBeCloseTo(
          -0.53063753095251782601650945810678674290339274946931684819,
          10
        );
        expect(sw.getRe()).toBeCloseTo(
          0.15038560432786196325147642125530534401002325209290986747,
          10
        );
        expect(sw.getIm()).toBeCloseTo(
          -0.23133469857397331454695145510960989630673868362559657012,
          10
        );
      });

      describe('Special Cases', () => {
        test('Infinity', () => {
          expect(acsc(INFINITY)).toEqual(ZERO);
        });

        test('NaN', () => {
          expect(acsc(NAN)).toEqual(NAN);
        });
      });
    });
  });

  describe('Hyperbolic', () => {
    describe('sinh', () => {
      test('sinh(z)', () => {
        const sz: Complex = sinh(z);
        const sw: Complex = sinh(w);

        expect(sz.getRe()).toBeCloseTo(
          0.63496391478473610825508220299150978151708195141937941052,
          10
        );
        expect(sz.getIm()).toBeCloseTo(
          1.2984575814159772948260423658078156203134365616352080734,
          10
        );
        expect(sw.getRe()).toBeCloseTo(
          -3.590564589985779952012565447794816793194913675729301509,
          10
        );
        expect(sw.getIm()).toBeCloseTo(
          0.53092108624851980526704009066067655967277345095149103,
          10
        );
      });

      describe('Special Cases', () => {
        test('Infinity', () => {
          expect(sinh(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(sinh(NAN)).toEqual(NAN);
        });
      });
    });

    describe('cosh', () => {
      test('cosh(z)', () => {
        const cz: Complex = cosh(z);
        const cw: Complex = cosh(w);

        expect(cz.getRe()).toBeCloseTo(
          0.83373002513114904888388539433509447980987478520962931227,
          10
        );
        expect(cz.getIm()).toBeCloseTo(
          0.98889770576286509638212954089268618864214969503314760753,
          10
        );
        expect(cw.getRe()).toBeCloseTo(
          -3.724545504915322565473970703255972528674965773215330726,
          10
        );
        expect(cw.getIm()).toBeCloseTo(
          0.5118225699873846088344638498018756342455566094907438674,
          10
        );
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(cosh(ZERO)).toEqual(ONE);
        });

        test('Infinity', () => {
          expect(cosh(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(cosh(NAN)).toEqual(NAN);
        });
      });
    });

    describe('tanh', () => {
      test('tanh(z)', () => {
        const tz: Complex = tanh(z);
        const tw: Complex = tanh(w);

        expect(tz.getRe()).toBeCloseTo(
          1.0839233273386945434757520612119717213449675274753898563,
          10
        );
        expect(tz.getIm()).toBeCloseTo(
          0.27175258531951171652884372249858892070946411146177945309,
          10
        );
        expect(tw.getRe()).toBeCloseTo(
          0.965385879022133124278480269394560685879729650005757773,
          10
        );
        expect(tw.getIm()).toBeCloseTo(
          -0.00988437503832249372031403430350121097961813353467039031,
          10
        );
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(tanh(ZERO)).toEqual(ZERO);
        });

        test('Infinity', () => {
          expect(tanh(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(tanh(NAN)).toEqual(NAN);
        });
      });
    });

    describe('coth', () => {
      test('coth(z)', () => {
        const tz: Complex = coth(z);
        const tw: Complex = coth(w);

        expect(tz.getRe()).toBeCloseTo(
          0.86801414289592494863584920891627388827343874994609327121,
          10
        );
        expect(tz.getIm()).toBeCloseTo(
          -0.21762156185440268136513424360523807352075436916785404091,
          10
        );
        expect(tw.getRe()).toBeCloseTo(
          1.035746637764995396112758656897908320248306959923214042,
          10
        );
        expect(tw.getIm()).toBeCloseTo(
          0.01060478347033710175031689620777929239726759093914072464,
          10
        );
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(coth(ZERO)).toEqual(INFINITY);
        });

        test('Infinity', () => {
          expect(coth(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(coth(NAN)).toEqual(NAN);
        });
      });
    });

    describe('sech', () => {
      test('sech(z)', () => {
        const tz: Complex = sech(z);
        const tw: Complex = sech(w);

        expect(tz.getRe()).toBeCloseTo(
          0.49833703055518678521380589177216953443287793247109398814,
          10
        );
        expect(tz.getIm()).toBeCloseTo(
          -0.59108384172104504805039169297433507150365868212588646424,
          10
        );
        expect(tw.getRe()).toBeCloseTo(
          -0.263512975158389309643604174605426263933263536951180308,
          10
        );
        expect(tw.getIm()).toBeCloseTo(
          -0.0362116365587685208714568977895357612063361777665787908,
          10
        );
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(sech(ZERO)).toEqual(ONE);
        });

        test('Infinity', () => {
          expect(sech(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(sech(NAN)).toEqual(NAN);
        });
      });
    });

    describe('csch', () => {
      test('csch(z)', () => {
        const tz: Complex = csch(z);
        const tw: Complex = csch(w);

        expect(tz.getRe()).toBeCloseTo(
          0.30393100162842645033448560450970327348872988190146275166,
          10
        );
        expect(tz.getIm()).toBeCloseTo(
          -0.62151801717042842123490780585592014816751214181074260992,
          10
        );
        expect(tw.getRe()).toBeCloseTo(
          -0.272548661462940199512498477932708924053539864495446014,
          10
        );
        expect(tw.getIm()).toBeCloseTo(
          -0.0403005788568915218751324795428698677808424754242681263,
          10
        );
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(csch(ZERO)).toEqual(INFINITY);
        });

        test('Infinity', () => {
          expect(csch(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(csch(NAN)).toEqual(NAN);
        });
      });
    });
  });

  describe('Inverse Hyperbolic Functions', () => {
    describe('asinh', () => {
      test('asinh(z)', () => {
        const tz: Complex = asinh(z);
        const tw: Complex = asinh(w);

        expect(tz.getRe()).toBeCloseTo(
          1.0612750619050356520330189162135734858067854989386336963,
          10
        );
        expect(tz.getIm()).toBeCloseTo(
          0.66623943249251525510400489597779272066749013872594784283,
          10
        );
        expect(tw.getRe()).toBeCloseTo(
          1.9686379257930962917886650952454981895207310126820105738,
          10
        );
        expect(tw.getIm()).toBeCloseTo(
          0.96465850440760279204541105949953235551977737250733165271,
          10
        );
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(asinh(ZERO)).toEqual(ZERO);
        });

        test('Infinity', () => {
          expect(asinh(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(asinh(NAN)).toEqual(NAN);
        });
      });
    });

    describe('acosh', () => {
      test('acosh(z)', () => {
        const tz: Complex = acosh(z);
        const tw: Complex = acosh(w);

        expect(tz.getRe()).toBeCloseTo(
          1.0612750619050356520330189162135734858067854989386336963,
          10
        );
        expect(tz.getIm()).toBeCloseTo(
          0.90455689430238136412731679566195872143109456096160506765,
          10
        );
        expect(tw.getRe()).toBeCloseTo(
          1.98338702991653543234707690289403956501424830290934535612,
          10
        );
        expect(tw.getIm()).toBeCloseTo(
          1.00014354247379721852103781195408179191578145459151277395,
          10
        );
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(acosh(ZERO)).toEqual(new Complex(0, Math.PI / 2));
        });

        test('Infinity', () => {
          expect(acosh(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(acosh(NAN)).toEqual(NAN);
        });
      });
    });

    describe('atanh', () => {
      test('atanh(z)', () => {
        const tz: Complex = atanh(z);
        const tw: Complex = atanh(w);

        expect(tz.getRe()).toBeCloseTo(
          0.40235947810852509365018983330654690988140033856712943047,
          10
        );
        expect(tz.getIm()).toBeCloseTo(
          1.0172219678978513677227889615504829220635608769868365871,
          10
        );
        expect(tw.getRe()).toBeCloseTo(
          0.14694666622552975204743278515471594244234494034424529538,
          10
        );
        expect(tw.getIm()).toBeCloseTo(
          1.3389725222944935611241935759091442410843161725444927785,
          10
        );
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(atanh(ZERO)).toEqual(ZERO);
        });

        test('Infinity', () => {
          expect(atanh(INFINITY)).toEqual(NAN);
        });

        test('NaN', () => {
          expect(atanh(NAN)).toEqual(NAN);
        });
      });
    });

    describe('acoth', () => {
      test('acoth(z)', () => {
        const tz: Complex = acoth(z);
        const tw: Complex = acoth(w);

        expect(tz.getRe()).toBeCloseTo(
          0.40235947810852509365018983330654690988140033856712943047,
          10
        );
        expect(tz.getIm()).toBeCloseTo(
          -0.55357435889704525150853273008926852003502382270071632333,
          10
        );
        expect(tw.getRe()).toBeCloseTo(
          0.14694666622552975204743278515471594244234494034424529538,
          10
        );
        expect(tw.getIm()).toBeCloseTo(
          -0.2318238045004030581071281157306072010142685271430601319,
          10
        );
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(acoth(ZERO)).toEqual(NAN);
        });

        test('Infinity', () => {
          expect(acoth(INFINITY)).toEqual(ZERO);
        });

        test('NaN', () => {
          expect(acoth(NAN)).toEqual(NAN);
        });
      });
    });

    describe('asech', () => {
      test('asech(z)', () => {
        const tz: Complex = asech(z);
        const tw: Complex = asech(w);

        expect(tz.getRe()).toBeCloseTo(
          0.53063753095251782601650945810678674290339274946931684819,
          10
        );
        expect(tz.getIm()).toBeCloseTo(
          -1.1185178796437059371676632938087720813830374192067503766,
          10
        );
        expect(tw.getRe()).toBeCloseTo(
          0.23133469857397331454695145510960989630673868362559657012,
          10
        );
        expect(tw.getIm()).toBeCloseTo(
          -1.420410722467034655979845270384446098088561447594643043,
          10
        );
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(asech(ZERO)).toEqual(NAN);
        });

        test('Infinity', () => {
          expect(asech(INFINITY)).toEqual(new Complex(0, Math.PI / 2));
        });

        test('NaN', () => {
          expect(asech(NAN)).toEqual(NAN);
        });
      });
    });

    describe('acsch', () => {
      test('acsch(z)', () => {
        const tz: Complex = acsch(z);
        const tw: Complex = acsch(w);

        expect(tz.getRe()).toBeCloseTo(
          0.53063753095251782601650945810678674290339274946931684819,
          10
        );
        expect(tz.getIm()).toBeCloseTo(
          -0.45227844715119068206365839783097936071554728048080253382,
          10
        );
        expect(tw.getRe()).toBeCloseTo(
          0.15735549884498542878232884070374809348875711668583239203,
          10
        );
        expect(tw.getIm()).toBeCloseTo(
          -0.22996290237720785451396729701376055364030873702291137157,
          10
        );
      });

      describe('Special Cases', () => {
        test('Zero', () => {
          expect(acsch(ZERO)).toEqual(NAN);
        });

        test('Infinity', () => {
          expect(acsch(INFINITY)).toEqual(ZERO);
        });

        test('NaN', () => {
          expect(acsch(NAN)).toEqual(NAN);
        });
      });
    });
  });
});
