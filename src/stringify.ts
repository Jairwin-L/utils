import isPlainObject from 'lodash.isplainobject';
import isFunction from 'lodash.isfunction';
import { isArray } from './isArray';

interface IStringifyOptions {
  sep?: string;
  eq?: string;
  encodeURIComponent?: (val: string) => string;
}
function safe(fn: (...args: any) => any) {
  return (...args: any[]) => {
    try {
      // tslib 不支持
      // eslint-disable-next-line prefer-spread
      return fn.apply(null, args);
    } catch (error) {
      return args[0];
    }
  };
}

function stringifyPrimitive(v: string | number | boolean | object): string | number {
  if (typeof v === 'string') return v;
  if (typeof v === 'number' && isFinite(v)) return v;
  if (typeof v === 'boolean') return v ? 'true' : 'false';
  if (typeof v === 'object') return JSON.stringify(v);
  return '';
}
/**
 * 将对象转换成 query string
 *
 * @param {object} obj 需要序列化成 URL query string 的对象。属性值支持数组。
 * @param {string} sep 用于界定键值对的子字符串。默认为 '&'
 * @param {string} eq 用于界定 key 和 value 的子字符串。默认为 '='
 * @param {object} options 自定义编码行为
 * @param {function} options.encodeURIComponent 用于自定义的 encodeURIComponent
 * @returns {string}
 *
 * @example
 *
 * stringify({})
 * // => ''
 *
 * stringify({key: 'value', undef: undefined })
 * // => 'key=value&undef='
 */
export function stringify(obj: object, options: IStringifyOptions = {}): string {
  if (!isPlainObject(obj)) {
    return '';
  }

  const { sep = '&', eq = '=' } = options || {};

  let encode: Function = safe(encodeURIComponent);

  if (options && isFunction(options.encodeURIComponent)) {
    // @ts-ignore TODO:
    encode = safe(options.encodeURIComponent);
  }

  const keys = Object.keys(obj);
  const len = keys.length;
  let fields = '';

  for (let i = 0; i < len; i++) {
    const k = keys[i];
    const v = obj[k];
    let ks = encode(stringifyPrimitive(k));
    ks += eq;

    if (isArray(v)) {
      const vlen = v.length;
      if (vlen === 0) continue;
      for (let j = 0; j < vlen; j++) {
        fields += ks;
        fields += encode(stringifyPrimitive(v[j]));
        if (j < vlen - 1) {
          fields += sep;
        }
      }
    } else {
      fields += ks;
      fields += encode(stringifyPrimitive(v));
    }

    if (i < len - 1) {
      fields += sep;
    }
  }
  return fields;
}
