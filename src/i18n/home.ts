import type { CallToAction, Item } from '~/types';
import type { SiteLocale } from '~/navigation';

interface HomeCopy {
  metadata: {
    title: string;
    description: string;
    openGraphLocale: 'zh_CN' | 'en_US';
  };
  hero: {
    title: string;
    subtitle: string;
    actions: CallToAction[];
  };
  note: {
    title: string;
    description: string;
  };
  origin: {
    tagline: string;
    title: string;
    subtitle: string;
    items: Item[];
  };
  steps: {
    title: string;
    items: Item[];
    imageAlt: string;
  };
  capabilities: {
    title: string;
    subtitle: string;
    tagline: string;
    items: Item[];
  };
  team: {
    title: string;
    subtitle: string;
  };
  projectsTitle: string;
  projectsAriaLabel: string;
}

const sharedTechnologies: Item[] = [
  { title: 'Python', icon: 'tabler:brand-python' },
  { title: 'TypeScript', icon: 'tabler:brand-typescript' },
  { title: 'Java', icon: 'tabler:coffee' },
  { title: 'Kotlin', icon: 'tabler:brand-kotlin' },
  { title: 'Spring Boot', icon: 'tabler:leaf' },
  { title: 'Flask', icon: 'tabler:flask' },
  { title: 'MySQL', icon: 'tabler:brand-mysql' },
  { title: 'Redis', icon: 'tabler:database' },
  { title: 'Docker', icon: 'tabler:brand-docker' },
];

export const homeCopy = {
  zh: {
    metadata: {
      title: '玄盾开发者团队官网',
      description: '玄盾开发者团队来自电子科技大学，专注于多领域智能体的研发与应用。',
      openGraphLocale: 'zh_CN',
    },
    hero: {
      title:
        '致力于 <span class="bg-gradient-to-r from-blue-300 via-cyan-200 to-violet-300 bg-clip-text text-transparent">AI 时代</span> 多领域智能体研发',
      subtitle: '<span class="font-semibold">玄盾开发者团队</span> 来自电子科技大学 · 中国成都',
      actions: [
        {
          variant: 'primary',
          text: '加入我们',
          href: 'https://github.com/neflibata-feng/XuanDun',
          target: '_blank',
          icon: 'tabler:hand-click',
        },
        { text: '了解更多', href: '#features' },
      ],
    },
    note: {
      title: '玄盾开发者团队',
      description: ' XuanDun ',
    },
    origin: {
      tagline: 'Name',
      title: '为什么命名为玄盾开发者团队？',
      subtitle: 'Why is it named XuanDun Developer Team?',
      items: [
        {
          title: '玄',
          description:
            '取意“玄而又玄，众妙之门”。玄盾立足 AI 时代，探索智能体推理、工具调用与多领域协作，让复杂任务拥有更清晰的执行路径。',
          icon: 'tabler:brain',
        },
        {
          title: '盾',
          description:
            '代表可靠的工程底座。我们围绕智能体编排、知识连接与应用落地，持续构建可组合、可演进的智能体产品。',
          icon: 'tabler:components',
        },
      ],
    },
    steps: {
      title: '只需三步，即可加入我们团队',
      items: [
        {
          title: '步骤 1：<span class="font-medium">在线核验身份</span>',
          description: '您必须来自电子科技大学且为本科在读。',
          icon: 'tabler:id',
        },
        {
          title: '步骤 2：<span class="font-medium">提交简历</span>',
          description: '您需要将简历提交到我们指定的邮箱。',
          icon: 'tabler:file-description',
        },
        {
          title: '步骤 3：<span class="font-medium">审核与面试</span>',
          description: '经过审核后，我们将与您联系预约线下面试，通过即可加入团队。',
          icon: 'tabler:messages',
        },
        { title: '完成！', icon: 'tabler:check' },
      ],
      imageAlt: '团队协作与智能体研发',
    },
    capabilities: {
      title: '智能体工程能力',
      subtitle: 'Agent Engineering Capabilities',
      tagline: 'Components',
      items: [
        { title: '智能体编排', icon: 'tabler:route' },
        { title: '工具调用', icon: 'tabler:tools' },
        { title: '知识检索', icon: 'tabler:database-search' },
        { title: '长期记忆', icon: 'tabler:stack-2' },
        { title: '多模态理解', icon: 'tabler:scan-eye' },
        { title: '评测与观测', icon: 'tabler:chart-dots-3' },
        ...sharedTechnologies,
      ],
    },
    team: {
      title: '团队核心成员',
      subtitle: 'Meet Our Team',
    },
    projectsTitle: '团队项目',
    projectsAriaLabel: '项目展示：XuanDun Finance、TraceMovie 与 SciClaw',
  },
  en: {
    metadata: {
      title: 'XuanDun Developer Team',
      description:
        'XuanDun Developer Team at the University of Electronic Science and Technology of China builds multi-domain AI agents and applications.',
      openGraphLocale: 'en_US',
    },
    hero: {
      title:
        'Building multi-domain agents for the <span class="bg-gradient-to-r from-blue-300 via-cyan-200 to-violet-300 bg-clip-text text-transparent">AI era</span>',
      subtitle: '<span class="font-semibold">XuanDun Developer Team</span> · UESTC · Chengdu, China',
      actions: [
        {
          variant: 'primary',
          text: 'Join Us',
          href: 'https://github.com/neflibata-feng/XuanDun',
          target: '_blank',
          icon: 'tabler:hand-click',
        },
        { text: 'Learn More', href: '#features' },
      ],
    },
    note: {
      title: 'XuanDun Developer Team',
      description: ' 玄盾 ',
    },
    origin: {
      tagline: 'Name',
      title: 'Why is it named XuanDun Developer Team?',
      subtitle: '为什么命名为玄盾开发者团队？',
      items: [
        {
          title: '玄 · Xuan',
          description:
            'Xuan evokes depth, possibility, and the gateway to discovery. We explore agent reasoning, tool use, and cross-domain collaboration so complex work can follow a clearer path.',
          icon: 'tabler:brain',
        },
        {
          title: '盾 · Dun',
          description:
            'Dun represents a dependable engineering foundation. We build composable, evolving agent products through orchestration, connected knowledge, and practical applications.',
          icon: 'tabler:components',
        },
      ],
    },
    steps: {
      title: 'Join the team in three steps',
      items: [
        {
          title: 'Step 1: <span class="font-medium">Verify your identity</span>',
          description: 'You must be a current undergraduate student at UESTC.',
          icon: 'tabler:id',
        },
        {
          title: 'Step 2: <span class="font-medium">Submit your résumé</span>',
          description: 'Send your résumé to the designated team email address.',
          icon: 'tabler:file-description',
        },
        {
          title: 'Step 3: <span class="font-medium">Review and interview</span>',
          description: 'After review, we will contact you to arrange an in-person interview.',
          icon: 'tabler:messages',
        },
        { title: 'Complete!', icon: 'tabler:check' },
      ],
      imageAlt: 'Team collaboration and agent development',
    },
    capabilities: {
      title: 'Agent Engineering Capabilities',
      subtitle: '智能体工程能力',
      tagline: 'Components',
      items: [
        { title: 'Agent Orchestration', icon: 'tabler:route' },
        { title: 'Tool Calling', icon: 'tabler:tools' },
        { title: 'Knowledge Retrieval', icon: 'tabler:database-search' },
        { title: 'Long-term Memory', icon: 'tabler:stack-2' },
        { title: 'Multimodal Understanding', icon: 'tabler:scan-eye' },
        { title: 'Evaluation & Observability', icon: 'tabler:chart-dots-3' },
        ...sharedTechnologies,
      ],
    },
    team: {
      title: 'Meet Our Team',
      subtitle: '团队核心成员',
    },
    projectsTitle: 'TEAM PROJECTS',
    projectsAriaLabel: 'Projects: XuanDun Finance, TraceMovie, and SciClaw',
  },
} as const satisfies Record<SiteLocale, HomeCopy>;
