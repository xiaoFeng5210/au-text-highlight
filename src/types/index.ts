export interface DeafultConfig {
  text: string
  keywords: string | string[]
  enableLazyMatch?: boolean // 模糊匹配
}

export type OffsetAndSetRange = [ChildNode, number, ChildNode, number]
export interface GetSectionRangeConfig {
  theme: {
    textColor: string
    bgColor: string
  }
}

// React 相关类型定义
export interface TriggerPosition {
  text: string
  x: number
  y: number
  width: number
  height: number
}

export interface UseTextSelectionOptions {
  delay?: number // 延迟检测时间，默认 100ms
  container?: HTMLElement // 限定检测范围的容器
}

export interface UseTextSelectionReturn {
  selection: TriggerPosition | null
  isSelecting: boolean
  clearSelection: () => void
}

// React 相关类型定义
export interface ReactPopoverProps {
  children: any // React.ReactNode - 避免在类型文件中直接引用 React
  distance?: number // 距离选区的距离，默认 5px
  className?: string // 自定义样式类
  style?: any // React.CSSProperties - 避免在类型文件中直接引用 React
  container?: HTMLElement // 限定检测范围的容器
  onShow?: (position: TriggerPosition) => void // 显示回调
  onHide?: () => void // 隐藏回调
  disabled?: boolean // 是否禁用
  portal?: boolean // 是否使用 Portal 渲染，默认 true
  zIndex?: number // z-index 值，默认 9999
}
