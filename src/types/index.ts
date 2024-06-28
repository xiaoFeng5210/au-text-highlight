export interface DeafultConfig {
  text: string
  keywords: string | string[]
  enableLazyMatch?: boolean // 模糊匹配
}

export type OffsetAndSetRange = [ChildNode, number, ChildNode, number]
