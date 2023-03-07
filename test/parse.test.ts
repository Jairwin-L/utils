import { assert } from 'vitest';
import { parse } from '../src/parse';

describe('[esm]parse', () => {
  it('验证简单字符串', () => {
    assert.deepEqual(parse('foo=bar&bar=foo'), {
      foo: 'bar',
      bar: 'foo',
    });
  });
  it('验证解析数组', () => {
    assert.deepEqual(parse('foo=bar&foo=bar1'), {
      foo: ['bar', 'bar1'],
    });
  });
  it('验证键值对界定符', () => {
    assert.deepEqual(parse('foo=bar$bar=foo', '$'), {
      foo: 'bar',
      bar: 'foo',
    });
  });
  it('验证键和值界定符', () => {
    assert.deepEqual(parse('foo->bar$bar->foo', '$', '->'), {
      foo: 'bar',
      bar: 'foo',
    });
  });
  it('验证自定义解码函数', () => {
    assert.deepEqual(
      parse('@foo->@bar$@bar->@foo', '$', '->', {
        decodeURIComponent(v) {
          return v.substr(1);
        },
      }),
      {
        foo: 'bar',
        bar: 'foo',
      },
    );
  });
  it('验证整个url传入', () => {
    assert.deepEqual(parse('http://example.com?foo=bar&bar=foo'), {
      foo: 'bar',
      bar: 'foo',
    });
  });
});
