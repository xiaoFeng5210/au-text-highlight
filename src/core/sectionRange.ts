export default (container: Node, position: number[]) => {
  // Selection 对象表示用户选择的文本范围或插入符号的当前位置。它代表页面中的文本选区，可能横跨多个元素。通常由用户拖拽鼠标经过文字而产生
  const selection = document?.getSelection()
  if (!selection) {
    throw new Error('No selection found')
  }
  const range = document.createRange()
  if (!range) {
    throw new Error('No range found')
  }

  range.setStart((container as any).firstChild, position[0])
  range.setEnd((container as any).firstChild, position[1])
  selection.removeAllRanges()
  selection.addRange(range)
}
