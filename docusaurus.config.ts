import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'OpenRA-RL',
  tagline: 'Train AI Agents to Play Real-Time Strategy',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: 'https://openra-rl.dev',
  baseUrl: '/',

  organizationName: 'yxc20089',
  projectName: 'OpenRA-RL-Website',

  onBrokenLinks: 'throw',

  headTags: [
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'OpenRA-RL',
        url: 'https://openra-rl.dev',
      }),
    },
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    localeConfigs: {
      en: {label: 'English'},
      zh: {label: '中文', htmlLang: 'zh-CN'},
    },
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
        {to: '/leaderboard', label: 'Leaderboard', position: 'left'},
        {to: '/research', label: 'R&D Division', position: 'left'},
        {
          href: 'https://github.com/yxc20089/OpenRA-RL',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'localeDropdown',
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
              href: 'https://github.com/yxc20089/OpenRA-Bench',
            },
            {
              label: 'HuggingFace Community',
              href: 'https://huggingface.co/openra-rl',
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
