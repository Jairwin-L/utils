import { expect } from 'vitest';
import { appendQueriesToUrl } from '../src/appendQueriesToUrl';

describe('appendQueriesToUrl', () => {
  it('无效对象', () => {
    expect(appendQueriesToUrl('https://example.com')).to.equal('https://example.com');
  });
  it('空对象', () => {
    expect(appendQueriesToUrl('https://example.com', {})).to.equal('https://example.com');
  });

  it('域名', () => {
    expect(appendQueriesToUrl('https://example.com', { key1: 'value1', key2: 'value2' })).to.equal(
      'https://example.com?key1=value1&key2=value2',
    );
  });
  it('域名末尾包含"?"', () => {
    expect(appendQueriesToUrl('https://example.com?', { key1: 'value1', key2: 'value2' })).to.equal(
      'https://example.com?key1=value1&key2=value2',
    );
  });

  it('域名末尾包含query参数', () => {
    expect(
      appendQueriesToUrl('https://example.com?a=a', { key1: 'value1', key2: 'value2' }),
    ).to.equal('https://example.com?a=a&key1=value1&key2=value2');
  });
  it('域名末尾包含多余&符号', () => {
    expect(
      appendQueriesToUrl('https://example.com?a=a&', { key1: 'value1', key2: 'value2' }),
    ).to.equal('https://example.com?a=a&key1=value1&key2=value2');
  });
});
