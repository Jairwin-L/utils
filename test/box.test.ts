import { expect, assert } from 'vitest';
import { box } from '../src/box';

describe('[esm]PromiseRejection', () => {
  it('Should return null on success promise', async () => {
    const input = Promise.resolve({ success: true });
    const [error, resp] = await box(input);

    expect(error).to.equal(undefined);
    expect(JSON.stringify(resp)).to.equal(JSON.stringify({ success: true }));
  });

  it('Should return Error on failed promise', async () => {
    const input = ajax(true);
    const [error, resp] = (await box(input)) as any;

    expect(error.success).to.equal(false);
    expect(resp).to.equal(undefined);
  });

  it('Should fallback on failed promise', async () => {
    const input = ajax(true);
    const [error, resp = { fallback: 'true' }] = (await box(input)) as any;

    expect(error.success).to.equal(false);
    assert.deepStrictEqual(resp, { fallback: 'true' });
  });
});

/**
 * @param {boolean} shouldFail
 * @returns {Promise<{success: boolean}>}
 */
function ajax(shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      shouldFail ? reject({ success: false }) : resolve({ success: true });
    });
  });
}
