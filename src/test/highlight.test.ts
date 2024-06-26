import { describe, expect, it } from 'vitest'
import { createRegexFromKeywords, matchKeywordsWithPositions } from '../core'

describe('createRegexFromKeywords', () => {
  it('判断是否为正则', () => {
    const regex = createRegexFromKeywords('hello')
    expect(regex).toBeInstanceOf(RegExp)
  })
  it('测试正则准确性', () => {
    const regex = createRegexFromKeywords('hello')
    expect(regex?.test('hello')).toBe(true)
    expect(regex?.test('world')).toBe(false)
  })
  it('测试大小写', () => {
    const regex = createRegexFromKeywords('Hello')
    expect('hello'.match(regex as RegExp)).toStrictEqual(['hello'])

    const regex2 = createRegexFromKeywords('hello')
    expect('Hello'.match(regex2 as RegExp)).toStrictEqual(['Hello'])

    const regex3 = createRegexFromKeywords('HELLO')
    expect('hello'.match(regex3 as RegExp)).toStrictEqual(['hello'])
  })
})

describe('matchKeywordsWithPositions', () => {
  it('测试匹配', () => {
    const matches = matchKeywordsWithPositions('GPT is amazing', 'gpt')
    expect(matches).toStrictEqual([
      {
        keyword: 'GPT',
        start: 0,
        end: 3,
      },
    ])

    const matches2 = matchKeywordsWithPositions('GPT is amazing', 'is')
    expect(matches2).toStrictEqual([
      {
        keyword: 'is',
        start: 4,
        end: 6,
      },
    ])

    const matches3 = matchKeywordsWithPositions('GPT is amazing', 'amazing')
    expect(matches3).toStrictEqual([
      {
        keyword: 'amazing',
        start: 7,
        end: 14,
      },
    ])
  })

  it('测试中文', () => {
    const matches = matchKeywordsWithPositions('GPT 是一种神奇的技术', '是')
    expect(matches).toStrictEqual([
      {
        keyword: '是',
        start: 4,
        end: 5,
      },
    ])
  })

  it('测试多个匹配', () => {
    const matches = matchKeywordsWithPositions('GPT is amazing, GPT is powerful', 'GPT')
    expect(matches).toStrictEqual([
      {
        keyword: 'GPT',
        start: 0,
        end: 3,
      },
      {
        keyword: 'GPT',
        start: 16,
        end: 19,
      },
    ])
  })

  // 测试中文段落，关键字是一句话
  it('测试中文段落', () => {
    const matches = matchKeywordsWithPositions('GPT 是一种神奇的技术，GPT 是一种强大的技术', 'GPT 是一种神奇的技术')
    expect(matches).toStrictEqual([
      {
        keyword: 'GPT 是一种神奇的技术',
        start: 0,
        end: 12,
      },
    ])
  })
})
