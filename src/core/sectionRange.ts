import type { OffsetAndSetRange } from '../types'

export default (container: Node, positions: { start: number, end: number, gid?: string }[]) => {
  // Selection 对象表示用户选择的文本范围或插入符号的当前位置。它代表页面中的文本选区，可能横跨多个元素。通常由用户拖拽鼠标经过文字而产生
  const selection = document?.getSelection()
  if (!selection) {
    throw new Error('No selection found')
  }

  selection.removeAllRanges()
  positions.forEach(({ start, end, gid = '' }) => {
    const [startNode, startOffset, endNode, endOffset] = getNodeAndOffset(container, start, end) as OffsetAndSetRange
    const range = document.createRange()
    range.setStart(startNode, startOffset)
    range.setEnd(endNode, endOffset)
    selection.addRange(range)
    const eleWrap = document.createElement('span')
    eleWrap.setAttribute('role', 'text')
    eleWrap.setAttribute('aria-label', '高亮内容')
    eleWrap.className = 'word_comment_mark'

    if (gid) {
      eleWrap.setAttribute('id', gid)
    }
    try {
      range.surroundContents(eleWrap)
    }
    catch {
      console.error('存在不可高亮的元素，多半由于选区交叉导致')
    }
  })
}

/**
 * 通过dom，开始节点和结束节点，来完成高亮功能
 * @param dom
 * @param start
 * @param end
 */
function getNodeAndOffset(dom: Node, start = 0, end = 0): OffsetAndSetRange | null {
  const arrTextList: ChildNode[] = []

  // 把只要是文本节点的，都放到arrTextList中
  const map = function (child: NodeListOf<ChildNode>) {
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    [...child].forEach((el) => {
      if (el.nodeName === '#text') {
        arrTextList.push(el)
      }
      else if (el.textContent) {
        map(el.childNodes)
      }
    })
  }
  map(dom.childNodes)

  let startNode: ChildNode | null = null
  let startIndex = 0
  let endNode: ChildNode | null = null
  let endIndex = 0
  // 总的字符长度
  let total = startIndex

  // 计算长度
  arrTextList.forEach((node) => {
    if (startNode && endNode) {
      return
    }
    const length = node.textContent!.length
    // 当前节点，总的长度范围
    const range = [total, total + length]
    // 看看，start和end有没有在其中
    // start在这个范围中
    // 可以确定startIndex了
    if (!startNode && start >= range[0] && start < range[1]) {
      startNode = node
      startIndex = start - range[0]
    }
    // '我要' (0, 2)
    if (!endNode && end > range[0] && end <= range[1]) {
      endNode = node
      endIndex = end - range[0]
    }
    total = total + length
  })

  if (!startNode || !endNode) {
    return null
  }

  return [startNode, startIndex, endNode, endIndex]
}
