import type { GetSectionRangeConfig } from '../types'

let startIndex = 0

/**
 * 获取选区内容
 * @returns {content: string, section: Selection}
 */
export function getSelectionRangeContent(): {
  content: string
  section: Selection
} {
  if (document) {
    const section = document?.getSelection()
    if (section) {
      return {
        content: section.toString(),
        section,
      }
    }
    else {
      throw new Error('selection is undefined')
    }
  }
  else {
    throw new Error('document is undefined')
  }
}

/**
 * 获得当前选区范围
 * @returns [startIndex, endIndex]
 */
// eslint-disable-next-line unused-imports/no-unused-vars
export function getSelectionRange(container: Node, config?: GetSectionRangeConfig) {
  // if (config && 'theme' in config) {
  // }
  startIndex = 0
  // 给元素设置直接设置样式

  const selection = document.getSelection() as Selection
  const range = selection.getRangeAt(0)
  const rangeAtFirstTextNode = range.startContainer
  const startOffset = range.startOffset // 开始位置的偏移量
  loopIndex(container, rangeAtFirstTextNode, startOffset)
  const endIndex = startIndex + selection.toString().trim().length
  return [startIndex, endIndex]
}

/**
 * 开始位置, 结束位置的计算
 * @param dom
 * @param startNode
 * @param startOffset
 */
function loopIndex(dom: Node, rangeAtFirstTextNode: Node, startOffset: number) {
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error

  const nodes = [...dom.childNodes] as Node[]
  // eslint-disable-next-line array-callback-return
  nodes.some((node) => {
    if (!node.textContent) {
      // eslint-disable-next-line array-callback-return
      return
    }
    // 节点匹配了
    // 不再遍历
    // eslint-disable-next-line eqeqeq
    if (node == rangeAtFirstTextNode) {
      startIndex += startOffset
      return true
    }

    // eslint-disable-next-line eqeqeq
    if (rangeAtFirstTextNode.parentNode == node) {
      loopIndex(node, rangeAtFirstTextNode, startOffset)
      return true
    }

    startIndex += node.textContent.length
  })
}
