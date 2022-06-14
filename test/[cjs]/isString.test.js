import { expect } from 'vitest';
import { isString } from '../../cjs/isString';

describe('[cjs]isString', () => {
  function myObject() {}
  it('应该为 true', () => {
    expect(isString(new String('abc'))).to.be.ok;
    expect(isString('abc')).to.be.ok;
  });

  it('应该为 false', () => {
    expect(isString(null)).not.ok;
    expect(isString(new myObject())).not.ok;
    expect(isString([1, 2, 3])).to.be.not.ok;
    expect(isString(1)).to.be.not.ok;
    expect(isString(Object(0))).to.be.not.ok;
    expect(isString(Function)).to.be.not.ok;
    expect(isString(myObject)).to.be.not.ok;
    expect(isString(new Date())).to.be.not.ok;
    expect(isString(new Error())).to.be.not.ok;
    expect(isString(/x/)).to.be.not.ok;
  });
});
