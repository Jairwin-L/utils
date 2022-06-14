import { expect } from 'vitest';
import { formatDate } from '../../esm/formatDate';

const timestamp = 1655020800000;

describe('[esm]formatDate', () => {
  it('验证某一时间戳：1655112036395', () => {
    const input = timestamp;
    const actual = formatDate(input, 'YYYY-MM-DD HH:mm:ss');
    const expected = '2022-06-12 16:00:00';
    expect(actual).toEqual(expected);
  });
  it('验证默认时间戳', () => {
    const input = new Date().valueOf();
    const actual = formatDate(input, 'YYYY-MM-DD HH:mm:ss');
    expect(actual).to.be.ok;
  });
  it('验证字符串时间戳', () => {
    const input = String(new Date().valueOf());
    const actual = formatDate(input, 'YYYY-MM-DD HH:mm:ss');
    expect(actual).to.be.ok;
  });
  it('验证默认时间格式', () => {
    const input = timestamp;
    const actual = formatDate(input);
    const expected = '2022-06-12 16:00:00';
    expect(actual).toEqual(expected);
  });
  it('验证指定时间格式：2022-06-12', () => {
    const input = timestamp;
    const actual = formatDate(input, 'YYYY-MM-DD');
    const expected = '2022-06-12';
    expect(actual).toEqual(expected);
  });
  it('验证指定时间格式：06-12', () => {
    const input = timestamp;
    const actual = formatDate(input, 'MM-DD');
    const expected = '06-12';
    expect(actual).toEqual(expected);
  });
  it('验证指定时间格式：16:00', () => {
    const input = timestamp;
    const actual = formatDate(input, 'HH:mm');
    const expected = '16:00';
    expect(actual).toEqual(expected);
  });
  it('验证无效格式时间', () => {
    const input = '2022年6月10日 15:30:00';
    const actual = formatDate(input, 'YYYY-MM-DD HH:mm:ss');
    const expected = '2022年6月10日 15:30:00';
    expect(actual).toEqual(expected);
  });
});
