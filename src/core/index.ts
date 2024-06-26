/**
 * 构建正则
 * @param keywords
 */
export function createRegexFromKeywords(keywords: string | string[]): RegExp | undefined {
  if (typeof keywords === 'string') {
    return new RegExp(`\\b${keywords}\\b`, 'gi')
  }
  if (Array.isArray(keywords)) {
    // 将所有关键字用 | 分隔，并加入 \b 以确保匹配整个单词，关键字先进行转义
    return new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi')
  }
}

export function matchKeywordsWithPositions(str: string, keywords: string | string[]) {
  const regex = createRegexFromKeywords(keywords)
  const matches = []
  let match: RegExpExecArray | null

  // 使用 exec 遍历所有匹配项
  // eslint-disable-next-line no-cond-assign
  while ((match = (regex as RegExp).exec(str)) !== null) {
    console.log(match, '------match')
    matches.push({
      keyword: match[0],
      start: match.index,
      end: match.index + match[0].length,
    })
  }

  return matches
}
