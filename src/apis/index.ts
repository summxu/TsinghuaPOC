/*
 * @Author: Chenxu
 * @Date: 2022-12-29 11:22:42
 * @LastEditTime: 2023-01-06 09:26:43
 * @Msg: Nothing
 */
import { buildSimpleSearchCondition } from "./flora-api-dash/data-api"
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

// 测试取出所有院系
export const getAllYX = () => {
  return dashApi.search({
    vars: {
      model: 'yuanxi',
      fields: ['id', 'yxdm', 'name'],
      // condition: { // 搜索的条件
      //   logic_operator: "|",
      //   children: [ // 这里可以往数组里写多个条件
      //     {
      //       leaf: {
      //         field: "name",
      //         comparator: "like",
      //         value: "计算",
      //       },
      //     },
      //   ]
      // },
      limit: 10,
      offset: 0
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