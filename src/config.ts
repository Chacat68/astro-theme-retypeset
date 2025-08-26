import type { ThemeConfig } from '@/types'

export const themeConfig: ThemeConfig = {
  // 网站信息 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 开始
  site: {
    // 网站标题
    title: '付之一笑',
    // 网站副标题
    subtitle: '日常在阅读、创作、跑步。',
    // 网站描述
    description: '不断创作一些新东西，源源不断给自己创造心流！',
    // 使用 src/i18n/ui.ts 中的国际化标题/副标题/描述，而不是上面的静态内容
    i18nTitle: false, // true, false
    // 作者姓名
    author: 'CHACAT',
    // 网站链接
    url: 'https://www.chawfoo.com',
    // 网站图标链接
    // 推荐格式：svg、png 或 ico
    favicon: '/icons/favicon.svg', // 或 https://example.com/favicon.svg
  },
  // 网站信息 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 结束

  // 颜色设置 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 开始
  color: {
    // 默认主题模式
    mode: 'auto', // light, dark, auto
    light: {
      // 主要颜色
      // 用于标题、悬停等
      // oklch 颜色选择器：https://oklch.com/
      primary: 'oklch(0.24 0.0172 280.05)',
      // 次要颜色
      // 用于文章文本
      secondary: 'oklch(0.40 0.0172 280.05)',
      // 背景颜色
      background: 'oklch(0.98 0.0172 280.05)',
      // 高亮颜色
      // 用于导航栏、选中文本等
      highlight: 'oklch(0.93 0.195089 103.2532 / 0.5)', // rgba(255,235,0,0.5)
    },
    dark: {
      // 主要颜色
      primary: 'oklch(0.92 0.0172 280.05)',
      // 次要颜色
      secondary: 'oklch(0.79 0.0172 280.05)',
      // 背景颜色
      background: 'oklch(0.24 0.0172 280.05)',
      // 高亮颜色
      highlight: 'oklch(0.93 0.195089 103.2532 / 0.2)', // rgba(255,235,0,0.2)
    },
  },
  // 颜色设置 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 结束

  // 全局设置 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 开始
  global: {
    // 默认语言
    locale: 'zh', // de, en, es, fr, ja, ko, pl, pt, ru, zh, zh-tw
    // 更多语言
    // 不要重复填写上面的语言代码，可以是空数组 []
    moreLocales: [], // ['de', 'en', 'es', 'fr', 'ja', 'ko', 'pl', 'pt', 'ru', 'zh', 'zh-tw']
    // 文章文本的字体样式
    fontStyle: 'sans', // sans, serif
    // 文章的日期格式
    dateFormat: 'YYYY-MM-DD', // YYYY-MM-DD, MM-DD-YYYY, DD-MM-YYYY, MONTH DAY YYYY, DAY MONTH YYYY
    // 文章目录
    toc: true, // true, false
    // KaTeX 数学公式渲染
    katex: true, // true, false
    // 减少动画
    reduceMotion: false, // true, false
  },
  // 全局设置 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 结束

  // 评论设置 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 开始
  comment: {
    // 启用评论系统
    enabled: true, // true, false
    // giscus
    // https://giscus.app/
    giscus: {
      repo: '',
      repoId: '',
      category: '',
      categoryId: '',
      mapping: 'pathname',
      strict: '0',
      reactionsEnabled: '1',
      emitMetadata: '0',
      inputPosition: 'bottom',
    },
    // twikoo
    // https://twikoo.js.org/
    twikoo: {
      envId: '',
      // 版本：前端版本可以在 package.json 中更改
    },
    // waline
    // https://waline.js.org/en/
    waline: {
      // 服务器链接
      serverURL: 'https://retypeset-comment.radishzz.cc',
      // 表情包链接
      emoji: [
        'https://unpkg.com/@waline/emojis@1.2.0/tw-emoji',
        // 'https://unpkg.com/@waline/emojis@1.2.0/bmoji',
        // 更多表情包：https://waline.js.org/en/guide/features/emoji.html
      ],
      // gif 搜索
      search: false, // true, false
      // 图片上传
      imageUploader: false, // true, false
    },
  },
  // 评论设置 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 结束

  // SEO 设置 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 开始
  seo: {
    // @twitter ID
    twitterID: '@Chacat68',
    // 网站验证
    verification: {
      // 谷歌搜索控制台
      // https://search.google.com/search-console
      google: '',
      // 必应网站管理员工具
      // https://www.bing.com/webmasters
      bing: '',
      // yandex 网站管理员
      // https://webmaster.yandex.com
      yandex: '',
      // 百度搜索
      // https://ziyuan.baidu.com
      baidu: '',
    },
    // 谷歌分析
    // https://analytics.google.com
    googleAnalyticsID: '',
    // umami 分析
    // https://cloud.umami.is
    umamiAnalyticsID: 'e49c70c3-26a8-46d9-b241-6a47a00574f2',
    // follow 验证
    // https://follow.is/
    follow: {
      // feed ID
      feedID: '',
      // 用户 ID
      userID: '',
    },
    // apiflash 访问密钥
    // 自动为开放图谱图像生成网站截图
    // 在此获取访问密钥：https://apiflash.com/
    apiflashKey: '',
  },
  // SEO 设置 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 结束

  // 页脚设置 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 开始
  footer: {
    // 社交链接
    links: [
      {
        name: 'RSS',
        url: '/atom.xml', // 或 /rss.xml
      },
      {
        name: 'GitHub',
        url: 'https://github.com/Chacat68',
      },
      {
        name: 'Email',
        url: 'chawf56@outlook.com',
      },
      {
        name: 'X',
         url: 'https://x.com/Chacat68',
      },
    ],
    // 网站开始年份
    startYear: 2020,
  },
  // 页脚设置 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 结束

  // 预加载设置 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 开始
  preload: {
    // 图片托管链接
    // 优化 Markdown 文件中的远程图片以避免累积布局偏移
    imageHostURL: 'image.radishzz.cc',
    // 自定义谷歌分析 js
    // 适用于将分析 javascript 路由到自定义域名的用户
    // 参见 https://gist.github.com/xiaopc/0602f06ca465d76bd9efd3dda9393738
    customGoogleAnalyticsJS: '',
    // 自定义 umami 分析 js
    // 适用于自行部署 umami 或将分析 javascript 路由到自定义域名的用户
    // 参见 https://github.com/umami-software/umami/discussions/1026
    customUmamiAnalyticsJS: 'https://js.radishzz.cc/jquery.min.js',
  },
  // 预加载设置 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 结束
}

export default themeConfig

export const defaultLocale = themeConfig.global.locale
export const moreLocales = themeConfig.global.moreLocales
export const allLocales = [defaultLocale, ...moreLocales]
