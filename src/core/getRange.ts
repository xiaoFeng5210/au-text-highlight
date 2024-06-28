/**
 * 获得当前选区范围
 */
export function getSelectionRange(container: Node) {
  const selection = document.getSelection() as Selection
  const range = selection.getRangeAt(0)
  const startNode = range.startContainer
  const startOffset = range.startOffset
  // 起始位置的计算
  let startIndex = 0
  const loopIndex = function (dom: Node) {
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    // eslint-disable-next-line array-callback-return
    [...dom.childNodes].some((node) => {
      if (!node.textContent) {
        // eslint-disable-next-line array-callback-return
        return
      }
      // 节点匹配了
      // 不再遍历
      if (node == startNode) {
        startIndex += startOffset
        return true
      }

      if (startNode.parentNode == node) {
        loopIndex(node)
        return true
      }

      startIndex += node.textContent.length
    })
  }

  // container是内容的容器元素
  loopIndex(container)

  // 结束索引
  const endIndex = startIndex + selection.toString().trim().length

  return [startIndex, endIndex]
}
