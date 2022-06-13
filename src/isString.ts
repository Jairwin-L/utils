/**
 * @param {*} input 需要检查的输入
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
 export function isString(input: any) {
  return typeof input === 'string' || input instanceof String;
}
