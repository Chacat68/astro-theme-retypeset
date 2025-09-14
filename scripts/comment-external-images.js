#!/usr/bin/env node

// 临时脚本：注释掉所有外部图片链接以修复构建问题
// Temporary script: Comment out all external image links to fix build issues

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const CONTENT_DIR = path.join(__dirname, '../src/content')
const EXTERNAL_DOMAIN = 'blog-1259751088.cos.ap-shanghai.myqcloud.com'

// 匹配外部图片的正则表达式
const EXTERNAL_IMAGE_REGEX = new RegExp(
  `!\\[([^\\]]*)\\]\\(https?://${EXTERNAL_DOMAIN.replace(/\./g, '\\.')}[^\\)]*\\)`,
  'g',
)

// 匹配已注释的外部图片的正则表达式
const COMMENTED_IMAGE_REGEX = new RegExp(
  `<!-- !\\[([^\\]]*)\\]\\(https?://${EXTERNAL_DOMAIN.replace(/\./g, '\\.')}[^\\)]*\\) -->`,
  'g',
)

// 递归查找所有 markdown 文件
function findMarkdownFiles(dir) {
  const files = []
  const items = fs.readdirSync(dir)

  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      files.push(...findMarkdownFiles(fullPath))
    }
    else if (item.endsWith('.md')) {
      files.push(path.relative(CONTENT_DIR, fullPath))
    }
  }

  return files
}

function commentExternalImages() {
  console.log('🔍 搜索需要注释的外部图片链接...')

  // 查找所有 markdown 文件
  const markdownFiles = findMarkdownFiles(CONTENT_DIR)

  let totalFiles = 0
  let totalImages = 0

  markdownFiles.forEach((file) => {
    const filePath = path.join(CONTENT_DIR, file)
    const content = fs.readFileSync(filePath, 'utf8')

    // 检查是否包含外部图片
    const matches = content.match(EXTERNAL_IMAGE_REGEX)
    if (!matches) {
      return
    }

    console.log(`📝 处理文件: ${file}`)
    console.log(`   找到 ${matches.length} 个外部图片`)

    // 注释掉外部图片
    const updatedContent = content.replace(EXTERNAL_IMAGE_REGEX, '<!-- $& -->')

    // 写回文件
    fs.writeFileSync(filePath, updatedContent, 'utf8')

    totalFiles++
    totalImages += matches.length
  })

  console.log(`\n✅ 完成！共处理 ${totalFiles} 个文件，注释了 ${totalImages} 个外部图片`)
}

function restoreExternalImages() {
  console.log('🔍 搜索需要恢复的外部图片链接...')

  // 查找所有 markdown 文件
  const markdownFiles = findMarkdownFiles(CONTENT_DIR)

  let totalFiles = 0
  let totalImages = 0

  markdownFiles.forEach((file) => {
    const filePath = path.join(CONTENT_DIR, file)
    const content = fs.readFileSync(filePath, 'utf8')

    // 检查是否包含已注释的外部图片
    const matches = content.match(COMMENTED_IMAGE_REGEX)
    if (!matches) {
      return
    }

    console.log(`📝 处理文件: ${file}`)
    console.log(`   找到 ${matches.length} 个已注释的外部图片`)

    // 恢复外部图片
    const updatedContent = content.replace(/<!-- (!\[[^\]]*\]\([^)]*\)) -->/g, '$1')

    // 写回文件
    fs.writeFileSync(filePath, updatedContent, 'utf8')

    totalFiles++
    totalImages += matches.length
  })

  console.log(`\n✅ 完成！共处理 ${totalFiles} 个文件，恢复了 ${totalImages} 个外部图片`)
}

// 命令行参数处理
const command = process.argv[2]

if (command === 'restore') {
  restoreExternalImages()
}
else {
  commentExternalImages()
}
