import { Fragment, createElement, useEffect, useState } from 'react'
import production from 'react/jsx-runtime'
import rehypeReact from 'rehype-react'
import { unified } from 'unified'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkDirective from 'remark-directive'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'

import { remarkPlugins, Card, IconText } from '../md-plugins'

function useMarkdown(text) {
  const [content, setContent] = useState(createElement(Fragment))

  useEffect(
    function () {
      ;(async function () {
        const md2react = await unified()
          .use(remarkParse)
          .use(remarkDirective)
          .use(remarkGfm)
          .use(remarkPlugins)
          .use(remarkRehype, { allowDangerousHtml: true })
          .use(rehypeRaw)
          .use(rehypeReact, {
            ...production,
            components: {
              icontext: IconText,
              card: Card,
            },
          })
          .process(text)

        const reactComponent = md2react.result
        setContent(reactComponent)
      })()
    },
    [text]
  )

  return content
}

export default useMarkdown
