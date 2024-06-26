import type { DeafultConfig } from './types'
import { matchKeywordsWithPositions } from './core'

/**
 * 核心方法
 * @param config
 */
function textHighlight(config: DeafultConfig) {
  const { text, keywords } = config
  const match = matchKeywordsWithPositions(text, keywords)
  console.log(match)
}

export default textHighlight
