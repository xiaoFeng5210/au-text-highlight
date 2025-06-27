/**
 * 划词选区后，popover组件
 */

interface TriggerPosition {
  text: string
  x: number
  y: number
}

export default class DrawWordConstituencyPopover {
  constructor() {
    this.init()
  }

  init() {
  }
}

class Popover {
  protected popoverEle: HTMLElement | null = null
  protected triggerNode: Node | null = null

  constructor(domId: string, rangeTextNode: Node) {
    this.triggerNode = rangeTextNode
    this.init(domId)
  }

  init(domId: string) {
    const $ele = document.getElementById(domId)
    if (!$ele) {
      throw new Error('domId is not found')
    }
    this.popoverEle = $ele
    this.popoverEle.style.visibility = 'hidden'
    document.body.appendChild(this.popoverEle)
  }

  initEvent() {
    document.addEventListener('mouseup', (evt) => {
      const triggerPosition = this.getTriggerPosition()
      if (triggerPosition) {

      }
    })
  }

  show(position: TriggerPosition) {
    const { x = 0, y = 0 } = position
  }

  getTriggerPosition() {
    const selection = document.getSelection()
    if (selection) {
      const result = document.getSelection()?.toString()
      if (result) {
        // 代表用户是刚结束划词，需要展示popover
        const range = selection.getRangeAt(0)
        const rect = range.getBoundingClientRect()
        if (rect.width === 0 && rect.height === 0)
          return null
        return {
          text: result,
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY,
          width: rect.width,
          height: rect.height,
        }
      }
      else {
        console.error('no selection')
        return null
      }
    }
    else {
      console.error('no selection')
    }
  }
}
