import { defineCollection, z } from 'astro:content';

// 定义文章集合
const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    published: z.date(),
    updated: z.date().optional(),
    draft: z.boolean().optional().default(false),
    description: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
    lang: z.string().optional(),
    // 添加 pin 属性用于置顶文章
    pin: z.number().optional(),
  }),
});

// 定义项目集合
const projectsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string().optional(),
        url: z.string().optional(),
        github: z.string().optional(),
        tags: z.array(z.string()).optional(),
        status: z.string().optional(),
        featured: z.boolean().optional(),
        order: z.number().optional(),
        lang: z.string().optional(),
    }),
});

// 定义关于页面集合
const aboutCollection = defineCollection({
    type: 'content',
    schema: z.object({
        lang: z.string(),
    }),
});

// 导出所有集合
export const collections = {
  posts: postsCollection,
  projects: projectsCollection,
  about: aboutCollection,
};