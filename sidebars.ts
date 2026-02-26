import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'getting-started',
    'architecture',
    {
      type: 'category',
      label: 'Reference',
      items: [
        'observation-space',
        'action-space',
        'api-reference',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'agents',
        'docker',
        'benchmarking',
      ],
    },
    'roadmap',
  ],
};

export default sidebars;
