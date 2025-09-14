/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

// SVG 模块类型声明
declare module '*.svg' {
  const content: any
  export default content
}

// 图片模块类型声明
declare module '*.png' {
  const content: string
  export default content
}

declare module '*.jpg' {
  const content: string
  export default content
}

declare module '*.jpeg' {
  const content: string
  export default content
}

declare module '*.webp' {
  const content: string
  export default content
}
