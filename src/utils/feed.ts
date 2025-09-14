import type { CollectionEntry } from 'astro:content'
import { getImage } from 'astro:assets'
import { getCollection } from 'astro:content'
import { Feed } from 'feed'
import MarkdownIt from 'markdown-it'
import { parse } from 'node-html-parser'
import sanitizeHtml from 'sanitize-html'
import { defaultLocale, themeConfig } from '@/config'
import { ui } from '@/i18n/ui'
import { memoize } from '@/utils/cache'
import { getPostDescription } from '@/utils/description'

const markdownParser = new MarkdownIt()
const { title, description, url, author } = themeConfig.site
const followConfig = themeConfig.seo?.follow

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// 动态导入 /src/content/posts/_images 目录下的所有图片
const imagesGlob = import.meta.glob(
  '/src/content/posts/_images/**/*.{jpeg,jpg,png,gif,webp}',
)

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// 缓存的图片获取函数
const getCachedImage = memoize(async (imagePath: string) => {
  const imageImporter = imagesGlob[imagePath]
  if (!imageImporter) {
    console.warn(`Image not found: ${imagePath}`)
    return null
  }

  try {
    const importedModule = await imageImporter()
    const imageMetadata = (importedModule as any)?.default
    
    if (!imageMetadata) {
      console.warn(`Image metadata not found for: ${imagePath}`)
      return null
    }

    const optimizedImage = await getImage({ src: imageMetadata })
    return optimizedImage
  } catch (error) {
    console.error(`Error processing image ${imagePath}:`, error)
    return null
  }
})

/**
 * Fix relative image paths in HTML content
 *
 * @param htmlContent HTML content string
 * @param baseUrl Base URL of the site
 * @returns Processed HTML string with all image paths converted to absolute URLs
 */
async function fixRelativeImagePaths(htmlContent: string, baseUrl: string): Promise<string> {
  const htmlDoc = parse(htmlContent)
  const images = htmlDoc.getElementsByTagName('img')
  const imagePromises = []

  for (const img of images) {
    const src = img.getAttribute('src')
    if (!src) {
      continue
    }

    imagePromises.push((async () => {
      try {
        // Skip if not a relative path to src/content/posts/_images directory
        if (!src.startsWith('./') && !src.startsWith('../') && !src.startsWith('_images/')) {
          return
        }

        // Process images from src/content/posts/_images directory
        const prefixRemoved = src.replace(/^(?:\.\.\/)+|^\.\//, '')
        const absolutePath = `/src/content/posts/${prefixRemoved}`
        const optimizedImage = await getCachedImage(absolutePath)
        if (optimizedImage) {
          const absoluteImageUrl = new URL(optimizedImage.src, baseUrl).toString()
          img.setAttribute('src', absoluteImageUrl)
        }
      }
      catch (error) {
        console.warn(`Failed to convert relative image path to absolute URL: ${src}`, error)
      }
    })())
  }

  await Promise.all(imagePromises)

  return htmlDoc.toString()
}

/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * Generate a feed object supporting both RSS and Atom formats
 *
 * @param options Feed generation options
 * @param options.lang Optional language code
 * @returns A Feed instance ready for RSS or Atom output
 */
export async function generateFeed({ lang }: { lang?: string } = {}) {
  const currentUI = ui[lang as keyof typeof ui] ?? ui[defaultLocale as keyof typeof ui] ?? {}
  const useI18nTitle = themeConfig.site.i18nTitle
  const siteURL = lang ? `${url}/${lang}/` : `${url}/`

  // Create Feed instance
  const feed = new Feed({
    title: useI18nTitle ? currentUI.title : title,
    description: useI18nTitle ? currentUI.description : description,
    id: siteURL,
    link: siteURL,
    language: lang ?? themeConfig.global.locale,
    copyright: `Copyright © ${new Date().getFullYear()} ${author}`,
    updated: new Date(),
    generator: 'Astro-Theme-Retypeset with Feed for Node.js',

    feedLinks: {
      rss: new URL(lang ? `/${lang}/rss.xml` : '/rss.xml', url).toString(),
      atom: new URL(lang ? `/${lang}/atom.xml` : '/atom.xml', url).toString(),
    },

    author: {
      name: author,
      link: url,
    },
  })

  // Filter posts by language and exclude drafts
  const posts = await getCollection(
    'posts',
    ({ data }: { data: CollectionEntry<'posts'>['data'] }) => {
      const isNotDraft = !data.draft
      const isCorrectLang = data.lang === lang
        || data.lang === ''
        || (lang === undefined && data.lang === defaultLocale)

      return isNotDraft && isCorrectLang
    },
  )

  // Sort posts by published date in descending order and limit to the latest 25
  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.data.published).getTime() - new Date(a.data.published).getTime())
    .slice(0, 25)

  // Add posts to feed
  for (const post of recentPosts) {
    // 使用移除文件扩展名的 id 作为 slug
    const slug = post.id.replace(/\.(md|mdx)$/, '')
    const link = new URL(`posts/${slug}/`, siteURL).toString()

    // Optimize content processing
    const postContent = post.body
      ? sanitizeHtml(
          await fixRelativeImagePaths(
            // Remove HTML comments before rendering markdown
            markdownParser.render(post.body.replace(/<!--[\s\S]*?-->/g, '')),
            url,
          ),
          {
            // Allow <img> tags in feed content
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
          },
        )
      : ''

    // publishDate -> Atom:<published>, RSS:<pubDate>
    const publishDate = new Date(post.data.published)
    // updateDate -> Atom:<updated>, RSS has no update tag
    const updateDate = post.data.updated ? new Date(post.data.updated) : publishDate

    feed.addItem({
      title: post.data.title,
      id: link,
      link,
      description: getPostDescription(post, 'feed'),
      content: postContent,
      author: [{
        name: author,
        link: url,
      }],
      published: publishDate,
      date: updateDate,
    })
  }

  // Add follow verification if available
  if (followConfig?.feedID && followConfig?.userID) {
    feed.addExtension({
      name: 'follow_challenge',
      objects: {
        feedId: followConfig.feedID,
        userId: followConfig.userID,
      },
    })
  }

  return feed
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Generate RSS 2.0 format feed
export async function generateRSS(context: any) {
  const feed = await generateFeed({
    lang: context.params?.lang as string | undefined,
  })

  // Add XSLT stylesheet to RSS feed
  let rssXml = feed.rss2()
  rssXml = rssXml.replace(
    '<?xml version="1.0" encoding="utf-8"?>',
    '<?xml version="1.0" encoding="utf-8"?>\n<?xml-stylesheet href="/feeds/rss-style.xsl" type="text/xsl"?>',
  )

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}

// Generate Atom 1.0 format feed
export async function generateAtom(context: any) {
  const feed = await generateFeed({
    lang: context.params?.lang as string | undefined,
  })

  // Add XSLT stylesheet to Atom feed
  let atomXml = feed.atom1()
  atomXml = atomXml.replace(
    '<?xml version="1.0" encoding="utf-8"?>',
    '<?xml version="1.0" encoding="utf-8"?>\n<?xml-stylesheet href="/feeds/atom-style.xsl" type="text/xsl"?>',
  )

  return new Response(atomXml, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  })
}
