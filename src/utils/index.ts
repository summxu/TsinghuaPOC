/*
 * @Author: Chenxu
 * @Date: 2023-01-31 15:01:24
 * @LastEditTime: 2023-01-31 15:07:54
 * @Msg: Nothing
 */
// 获取文件后缀
export const getFileNameExt = (fileName) => {
  return fileName.substring(fileName.lastIndexOf('.') + 1);
}

export const getSubFileName = (fileName) => {
  fileName = decodeURIComponent(fileName)
  return fileName.substring(fileName.lastIndexOf('-') + 1, fileName.lastIndexOf('.'));
}
