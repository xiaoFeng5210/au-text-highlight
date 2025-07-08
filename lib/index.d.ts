/// <reference types="react" />
import React$1 from 'react';

declare const _default: (container: Node, positions: {
    start: number;
    end: number;
    gid?: string;
}[]) => void;

interface DeafultConfig {
    text: string;
    keywords: string | string[];
    enableLazyMatch?: boolean;
}
type OffsetAndSetRange = [ChildNode, number, ChildNode, number];
interface GetSectionRangeConfig {
    theme: {
        textColor: string;
        bgColor: string;
    };
}
interface TriggerPosition$1 {
    text: string;
    x: number;
    y: number;
    width: number;
    height: number;
}
interface UseTextSelectionOptions {
    delay?: number;
    container?: HTMLElement;
}
interface UseTextSelectionReturn {
    selection: TriggerPosition$1 | null;
    isSelecting: boolean;
    clearSelection: () => void;
}
interface ReactPopoverProps {
    children: any;
    distance?: number;
    className?: string;
    style?: any;
    container?: HTMLElement;
    onShow?: (position: TriggerPosition$1) => void;
    onHide?: () => void;
    disabled?: boolean;
    portal?: boolean;
    zIndex?: number;
}
interface ChildComponentRef {
    open: () => void;
    close: () => void;
}

/**
 * 获取选区内容
 * @returns {content: string, section: Selection}
 */
declare function getSelectionRangeContent(): {
    content: string;
    section: Selection;
};
/**
 * 获得当前选区范围
 * @returns [startIndex, endIndex]
 */
declare function getSelectionRange(container: Node, config?: GetSectionRangeConfig): number[];

/**
 * 核心方法
 * @param config
 */
declare function auExtractHighlightText(config: DeafultConfig): {
    keyword: string;
    start: number;
    end: number;
}[];

/**
 * 划词选区后，popover组件
 */
interface TriggerPosition {
    text: string;
    x: number;
    y: number;
    width: number;
    height: number;
}
interface PopoverConfig {
    distance?: number;
}
declare class Popover {
    protected popoverEle: HTMLElement | null;
    protected distance: number;
    constructor(popoverId: string, config?: PopoverConfig);
    init(popoverId: string): void;
    initEvent(): void;
    show(position: TriggerPosition): void;
    hide(): void;
    getTriggerPosition(): {
        text: string;
        x: number;
        y: number;
        width: number;
        height: number;
    } | null | undefined;
}
/**
 * @param popoverId 用户需要展示弹窗元素的id
 */
declare class DrawWordConstituencyPopover extends Popover {
    constructor(popoverId: string, config?: PopoverConfig);
}

// 当 React 可用时的准确类型定义
interface ReactPopoverPropsTyped {
  children: React.ReactNode
  distance?: number
  className?: string
  style?: React.CSSProperties
  container?: HTMLElement
  onShow?: (position: TriggerPosition$1) => void
  onHide?: () => void
  disabled?: boolean
  portal?: boolean
  zIndex?: number
}

interface UseTextSelectionOptionsTyped {
  delay?: number
  container?: HTMLElement
  selectionChange?: (position: TriggerPosition$1 | null) => void
}

interface UseTextSelectionReturnTyped {
  selection: TriggerPosition$1 | null
  isSelecting: boolean
  clearSelection: () => void
  getTriggerPosition: () => TriggerPosition$1 | null
}

/**
 * React 版本的文本选区 Popover 组件
 * 支持插槽式内容自定义，复用现有的位置计算逻辑
 */
declare const AuSelectionPopover: React$1.FC<ReactPopoverPropsTyped>;

/**
 * 文本选区检测 Hook
 * 复用现有的选区检测逻辑，提供 React 友好的接口
 */
declare function useTextSelection(options?: UseTextSelectionOptionsTyped): UseTextSelectionReturnTyped;

export { DrawWordConstituencyPopover, AuSelectionPopover as ReactAuSelectionPopover, auExtractHighlightText as auExtractText, getSelectionRange, getSelectionRangeContent, _default as sectionRangeHighlight, useTextSelection };
export type { DeafultConfig, GetSectionRangeConfig, OffsetAndSetRange, ChildComponentRef as PopoverComponentRef, ReactPopoverProps, TriggerPosition$1 as TriggerPosition, UseTextSelectionOptions, UseTextSelectionReturn };
