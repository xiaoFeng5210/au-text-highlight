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
export function getSelectionRange(container: Node, config?: GetSectionRangeConfig) {
  if (config && 'theme' in config) {
    // TODO:
    const { textColor, bgColor } = config.theme ?? { textColor: '#000', bgColor: '#ff0' }
  }
  startIndex = 0
  // 给元素设置直接设置样式

  const selection = document.getSelection() as Selection
  const range = selection.getRangeAt(0)
  const startNode = range.startContainer
  console.log('%c [ startNode ]-45', 'font-size:13px; background:pink; color:#bf2c9f;', startNode)
  const startOffset = range.startOffset
  loopIndex(container, startNode, startOffset)
  const endIndex = startIndex + selection.toString().trim().length

  return [startIndex, endIndex]
}

/**
 * 开始位置的计算
 * @param dom
 * @param startNode
 * @param startOffset
 */
function loopIndex(dom: Node, startNode: Node, startOffset: number) {
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error

  const nodes = [...dom.childNodes] as Node[]
  console.log('%c [ nodes ]-63', 'font-size:13px; background:pink; color:#bf2c9f;', nodes)
  // eslint-disable-next-line array-callback-return
  nodes.some((node) => {
    if (!node.textContent) {
      // eslint-disable-next-line array-callback-return
      return
    }
    // 节点匹配了
    // 不再遍历
    // eslint-disable-next-line eqeqeq
    if (node == startNode) {
      startIndex += startOffset
      return true
    }

    // eslint-disable-next-line eqeqeq
    if (startNode.parentNode == node) {
      loopIndex(node, startNode, startOffset)
      return true
    }

    startIndex += node.textContent.length
  })
}
