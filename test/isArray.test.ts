/* eslint-disable @typescript-eslint/no-unused-expressions */
// TODO:
import { expect } from 'vitest';
import { isArray } from '../src/isArray';

describe('[esm]isArray', () => {
  const arr1 = [];
  const arr2 = new Array(2);

  it('验证数组', () => {
    expect(isArray(arr1)).to.be.true;
    expect(isArray(arr2)).to.be.true;
  });
  it('验证对象', () => {
    expect(isArray({})).to.be.false;
    expect(isArray({ a: 'a', b: 'b' })).to.be.false;
  });

  it('Array.isArray不存在', () => {
    const nativeIsArray = Array.isArray;
    // @ts-ignore
    Array.isArray = null;
    const result1 = isArray([]);
    const result2 = isArray({});
    Array.isArray = nativeIsArray;
    expect(result1).to.be.true;
    expect(result2).to.be.false;
  });
});
