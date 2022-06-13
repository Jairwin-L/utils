/**
 * @param {string} input 需要判断的值
 *
 * @example
 *
 * import { isString } from 'jairwin-utils/esm/isString';
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
