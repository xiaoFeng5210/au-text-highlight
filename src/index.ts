import type { DeafultConfig } from './types'
import { matchKeywordsWithPositions } from './core'
import sectionRange from './core/sectionRange'

/**
 * 核心方法
 * @param config
 */
function textHighlight(config: DeafultConfig) {
  const { text, keywords } = config
  return matchKeywordsWithPositions(text, keywords)
}

export {
  textHighlight,
  sectionRange,
}
