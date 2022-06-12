/**
 * @param v {string} 需要判断的值
 * @example
 *
 * isString()
 * // => false
 *
 * isString('a')
 * // => true
 *
 */
export function isString(input: string) {
  return typeof input === 'string';
}
