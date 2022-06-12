/**
 * @param blob {Blob} `file`文件流
 * @example
 *
 * downloadFileUseJS(data)
 *
 * downloadFileUseJS(data, '测试文件', 'xls')
 *
 */
export function downloadFileUseJS(data: Blob, name = '文件', prefix: string = 'xls'): void {
  const urlObject = window.URL || window.webkitURL || window;
  const blob = new Blob([data]);
  const a = document.createElement('a');
  const url = urlObject.createObjectURL(blob);
  a.href = url;
  a.download = `${name}.${prefix}`;
  a.click();
  window.URL.revokeObjectURL(url);
};
