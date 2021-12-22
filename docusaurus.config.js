// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Towhee Docs',
  tagline: '',
  url: 'https://docs.towhee.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Towhee', // Usually your GitHub org/user name.
  projectName: 'towhee-docs', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/towhee-io/towhee-docs/blob/main',
          routeBasePath: '/'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-0JXY6PQLWQ',
          anonymizeIP: true
        }
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '',
        logo: {
          alt: 'Towhee logo',
          src: 'img/logo.png',
          href: '/'
        },
        items: [
          // {
          //   type: 'doc',
          //   docId: '/',
          //   position: 'left',
          //   label: 'quick start',
          // },
          {
            href: 'https://github.com/towhee-io/towhee',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Quick Start',
                to: '/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Slack',
                href: 'https://slack.towhee.io',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/towheeio',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/towhee-io/towhee',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Towhee, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      // hide dark mode
      colorMode: {
        disableSwitch: true,
      }
    }),
};

module.exports = config;
