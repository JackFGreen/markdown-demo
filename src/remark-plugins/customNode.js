import { visit } from 'unist-util-visit'

function initNode({ name, tagName = 'div', children = [], properties = { className: '' } }) {
  return {
    type: 'element',
    name,
    tagName,
    children,
    properties,
  }
}

export default function customNode({ name = '', props = {}, visitor = () => {} }) {
  const startName = `@${name}`
  const endName = `@end${name}`

  return (tree) => {
    /**
     * 处理 @icontext 和 @endicontext
     */
    visit(tree, (node, index, parent) => {
      // @icontext 不在 text 的开头
      if (node.type === 'text' && node.value.includes(startName)) {
        if (!node.value.startsWith(startName)) {
          const s = node.value.indexOf(startName)
          const rest = node.value.slice(s)

          //  当前 text 去除 @icontext
          node.value = node.value.slice(0, s)

          const textNode = {
            type: 'text',
            value: rest,
          }
          //  将 @icontext 插入到下一个
          parent.children.splice(index + 1, 0, textNode)
        }
      }

      // @endicontext 不在 text 的最后
      if (node.type === 'text' && node.value.includes(endName)) {
        if (!node.value.endsWith(endName)) {
          const s = node.value.indexOf(endName)
          const l = endName.length
          const rest = node.value.slice(s + l)

          //  当前 text 去除 @endicontext 后的 text
          node.value = node.value.slice(0, s + l)

          const textNode = {
            type: 'text',
            value: rest,
          }
          // 将 @endicontext 后的 text 插入到下一个
          parent.children.splice(index + 1, 0, textNode)
        }
      }
    })

    /**
     * 合并 @icontext 和 @endicontext
     */
    visit(tree, (node, index, parent) => {
      if (node.type === 'text' && node.value.startsWith(startName)) {
        const customNode = initNode({
          name,
          children: [node],
          ...props,
        })

        // 将当前节点替换为 customNode
        parent.children.splice(index, 1, customNode)

        // 将后续内容移动到卡片节点中，直到遇到 @endcard
        let i = index + 1
        while (i < parent.children.length) {
          const child = parent.children[i]
          customNode.children.push(child)

          if (child.type === 'text' && child.value.endsWith(endName)) {
            parent.children.splice(i, 1) // 移除 @endcard
            break
          } else {
            parent.children.splice(i, 1)
          }
        }
      }
    })

    visitor(tree)
  }
}
