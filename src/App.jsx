import { Fragment } from 'react'
import './App.css'
import useMarkdown from './hooks/useMarkdown'
import { useState } from 'react'
import { useEffect } from 'react'

const data = [
  '- 123\n',
  '| 参数 | 说明 | 类型 | 默认值 |\n  | - | - | - | - |\n  | type | [baidu](https://www.baidu.com) | number | 1 |\n  ',
  '- asd\n  - sdf  \n',

  '- 456  \n',
  '123<icontext icon="https://assets-cdn.genstore.ai/web/ai-component/static/807ffc2f-5817-444a-89c7-a1aa7ce89d26/Genius.jpg" title="icon text link"></icontext> \n  xxx',
  '<icontext icon="https://assets-cdn.genstore.ai/web/ai-component/static/807ffc2f-5817-444a-89c7-a1aa7ce89d26/Genius.jpg" title="icon text link">**bold**</icontext> \n  ',
  '- li\n  - li\n',
].join('')

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function App() {
  const [text, setText] = useState('')
  useEffect(() => {
    async function run() {
      let i = 0
      while (i < data.length) {
        const s = data[i]
        setText((prev) => prev + s)
        i++
        await sleep(10)
      }
    }
    run()
  }, [])

  const content = useMarkdown(text)

  return <div className='markdown-content'>{content}</div>
}

export default App
