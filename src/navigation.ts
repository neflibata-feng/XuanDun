import { getPermalink, getBlogPermalink, getAsset, cleanSlug } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: '首页',
      href: getPermalink('/'),
    },
    {
      text: '文档中心',
      links: [
        {
          text: 'API接口说明',
          href: '#',
        },
        {
          text: '产品手册',
          href: '#',
        },
        {
          text: '服务协议',
          href: getPermalink('/terms'),
        },
        {
          text: '隐私政策',
          href: getPermalink('/privacy'),
        },
        {
          text: '联系方式',
          href: getPermalink('/contact'),
        },
      ],
    },
    {
      text: '博客',
      links: [
        {
          text: '文章列表',
          href: getBlogPermalink(),
        },
        {
          text: '分类检索',
          href: getPermalink(cleanSlug('公告'), 'category'),
        },
        {
          text: '标签检索',
          href: getPermalink(cleanSlug('团队'), 'tag'),
        },
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

export const footerData = {
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
        { text: '联系方式', href: getPermalink('/contact') },
      ],
    },
    {
      title: '协议',
      links: [
        { text: '服务协议', href: getPermalink('/terms') },
        { text: '隐私政策', href: getPermalink('/privacy') },
      ],
    },
    {
      title: '团队',
      links: [
        { text: '博客', href: getBlogPermalink() },
        { text: '加入我们', href: '#' },
      ],
    },
  ],
  secondaryLinks: [
    { text: '服务协议', href: getPermalink('/terms') },
    { text: '隐私政策', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'Mail', icon: 'tabler:brand-gmail', href: 'mailto:neflibatafeng@gmail.com' },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/neflibata-feng/XuanDun' },
  ],
  footNote: `
    感谢开源组织 <a class="text-blue-600 underline dark:text-muted" href="https://github.com/withastro/astro"> astro</a> 基于astrowind创建·玄盾团队版权所有。
  `,
};
