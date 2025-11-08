import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'API Reference',
      items: ['api/complex-class'],
    },
    {
      type: 'category',
      label: 'Operations',
      items: ['operations/arithmetic', 'operations/utility', 'operations/type-checking'],
    },
    {
      type: 'category',
      label: 'Functions',
      items: [
        'functions/exponential-logarithmic',
        'functions/trigonometric',
        'functions/inverse-trigonometric',
        'functions/hyperbolic',
        'functions/inverse-hyperbolic',
      ],
    },
    {
      type: 'category',
      label: 'Examples',
      items: [
        'examples/quadratic-equation',
        'examples/eulers-formula',
        'examples/polar-coordinates',
        'examples/fourier-transform',
      ],
    },
  ],
};

export default sidebars;
