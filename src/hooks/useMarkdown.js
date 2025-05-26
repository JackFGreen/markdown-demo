import { Fragment, createElement, useEffect, useState } from 'react'
import production from 'react/jsx-runtime'
import rehypeParse from 'rehype-parse'
import rehypeReact from 'rehype-react'
import { unified } from 'unified'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkDirective from 'remark-directive'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'

import { remarkPlugins, Card, IconText } from '../md-plugins'

function useMarkdown(text) {
  const [content, setContent] = useState(createElement(Fragment))

  useEffect(
    function () {
      ;(async function () {
        // const md2html = await unified()
        //   .use(remarkParse)
        //   // .use(remarkDirective) // 启用指令语法支持
        //   .use(remarkGfm)
        //   // --- remark plugin start ---
        //   .use(remarkCard)
        //   // --- remark plugin end ---
        //   .use(remarkRehype, {
        //     allowDangerousHtml: true,
        //   })
        //   .use(rehypeRaw)
        //   .use(rehypeStringify)
        //   .process(text)

        // const html = md2html.toString()

        // const html2react = await unified()
        //   .use(rehypeParse, { fragment: true })
        //   // --- rehype plugin start ---
        //   .use(rehypeCard)
        //   // --- rehype plugin end ---
        //   .use(rehypeReact, {
        //     ...production,
        //     components: {
        //       icontext: IconText,
        //       'card': Card
        //     },
        //   })
        //   .process(html)

        const html2react = await unified()
          .use(remarkParse)
          .use(remarkDirective) // 启用指令语法支持
          .use(remarkGfm)
          // .use(remarkCard) // 自定义卡片语法处理
          .use(remarkPlugins)
          .use(remarkRehype, { allowDangerousHtml: true })
          // .use(rehypeRaw)
          // .use(rehypeStringify)

          // .use(rehypeParse, { fragment: true })
          // .use(rehypeCard) // 调整 HTML 结构
          .use(rehypeReact, {
            ...production,
            components: {
              icontext: IconText,
              card: Card,
            },
          })
          .process(text)

        const reactComponent = html2react.result
        setContent(reactComponent)
      })()
    },
    [text]
  )

  return content
}

export default useMarkdown
