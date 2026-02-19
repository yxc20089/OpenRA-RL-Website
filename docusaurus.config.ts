import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'OpenRA-RL',
  tagline: 'Train AI Agents to Play Real-Time Strategy',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://yxc20089.github.io',
  baseUrl: '/OpenRA-RL-Website/',

  organizationName: 'yxc20089',
  projectName: 'OpenRA-RL-Website',

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
          editUrl:
            'https://github.com/yxc20089/OpenRA-RL-Website/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/yxc20089/OpenRA-RL-Website/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/openra-rl-social-card.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'OpenRA-RL',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://huggingface.co/spaces/openenv/OpenRA-Bench',
          label: 'Leaderboard',
          position: 'left',
        },
        {
          href: 'https://github.com/yxc20089/OpenRA-RL',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started',
            },
            {
              label: 'Architecture',
              to: '/docs/architecture',
            },
            {
              label: 'API Reference',
              to: '/docs/api-reference',
            },
          ],
        },
        {
          title: 'Ecosystem',
          items: [
            {
              label: 'OpenRA-Bench (Leaderboard)',
              href: 'https://huggingface.co/spaces/openenv/OpenRA-Bench',
            },
            {
              label: 'OpenEnv Framework',
              href: 'https://huggingface.co/openenv',
            },
            {
              label: 'OpenRA Game Engine',
              href: 'https://www.openra.net/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/yxc20089/OpenRA-RL',
            },
          ],
        },
      ],
      copyright: `Copyright ${new Date().getFullYear()} OpenRA-RL Contributors. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['protobuf', 'csharp', 'bash', 'yaml', 'docker'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
