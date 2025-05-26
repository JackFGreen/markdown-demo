import { Fragment } from 'react'
import './App.css'
import useMarkdown from './hooks/useMarkdown'
import { useState } from 'react'
import { useEffect } from 'react'

const data = [
  `
- level 1

  | 参数 | 说明 | 类型 | 默认值 |
  | - | - | - | - |
  | type | [baidu](https://www.baidu.com) | number | 1 |

  - level 2
  - level 2
  `,

  `
- level 1
  
  :::icontext{title="123" icon="https://assets-cdn.genstore.ai/web/ai-component/static/807ffc2f-5817-444a-89c7-a1aa7ce89d26/Genius.jpg"}
  :::

  - li
  - render from ${'`<'}img${'/>`'} <img width="50" src="https://assets-cdn.genstore.ai/web/ai-component/static/807ffc2f-5817-444a-89c7-a1aa7ce89d26/Genius.jpg" />`,

  `
- level 1
  ::::card{title="123" icon="https://assets-cdn.genstore.ai/web/ai-component/static/807ffc2f-5817-444a-89c7-a1aa7ce89d26/Genius.jpg"}

  :::icontext{title="123" icon="https://assets-cdn.genstore.ai/web/ai-component/static/807ffc2f-5817-444a-89c7-a1aa7ce89d26/Genius.jpg"}
  :::

  - li
  - li

  ::::\n`,
].join('')

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function App() {
  const [text, setText] = useState('')
  useEffect(() => {
    setText(data)
    return

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
