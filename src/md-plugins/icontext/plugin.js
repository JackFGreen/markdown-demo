import { visit } from 'unist-util-visit'

export function remarkIcontext() {
  return (tree) => {
    visit(tree, (node) => {
      // 匹配 :::name 语法
      if (node.type === 'containerDirective' || node.type === 'textDirective') {
        if (node.name === 'icontext') {
          // 转换为 hast 结构
          node.data = {
            hName: 'icontext', // html 映射 react 组件名
            hProperties: node.attributes,
          }
          node.children = node.children || []
        }
      }
    })
  }
}
