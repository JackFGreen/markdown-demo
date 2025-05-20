import { Fragment, createElement, useEffect, useState } from 'react'
import production from 'react/jsx-runtime'
import rehypeParse from 'rehype-parse'
import rehypeReact from 'rehype-react'
import { unified } from 'unified'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'

import { IconText } from '../rehype-plugins'

function useMarkdown(text) {
  const [content, setContent] = useState(createElement(Fragment))

  useEffect(
    function () {
      ;(async function () {
        const md2html = await unified()
          .use(remarkParse)
          .use(remarkGfm)
          // --- remark plugin start ---
          // --- remark plugin end ---
          .use(remarkRehype, {
            allowDangerousHtml: true,
          })
          .use(rehypeRaw)
          .use(rehypeStringify)
          .process(text)

        const html = md2html.toString()

        const html2react = await unified()
          .use(rehypeParse, { fragment: true })
          // --- rehype plugin start ---
          // --- rehype plugin end ---
          .use(rehypeReact, {
            ...production,
            components: {
              icontext: IconText,
            },
          })
          .process(html)

        const reactComponent = html2react.result
        setContent(reactComponent)
      })()
    },
    [text]
  )

  return content
}

export default useMarkdown
