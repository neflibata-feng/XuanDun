import { getPermalink, getBlogPermalink, cleanSlug } from './utils/permalinks';

export type SiteLocale = 'zh' | 'en';

const socialLinks = [
  { ariaLabel: 'Mail', icon: 'tabler:brand-gmail', href: 'mailto:neflibatafeng@gmail.com' },
  { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: 'https://github.com/neflibata-feng/XuanDun' },
];

export const getHeaderData = (locale: SiteLocale = 'zh') => {
  if (locale === 'en') {
    return {
      links: [
        { text: 'Home', href: getPermalink('/') },
        {
          text: 'Documentation',
          links: [
            { text: 'API Reference', href: '#' },
            { text: 'Product Guide', href: '#' },
            { text: 'Terms', href: getPermalink('/terms') },
            { text: 'Privacy', href: getPermalink('/privacy') },
            { text: 'Contact', href: getPermalink('/contact') },
          ],
        },
        {
          text: 'Blog',
          links: [
            { text: 'Posts', href: getBlogPermalink() },
            { text: 'Categories', href: getPermalink(cleanSlug('公告'), 'category') },
            { text: 'Tags', href: getPermalink(cleanSlug('团队'), 'tag') },
          ],
        },
      ],
      actions: [
        {
          text: 'Source Code',
          href: 'https://github.com/neflibata-feng/XuanDun',
          target: '_blank',
        },
      ],
    };
  }

  return {
    links: [
      { text: '首页', href: getPermalink('/zh') },
      {
        text: '文档中心',
        links: [
          { text: 'API接口说明', href: '#' },
          { text: '产品手册', href: '#' },
          { text: '服务协议', href: getPermalink('/zh/terms') },
          { text: '隐私政策', href: getPermalink('/zh/privacy') },
          { text: '联系方式', href: getPermalink('/zh/contact') },
        ],
      },
      {
        text: '博客',
        links: [
          { text: '文章列表', href: getPermalink('/zh/articles') },
          { text: '分类检索', href: getPermalink(`/zh/category/${cleanSlug('公告')}`) },
          { text: '标签检索', href: getPermalink(`/zh/tag/${cleanSlug('团队')}`) },
        ],
      },
    ],
    actions: [
      {
        text: '获取源代码',
        href: 'https://github.com/neflibata-feng/XuanDun',
        target: '_blank',
        'data-star-modal': 'true',
      },
    ],
  };
};

export const getFooterData = (locale: SiteLocale = 'zh') => {
  if (locale === 'en') {
    return {
      links: [
        {
          title: 'Product',
          links: [
            { text: 'Overview', href: '#' },
            { text: 'Experience', href: '#' },
            { text: 'Pricing', href: '#' },
            { text: 'Resources', href: '#' },
          ],
        },
        {
          title: 'Support',
          links: [
            { text: 'API Reference', href: '#' },
            { text: 'Product Guide', href: '#' },
            { text: 'Contact', href: getPermalink('/contact') },
          ],
        },
        {
          title: 'Policies',
          links: [
            { text: 'Terms', href: getPermalink('/terms') },
            { text: 'Privacy', href: getPermalink('/privacy') },
          ],
        },
        {
          title: 'Team',
          links: [
            { text: 'Blog', href: getBlogPermalink() },
            { text: 'Join Us', href: '#' },
          ],
        },
      ],
      secondaryLinks: [
        { text: 'Terms', href: getPermalink('/terms') },
        { text: 'Privacy', href: getPermalink('/privacy') },
      ],
      socialLinks,
      footNote: `
        Built on <a class="text-blue-600 underline dark:text-muted" href="https://github.com/withastro/astro">Astro</a> and AstroWind · XuanDun Developer Team.
      `,
    };
  }

  return {
    links: [
      {
        title: '产品',
        links: [
          { text: '介绍', href: '#' },
          { text: '体验', href: '#' },
          { text: '定价', href: '#' },
          { text: '资源', href: '#' },
        ],
      },
      {
        title: '支持',
        links: [
          { text: 'API接口说明', href: '#' },
          { text: '产品手册', href: '#' },
          { text: '联系方式', href: getPermalink('/zh/contact') },
        ],
      },
      {
        title: '协议',
        links: [
          { text: '服务协议', href: getPermalink('/zh/terms') },
          { text: '隐私政策', href: getPermalink('/zh/privacy') },
        ],
      },
      {
        title: '团队',
        links: [
          { text: '博客', href: getPermalink('/zh/articles') },
          { text: '加入我们', href: '#' },
        ],
      },
    ],
    secondaryLinks: [
      { text: '服务协议', href: getPermalink('/zh/terms') },
      { text: '隐私政策', href: getPermalink('/zh/privacy') },
    ],
    socialLinks,
    footNote: `
      感谢开源组织 <a class="text-blue-600 underline dark:text-muted" href="https://github.com/withastro/astro">Astro</a>，基于 AstroWind 创建 · 玄盾团队版权所有。
    `,
  };
};

export const headerData = getHeaderData();
export const footerData = getFooterData();
