/**
 * 划词选区后，popover组件
 */

interface TriggerPosition {
  text: string
  x: number
  y: number
  width: number
  height: number
}

class Popover {
  protected popoverEle: HTMLElement | null = null

  constructor(popoverId: string) {
    this.init(popoverId)
    this.initEvent()
  }

  init(popoverId: string) {
    const $ele = document.getElementById(popoverId)
    if (!$ele) {
      throw new Error('popoverId is not found')
    }
    this.popoverEle = $ele
    this.popoverEle.style.visibility = 'hidden'
    this.popoverEle.style.position = 'fixed'
    document.body.appendChild(this.popoverEle)
  }

  initEvent() {
    document.addEventListener('mouseup', () => {
      const triggerPosition = this.getTriggerPosition()
      if (triggerPosition) {
        this.show(triggerPosition)
      }
      else {
        this.hide()
      }
    })
  }

  show(position: TriggerPosition) {
    const { x = 0, y = 0, width = 0 } = position
    if (!this.popoverEle)
      return
    // 计算触发元素的中心点
    const centerX = x + width / 2
    const actualLeft = centerX - this.popoverEle.offsetWidth / 2
    const actualTop = y - 5
    this.popoverEle.style.left = `${actualLeft}px`
    this.popoverEle.style.top = `${actualTop}px`
    this.popoverEle.style.visibility = 'visible'
  }

  hide() {
    if (!this.popoverEle)
      return
    this.popoverEle.style.visibility = 'hidden'
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

/**
 * @param popoverId 用户需要展示弹窗元素的id
 */
export default class DrawWordConstituencyPopover extends Popover {
  constructor(popoverId: string) {
    super(popoverId)
  }

  init() {
  }
}
