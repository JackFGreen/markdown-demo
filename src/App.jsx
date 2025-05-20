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
import './App.css'

import { IconText } from './rehype-plugins'

const mds = [
  '- 123\n',
  '| 参数 | 说明 | 类型 | 默认值 |\n  | - | - | - | - |\n  | type | [baidu](https://www.baidu.com) | number | 1 |\n  ',
  '- asd\n  - sdf  \n',

  '- 456  \n',
  '123<icontext icon="https://assets-cdn.genstore.ai/web/ai-component/static/807ffc2f-5817-444a-89c7-a1aa7ce89d26/Genius.jpg" title="icon text link"></icontext> \n  xxx',
  '<icontext icon="https://assets-cdn.genstore.ai/web/ai-component/static/807ffc2f-5817-444a-89c7-a1aa7ce89d26/Genius.jpg" title="icon text link">**bold**</icontext> \n  ',
  '- li\n  - li\n',
]

const text = mds.join('')

function App() {
  return useProcessor(text)
}

export default App

/**
 * @param {string} text
 * @returns {React.JSX.Element}
 */
function useProcessor(text) {
  const [Content, setContent] = useState(createElement(Fragment))

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

  return <div className='markDownItemContent'>{Content}</div>
}
