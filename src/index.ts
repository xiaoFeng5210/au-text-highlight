import type { DeafultConfig } from './types'

/**
 * 核心方法
 * @param config
 */
function textHighlight(config: DeafultConfig) {
  const { text, keywords } = config

  if (typeof keywords === 'string') {
    // 这里我希望大小写也兼容
    const keywordsReg = `\\b${keywords}\\b`
    const reg = new RegExp(keywordsReg, 'gi')
    if (text.match(reg)) {
      const result = text.replace(reg, `<span style="color: red;">${keywords}</span>`)
      console.log(result)
    }
    else {
      throw new Error('未匹配到关键字, 请检查内容')
    }
  }

  if (Array.isArray(keywords)) {
  }
}

export default textHighlight
