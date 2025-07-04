import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { throttle } from 'lodash'
import type { TriggerPosition } from '../types'
import type { ReactPopoverPropsTyped } from '../types/react'
import { useTextSelection } from './useTextSelection'

/**
 * React 版本的文本选区 Popover 组件
 * 支持插槽式内容自定义，复用现有的位置计算逻辑
 */
export const AuSelectionPopover: React.FC<ReactPopoverPropsTyped> = ({
  children,
  distance = 10,
  className = '',
  style = {},
  container,
  onShow,
  onHide,
  disabled = false,
  portal = true,
  zIndex = 9999,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({})

  const { selection, clearSelection, getTriggerPosition } = useTextSelection({
    delay: 100,
    container,
  })

  // 计算 Popover 位置
  const calculatePosition = useCallback((position: TriggerPosition) => {
    if (!popoverRef.current)
      return {}

    const { x, y, width, height } = position
    const popoverRect = popoverRef.current.getBoundingClientRect()

    // 计算基本位置
    const centerX = x + width / 2
    let actualLeft = centerX - popoverRect.width / 2
    let actualTop = y - popoverRect.height - distance

    // 边界检测和调整
    const viewportWidth = window.innerWidth
    const scrollX = window.scrollX
    const scrollY = window.scrollY

    // 水平边界检测
    if (actualLeft < scrollX) {
      actualLeft = scrollX + 8 // 8px 边距
    }
    else if (actualLeft + popoverRect.width > scrollX + viewportWidth) {
      actualLeft = scrollX + viewportWidth - popoverRect.width - 8
    }

    // 垂直边界检测 - 如果上方空间不足，显示在下方
    if (actualTop < scrollY) {
      actualTop = y + height + distance
    }

    // 如果是多行选择，调整水平位置到右侧
    if (height > 30) {
      actualLeft = x + width - popoverRect.width
      // 确保不超出右边界
      if (actualLeft + popoverRect.width > scrollX + viewportWidth) {
        actualLeft = scrollX + viewportWidth - popoverRect.width - 8
      }
    }

    return {
      position: 'fixed' as const,
      left: `${actualLeft}px`,
      top: `${actualTop}px`,
      zIndex,
      opacity: 1,
      visibility: 'visible' as const,
      transform: 'translateY(0)',
      transition: 'opacity 0.2s ease, transform 0.2s ease',
    }
  }, [distance, zIndex])

  // 处理选区变化
  useEffect(() => {
    if (disabled) {
      setIsVisible(false)
      return
    }

    if (selection) {
      const newStyle = calculatePosition(selection)
      setPopoverStyle(newStyle)
      setIsVisible(true)
      onShow?.(selection)
    }
    else {
      setIsVisible(false)
      setPopoverStyle(prev => ({
        ...prev,
        opacity: 0,
        visibility: 'hidden' as const,
        transform: 'translateY(-4px)',
      }))
      onHide?.()
    }
  }, [selection, disabled, calculatePosition, onShow, onHide])

  // 点击外部区域隐藏
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isVisible
        && popoverRef.current
        && !popoverRef.current.contains(event.target as Node)
      ) {
        clearSelection()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isVisible, clearSelection])

  // 响应窗口大小变化
  useEffect(() => {
    if (!isVisible || !selection)
      return

    const handleResize = throttle(() => {
      const selectionInfo = getTriggerPosition()
      if (!selectionInfo)
        return
      const newStyle = calculatePosition(selectionInfo)
      setPopoverStyle(newStyle)
    }, 50)

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleResize)
    }
  }, [isVisible, selection, calculatePosition])

  const popoverElement = (
    <div
      ref={popoverRef}
      className={`au-text-highlight-popover ${className}`}
      style={{
        ...popoverStyle,
        ...style,
        // 默认样式
        position: popoverStyle.position || 'fixed',
        pointerEvents: isVisible ? 'auto' : 'none',
        userSelect: 'none',
        // 确保在最初渲染时不可见
        opacity: popoverStyle.opacity ?? 0,
        visibility: popoverStyle.visibility ?? 'hidden',
      }}
    >
      {children}
    </div>
  )

  // 根据 portal 配置决定渲染方式
  if (portal) {
    return createPortal(popoverElement, document.body)
  }

  return popoverElement
}

export default AuSelectionPopover
