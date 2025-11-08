import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

const config: Config = {
  title: 'Complex.js',
  tagline: 'A simple complex-numbers library for browsers and Node.js',
  favicon: 'img/favicon.png',

  future: {
    v4: true,
  },

  url: 'https://complex-js.iamsquare.it',
  baseUrl: '/',

  organizationName: 'iamsquare',
  projectName: 'complex.js',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: 'https://github.com/iamsquare/complex.js/tree/refactor/v2-revamp/documentation/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Complex.js',
      logo: {
        alt: 'Complex.js Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          href: 'https://github.com/iamsquare/complex.js',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://www.npmjs.com/package/@iamsquare/complex.js',
          label: 'NPM',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} iamsquare. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
