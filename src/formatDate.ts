import dayjs from 'dayjs';
// 获取当前系统时间戳
const timestamp = String(new Date().valueOf());

// 是否有效日期
function isValidDate(date: string): boolean {
  return dayjs(date).isValid();
}
/**
 * @param {string | number} date=timestamp 日期
 * @param {string} [format=YYYY-MM-DD HH:mm:ss]  时间格式
 *
 * @example
 *
 * import { formatDate } from 'jairwin-utils/esm/formatDate';
 *
 * formatDate(new Date().valueOf());
 *
 */

export function formatDate(date: string = timestamp, format = 'YYYY-MM-DD HH:mm:ss'): string {
  // 非法日期格式，直接输出
  if (!isValidDate(date)) {
    return date;
  }
  return dayjs(Number(date)).format(format);
}
