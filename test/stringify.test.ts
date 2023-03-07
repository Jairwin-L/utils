import { expect } from 'vitest';
import { stringify } from '../src/stringify';

describe('[esm]stringify', () => {
  it('空对象', () => {
    expect(stringify({})).to.equal('');
  });
  it('单层简单对象', () => {
    expect(stringify({ key: 'value' })).to.equal('key=value');
  });
  it('单层简单对象-多key', () => {
    expect(stringify({ key1: 'value1', key2: 'value2' })).to.equal('key1=value1&key2=value2');
  });
  it('单层简单对象-urlencode', () => {
    expect(stringify({ 'x=y': 'a=b' })).to.equal('x%3Dy=a%3Db');
  });
  it('多层对象', () => {
    expect(stringify({ key: { name: 'arvin' } })).to.equal('key=%7B%22name%22%3A%22arvin%22%7D');
  });
  it('验证数组', () => {
    expect(stringify({ a: [1, 2], b: 3 })).to.equal('a=1&a=2&b=3');
  });
  it('验证键值对界定符', () => {
    expect(stringify({ a: 1, b: 2 }, { sep: '$' })).to.equal('a=1$b=2');
  });
  it('验证键和值界定符', () => {
    expect(stringify({ a: 1, b: 2 }, { sep: '$', eq: '->' })).to.equal('a->1$b->2');
  });
  it('验证自定义编码函数', () => {
    expect(
      stringify(
        { a: 1, b: 2 },
        {
          sep: '$',
          eq: '->',
          encodeURIComponent(v) {
            return `@${v}`;
          },
        },
      ),
    ).to.equal('@a->@1$@b->@2');
  });
  it('验证能容忍自定义编码函数报错', () => {
    expect(
      stringify(
        { a: 1, b: 2 },
        {
          sep: '$',
          eq: '->',
          encodeURIComponent() {
            throw new Error('Oops!');
          },
        },
      ),
    ).to.equal('a->1$b->2');
  });
});
