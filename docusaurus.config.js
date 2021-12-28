// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Towhee Docs",
  tagline: "",
  url: "https://docs.towhee.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "Towhee", // Usually your GitHub org/user name.
  projectName: "towhee-docs", // Usually your repo name.

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: "docs",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/towhee-io/towhee-docs/blob/main",
          routeBasePath: "/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-0JXY6PQLWQ",
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "",
        logo: {
          alt: "Towhee logo",
          src: "img/logo.png",
          href: "https://towhee.io/",
        },
        items: [
          {
            href: "https://towhee.io/pipelines",
            label: 'Pipelines',
            position: "right",
            className: "header-link"
          },
          {
            href: "https://towhee.io/operators",
            label: "Operators",
            position: "right",
            className: "header-link"
          }, {
            href: "/",
            label: "Documentation",
            position: "right",
            className: "header-link"
          }, {
            href: "https://towhee.io/user/login",
            label: "Sign in",
            className: "header-outline-button",
            position: "right"
          }
          // {
          //   href: "https://github.com/towhee-io/towhee",
          //   label: "GitHub",
          //   position: "right",
          // },
        ],
      },
      footer: {
        logo: {
          alt: "Towhee logo",
          src: "img/logo.png",
          href: "https://towhee.io/",
        },
        links: [
          {
            label: "Contribute",
            href: "https://github.com/towhee-io/towhee"
          },
          {
            label: "Pipelines",
            href: "https://towhee.io/pipelines",
          },
          {
            label: "Operators",
            href: "https://towhee.io/operators"
          },
          {
            label: "Documentation",
            to: "/"
          }
        ],
        copyright: `© Towhee.${new Date().getFullYear()} All rights reserved.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      // hide dark mode
      colorMode: {
        disableSwitch: true,
      },
    }),
};

module.exports = config;
