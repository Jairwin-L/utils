import dayjs from 'dayjs';
// 获取当前系统时间戳
const timestamp = new Date().valueOf();

/**
 * 时间戳格式化输出
 * @param {string} timeStamp=timestamp 日期
 * @param {string} [format=YYYY-MM-DD HH:mm:ss] 时间格式
 * @return {string} 时间格式输出
 *
 * @example
 *
 * import { formatDate } from '@jairwinl/utils/esm/formatDate';
 *
 * formatDate();
 *
 */

function formatDate(timeStamp: number = timestamp, format = 'YYYY-MM-DD HH:mm:ss'): string {
  // 非number类型时间戳格式，直接输出
  if (typeof timeStamp !== 'number') {
    // eg：node：1655-02-08 00:00:00；Browserify：1659-07-22 23:24:07
    console.warn('[@jairwinl/utils]非number类型时间戳格式，直接输出----->：', timeStamp);
    return String(timeStamp);
  }
  return dayjs(timeStamp).format(format);
}

export default formatDate;
