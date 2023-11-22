/**
 * 校验arg参数数据类型
 * @param { * } arg 待校验参数
 * @param { String } expectType 预期的数据类型
 * @return { Boolean } 校验结果
 */
const msg = '缺少必要参数：expectType';
function detectType(arg: any, expectType: string): boolean {
  if (!expectType) {
    throw new Error(msg);
  }
  return (
    Object.prototype.toString.call(arg).toLowerCase() === `[object ${expectType.toLowerCase()}]`
  );
}

export default detectType;
