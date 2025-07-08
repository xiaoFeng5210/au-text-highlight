import sectionRangeHighlight from './core/sectionRange'
import { getSelectionRange, getSelectionRangeContent } from './core/getRange'
import { auExtractHighlightText as auExtractText } from './core'
import DrawWordConstituencyPopover from './core/drawWordConstituencyPopover'

export {
  auExtractText,
  sectionRangeHighlight,
  getSelectionRange,
  getSelectionRangeContent,
  DrawWordConstituencyPopover,
}

// React 组件导出 - 使用延迟导入
export { default as ReactAuSelectionPopover } from './core/ReactPopover'
export { useTextSelection } from './core/useTextSelection'

// 导出类型定义
export type {
  DeafultConfig,
  GetSectionRangeConfig,
  OffsetAndSetRange,
  TriggerPosition,
  UseTextSelectionOptions,
  UseTextSelectionReturn,
  ReactPopoverProps,
  ChildComponentRef as PopoverComponentRef,
} from './types'
