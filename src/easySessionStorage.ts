import { jsonParseSafely } from './jsonParseSafely';

/**
 * 通用 easySessionStorage
 *
 * @example
 *
 * import { easySessionStorage } from '@jairwinl/utils/esm/easySessionStorage';
 *
 * // 写入
 * easySessionStorage.setItem('key', { a: 'a' });
 *
 * // 读取
 * easySessionStorage.getItem('key') || {};
 *
 * // 删除指定key
 * easySessionStorage.removeItem('key');
 *
 * // 全部清除
 * easySessionStorage.clear();
 */

export const easySessionStorage = {
  /**
   * setItem
   *
   * @param {string} key key值
   * @param {*} value 写入数据
   */
  setItem(key: string, value: any): void {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  },
  /**
   * getItem
   *
   * @param {key} key值 读取数据
   */
  getItem<T>(key: string): T {
    // @ts-ignore TODO:
    return jsonParseSafely(window.sessionStorage.getItem(key));
  },
  /**
   * removeItem
   *
   * @param {key} key值 删除数据
   */
  removeItem(key: string): void {
    window.sessionStorage.removeItem(key);
  },
  /**
   * clear 删除数据
   */
  clear(): void {
    window.sessionStorage.clear();
  },
};
