import { visit } from 'unist-util-visit'
import customNode from '../customNode'

function remarkIconText() {
  return customNode({
    name: 'icontext',
    props: {
      tagName: 'span',
      properties: {
        className: 'icon-text',
      },
    },
    visitor: (tree) => {
      visit(tree, (node) => {
        if (node.type === 'element' && node.name === 'icontext') {
          console.log('>>>node', node)
        }
      })
    },
  })
}

export default remarkIconText
