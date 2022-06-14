import dayjs from 'dayjs';
// 获取当前系统时间戳
const timestamp = new Date().valueOf();

// 是否有效日期
function isValidDate(date: number): boolean {
  return dayjs(date).isValid();
}
/**
 * 时间戳格式化输出
 * @param {string} timeStamp=timestamp 日期
 * @param {string} [format=YYYY-MM-DD HH:mm:ss] 时间格式
 * @return {string} 指定时间格式
 *
 * @example
 *
 * import { formatDate } from 'jairwin-utils/esm/formatDate';
 *
 * formatDate(new Date().valueOf());
 *
 */

export function formatDate(timeStamp: number = timestamp, format = 'YYYY-MM-DD HH:mm:ss'): string {
  // 非时间戳格式，直接输出
  if (!isValidDate(timeStamp)) {
    console.log(`非时间戳格式，直接输出----->：`, timeStamp);
    return String(timeStamp);
  }
  return dayjs(timeStamp).format(format);
}
