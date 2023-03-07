import { detectType } from './detectType';

/**
 * 数组转换为对象
 * @param {array} arr 待转换数组
 * @param {string} key 转换依据,数组对象元素的key
 * @return {object} res 转换后的对象
 * @description 数组元素均为对象，转换后对象的key值为数组对象元素的某key对应value
 */
export function arrayToObject(array: any, key: any) {
  if (!array || !key) {
    throw Error('缺失必要参数');
  }
  if (!detectType(array, 'array')) {
    throw TypeError('入参类型错误，待转换类型必须为array');
  }
  const res = {};
  array.forEach((item: any) => {
    if (item && item[key]) {
      // 转换后对象的属性key值
      const keyValue = item[key];
      // 转换后对象的属性key对应value,即obj
      const obj = {};
      Object.keys(item).forEach((k) => {
        if (k !== key) {
          obj[k] = item[k];
        }
      });
      res[keyValue] = obj;
    }
  });
  return res;
}
