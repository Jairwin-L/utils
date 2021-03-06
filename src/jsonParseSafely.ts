/**
 * 危险的 JS 内置函数：JSON.parse
 * @param {string} value 需要检查的输入
 * @param {*} parseFailedDefaultValue={} 解析失败默认返回`{}`
 * @returns {*} 解析失败默认返回{}，支持自定义
 *
 * @example
 *
 * import { downloadFileUseJS } from 'jairwin-utils/esm/downloadFileUseJS';
 *
 * jsonParseSafely(window.sessionStorage.getItem(key))
 *
 */
export function jsonParseSafely<T>(
  value: string,
  parseFailedDefaultValue: any = {}
): T {
  try {
    return JSON.parse(value);
  } catch (error) {
    console.log('[jairwin-utils]jsonParseSafely----->：', error);
    return parseFailedDefaultValue;
  }
}
