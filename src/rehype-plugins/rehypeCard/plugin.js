import { visit } from 'unist-util-visit'

export default function rehypeCard() {
  return (tree) => {
    visit(tree, (node) => {
      console.log('>>>rehype node', node)
      // 确保 card 作为独立块级元素
      if (node.tagName === 'card') {
        console.log('>>>card', node)

        node.tagName = 'div'
        node.properties = {
          ...node.properties,
          className: 'card-wrapper',
        }
      }

      if (node.tagName === 'component') {
        node.tagName = 'div'
        node.properties = {
          ...node.properties,
        }
      }
    })
  }
}

export function remarkCard() {
  return (tree) => {
    visit(tree, (node) => {
      console.log('>>>remark node', node)

      // if (node.type==='html')

      // 匹配 :::card 语法
      if (
        node.type === 'containerDirective' ||
        (node.type === 'textDirective' && node.name === 'card')
      ) {
        console.log('>>>remarkCard', node)
        // 转换为自定义 AST 结构
        node.data = {
          hName: 'card', // 对应 React 组件名
          hProperties: node.attributes,
        }
        node.children = node.children || []
      }
    })
  }
}
