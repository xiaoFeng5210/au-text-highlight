import { useCallback, useEffect, useState } from 'react'
import type { TriggerPosition } from '../types'
import type { UseTextSelectionOptionsTyped, UseTextSelectionReturnTyped } from '../types/react'

/**
 * 文本选区检测 Hook
 * 复用现有的选区检测逻辑，提供 React 友好的接口
 */
export function useTextSelection(options: UseTextSelectionOptionsTyped = {}): UseTextSelectionReturnTyped {
  const { delay = 100, container, selectionChange } = options
  const [selection, setSelection] = useState<TriggerPosition | null>(null)
  const [isSelecting, setIsSelecting] = useState(false)

  const getTriggerPosition = useCallback((): TriggerPosition | null => {
    const docSelection = document.getSelection()
    if (!docSelection) {
      return null
    }

    const result = docSelection.toString()
    if (!result) {
      return null
    }

    // 如果指定了容器，检查选区是否在容器内
    if (container) {
      try {
        const range = docSelection.getRangeAt(0)
        if (!container.contains(range.startContainer) || !container.contains(range.endContainer)) {
          return null
        }
      }
      catch (error) {
        return null
      }
    }

    try {
      const range = docSelection.getRangeAt(0)
      const rect = range.getBoundingClientRect()

      // 检查是否是有效的选区
      if (rect.width === 0 && rect.height === 0) {
        return null
      }

      return {
        text: result,
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      }
    }
    catch (error) {
      console.error('获取选区位置失败:', error)
      return null
    }
  }, [container])

  const clearSelection = useCallback(() => {
    setSelection(null)
    setIsSelecting(false)
    selectionChange?.(null)
  }, [selectionChange])

  const handleMouseDown = useCallback(() => {
    setIsSelecting(true)
    setSelection(null)
    selectionChange?.(null)
  }, [selectionChange])

  const handleMouseUp = useCallback(() => {
    setTimeout(() => {
      const triggerPosition = getTriggerPosition()
      if (triggerPosition) {
        setSelection(triggerPosition)
        selectionChange?.(triggerPosition)
      }
      else {
        setSelection(null)
        selectionChange?.(null)
      }
      setIsSelecting(false)
    }, delay)
  }, [getTriggerPosition, delay, selectionChange])

  const handleSelectionChange = useCallback(() => {
    if (!isSelecting) {
      const triggerPosition = getTriggerPosition()
      if (!triggerPosition) {
        setSelection(null)
        selectionChange?.(null)
      }
    }
  }, [getTriggerPosition, isSelecting, selectionChange])

  useEffect(() => {
    const targetElement = container || document

    targetElement.addEventListener('mousedown', handleMouseDown)
    targetElement.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('selectionchange', handleSelectionChange)

    return () => {
      targetElement.removeEventListener('mousedown', handleMouseDown)
      targetElement.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('selectionchange', handleSelectionChange)
    }
  }, [container, handleMouseDown, handleMouseUp, handleSelectionChange])

  return {
    selection,
    isSelecting,
    clearSelection,
    getTriggerPosition,
  }
}
