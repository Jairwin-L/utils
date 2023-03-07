import { stringify } from './stringify';

interface IData {
  [key: string]: any;
}

/**
 * 向URL中追加query
 *
 * @private
 * @param url
 * @param query query字符串，如"a=12"
 */
function appendQueryToUrl(url: string, query: string) {
  if (!url || !query) {
    return url;
  }

  let symbol = url && url.indexOf('?') > -1 ? '&' : '?';
  const len = url.length;
  if (url[len - 1] === '?' || url[len - 1] === '&') {
    symbol = '';
  }

  const result = `${url}${symbol}${query}`;
  return result;
}

/**
 * 向url中添加query
 * 备注: key/value均会进行一次encodeURIComponent
 * @param {string} url
 * @param {object} params kv键值对，如: {chInf: 'abc'};
 *
 * @example
 *
 * import { appendQueriesToUrl } from '@jairwinl/utils/esm/appendQueriesToUrl';
 *
 * appendQueriesToUrl('https://example.com', { a: 'b', c: 'd' })
 *
 * // => 'https://example.com?a=b&c=d'
 */
export function appendQueriesToUrl(url: string, params: IData = {}) {
  if (!url || !params) {
    return url;
  }
  return appendQueryToUrl(url, stringify(params));
}
