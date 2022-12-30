/*
 * @Author: Chenxu
 * @Date: 2022-12-29 11:22:42
 * @LastEditTime: 2022-12-30 12:49:09
 * @Msg: Nothing
 */
import { request, dashApi } from "./request"

export const getResultData_servers = (data) => {
  return request({
    url: '/api/white-screen/search',
    method: 'GET',
    data
  })
}

// 测试分页
export const testPage = (data) => {
  return request({
    url: '/datalist',
    method: 'GET',
    data
  })
}