/* eslint-disable @typescript-eslint/no-unused-expressions */
// TODO:
import { expect } from 'vitest';
import { formatDate } from '../src/formatDate';

const timeValue = 1655020800000;

describe('[esm]formatDate', () => {
  it('验证某一时间戳：1655020800000', () => {
    const input = timeValue;
    const actual = formatDate(input, 'YYYY-MM-DD HH:mm:ss');
    const expected = '2022-06-12 16:00:00';
    expect(actual).toEqual(expected);
  });
  it('验证当前系统时间戳', () => {
    const input = new Date().valueOf();
    const actual = formatDate(input, 'YYYY-MM-DD HH:mm:ss');
    expect(actual).to.be.ok;
  });
  it('验证字符串时间戳', () => {
    const input: any = String(new Date().valueOf());
    const actual = formatDate(input);
    expect(actual).toEqual(input);
  });
  it('验证默认时间格式', () => {
    const input = timeValue;
    const actual = formatDate(input);
    const expected = '2022-06-12 16:00:00';
    expect(actual).toEqual(expected);
  });
  it('验证指定时间格式：2022-06-12 16:00:00', () => {
    const input = timeValue;
    const actual = formatDate(input, 'YYYY-MM-DD HH:mm:ss');
    const expected = '2022-06-12 16:00:00';
    expect(actual).toEqual(expected);
  });
  it('验证指定时间格式：2022-06-12 16:00', () => {
    const input = timeValue;
    const actual = formatDate(input, 'YYYY-MM-DD HH:mm');
    const expected = '2022-06-12 16:00';
    expect(actual).toEqual(expected);
  });
  it('验证指定时间格式：2022-06-12', () => {
    const input = timeValue;
    const actual = formatDate(input, 'YYYY-MM-DD');
    const expected = '2022-06-12';
    expect(actual).toEqual(expected);
  });
  it('验证指定时间格式：06-12', () => {
    const input = timeValue;
    const actual = formatDate(input, 'MM-DD');
    const expected = '06-12';
    expect(actual).toEqual(expected);
  });
  it('验证指定时间格式：16:00', () => {
    const input = timeValue;
    const actual = formatDate(input, 'HH:mm');
    const expected = '16:00';
    expect(actual).toEqual(expected);
  });
  it('验证字符串时间戳格式', () => {
    const input: any = String(timeValue);
    const actual = formatDate(input);
    expect(actual).toEqual(input);
  });
  it('验证非时间戳格式', () => {
    const input: any = '2022年6月10日 15:30:00';
    const actual = formatDate(input, 'YYYY-MM-DD HH:mm:ss');
    const expected = '2022年6月10日 15:30:00';
    expect(actual).toEqual(expected);
  });
});
