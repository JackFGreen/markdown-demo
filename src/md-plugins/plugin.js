import { remarkCard } from './card'
import { remarkIcontext } from './icontext'

export function remarkPlugins() {
  return (tree) => {
    remarkCard()(tree)
    remarkIcontext()(tree)
  }
}
