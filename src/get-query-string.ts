import qs from 'query-string';

/**
 * 获取url链接参数
 * @param {string} key 链接参数
 * @return {string} 链接参数
 *
 * @example
 *
 * import { getQueryString } from '@jairwinl/utils/esm/getQueryString';
 *
 * export type IQueryStringKey = 'id'
 *
 * getQueryString<IQueryStringKey>('id') as string; // 详情ID
 *
 */
function getQueryString<T extends string>(key: T) {
  const query = qs.parse(location?.search?.replace('?', ''));
  return query[key];
}

export default getQueryString;
