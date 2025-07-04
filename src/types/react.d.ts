/// <reference types="react" />

import type { TriggerPosition } from './index'

// 当 React 可用时的准确类型定义
export interface ReactPopoverPropsTyped {
  children: React.ReactNode
  distance?: number
  className?: string
  style?: React.CSSProperties
  container?: HTMLElement
  onShow?: (position: TriggerPosition) => void
  onHide?: () => void
  disabled?: boolean
  portal?: boolean
  zIndex?: number
}

export interface UseTextSelectionOptionsTyped {
  delay?: number
  container?: HTMLElement
}

export interface UseTextSelectionReturnTyped {
  selection: TriggerPosition | null
  isSelecting: boolean
  clearSelection: () => void
  getTriggerPosition: () => TriggerPosition | null
}
