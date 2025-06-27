import type { DeafultConfig } from '../types'

/**
 * 构建正则
 * @param keywords
 */
export function createRegexFromKeywords(keywords: string | string[]): RegExp | undefined {
  const escapeRegExp = (str: string) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& 表示整个匹配的字符串
  }
  if (typeof keywords === 'string') {
    return new RegExp(`${escapeRegExp(keywords)}`, 'gi')
  }
  if (Array.isArray(keywords)) {
    const escapedKeywords = keywords.map(escapeRegExp)
    // 将所有关键字用 | 分隔，并加入 \b 以确保匹配整个单词，关键字先进行转义
    return new RegExp(`(${escapedKeywords.join('|')})`, 'gi')
  }
}

/**
 * 匹配关键词并返回位置
 * @param str
 * @param keywords
 */
export function matchKeywordsWithPositions(str: string, keywords: string | string[]) {
  const regex = createRegexFromKeywords(keywords)
  const matches = []
  let match: RegExpExecArray | null

  // 使用 exec 遍历所有匹配项
  /**
   * {
  0: "apple",          // 完整匹配的文本
  index: 7,            // 匹配开始的字符索引
  input: "I like apple", // 原始输入字符串
  groups: undefined,    // 命名捕获组（本例未使用）
  length: 1            // 捕获组数量
}
   */
  // eslint-disable-next-line no-cond-assign
  while ((match = (regex as RegExp).exec(str)) !== null) {
    matches.push({
      keyword: match[0],
      start: match.index,
      end: match.index + match[0].length,
    })
  }

  return matches
}

/**
 * 核心方法
 * @param config
 */
export function auExtractHighlightText(config: DeafultConfig) {
  const { text, keywords } = config
  return matchKeywordsWithPositions(text, keywords)
}
