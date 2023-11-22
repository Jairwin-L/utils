/**
 * 异步函数无需 try-catch，让异步编码开发体验更佳。
 * 1. 减少 try-catch 引入的嵌套
 * 2. 防止出现大而全的 try-catch
 * 3. 自动推导类型，避免 try-catch 丢失类型
 * 4. 最重要的是逼迫开发者将异常放到第一位去考虑，避免忘记 try-catch 导致 Unhandled Promise rejection
 *
 * @param promise Promise<T> Promise
 * @returns 返回 tuple，失败则第一项是 `error`，成功第一项为 `undefined`，第二项是返回值
 *
 * @example
 *
 * const [error, resp] = await box(ajax.get(url));
 * if (error || !resp.success) {
 *    const err = error || resp;
 *    console.log('error');
 *    throw err;
 * }
 * return resp;
 */
async function box<T>(promise: Promise<T>): Promise<[(Error & T) | undefined, T | undefined]> {
  try {
    return [undefined, await promise];
  } catch (error) {
    return [error as any, undefined];
  }
}

export default box;
