/**
 * 简单的节流函数实现
 * 在指定时间间隔内最多执行一次函数
 *
 * @param func 要节流的函数
 * @param wait 等待时间（毫秒）
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): T {
  let timeoutId: number | null = null
  let lastExecTime = 0

  return ((...args: Parameters<T>) => {
    const currentTime = Date.now()

    // 如果是第一次调用或者距离上次执行超过wait时间，立即执行
    if (currentTime - lastExecTime > wait) {
      lastExecTime = currentTime
      return func(...args)
    }

    // 如果还在等待期内，清除之前的定时器，设置新的定时器
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = window.setTimeout(() => {
      lastExecTime = Date.now()
      func(...args)
      timeoutId = null
    }, wait - (currentTime - lastExecTime))
  }) as T
}
