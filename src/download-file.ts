/**
 * @param {Blob} blob `file`文件流
 * @param {string} name=文件 文件名称
 * @param {string} prefix=xls 文件名称后缀
 *
 * @example
 *
 * import { downloadFileUseJS } from '@jairwinl/utils/esm/downloadFileUseJS';
 *
 * downloadFileUseJS(data)
 *
 * downloadFileUseJS(data, '测试文件', 'xls')
 *
 */
function downloadFileUseJS(data: Blob, name = '文件', prefix = 'xls'): void {
  const urlObject = window.URL || window.webkitURL || window;
  const blob = new Blob([data]);
  const a = document.createElement('a');
  const url = urlObject.createObjectURL(blob);
  a.href = url;
  a.download = `${name}.${prefix}`;
  a.click();
  window.URL.revokeObjectURL(url);
}

export default downloadFileUseJS;
