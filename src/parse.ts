import isString from 'lodash.isstring';
import isFunction from 'lodash.isfunction';
import { isArray } from './isArray';

interface parseOptions {
  decodeURIComponent: Function;
}
/**
 * 解析 URL query string
 *
 * @param {string} qs 需要解析的 URL query string
 * @param {string} sep 用于界定键值对的子字符串。默认为 '&'
 * @param {string} eq 用于界定 key 和 value 的子字符串。默认为 '='
 * @param {object} options 自定义解析行为
 * @param {function} options.decodeURIComponent 自定义解码
 */

export function parse(qs: string, sep = '&', eq = '=', options?: parseOptions): object {
  if (!isString(qs)) {
    return {};
  }
  // 对传入整个url的情况进行过滤，仅取参数部分
  const keys = qs.replace(/^.*\?/, '').split(sep);
  if (keys.length === 0) {
    return {};
  }

  let decode: Function = decodeURIComponent;
  if (options && isFunction(options.decodeURIComponent)) {
    decode = options.decodeURIComponent;
  }

  const kv = {};
  const klen = keys.length;
  for (let i = 0; i < klen; i++) {
    const kvs = keys[i].split(eq);
    const k = decode(kvs[0]);
    const v = decode(kvs[1]);
    if (kv[k] === undefined) {
      kv[k] = v;
    } else if (isArray(kv[k])) {
      kv[k].push(v);
    } else {
      kv[k] = [kv[k], v];
    }
  }
  return kv;
}
