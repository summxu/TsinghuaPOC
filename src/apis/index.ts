/*
 * @Author: Chenxu
 * @Date: 2022-12-29 11:22:42
 * @LastEditTime: 2022-12-30 17:05:06
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

// 测试通用接口
export const testGraphQL = () => {
  return dashApi.fields({
    vars: {
      model: 'PortContent',
      fields: ['content_sources'],
    }
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