import { describe, expect, it } from 'vitest'
import { createRegexFromKeywords } from '../core'

describe('测试createRegexFromKeywords', () => {
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
