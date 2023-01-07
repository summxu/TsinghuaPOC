/*
 * @Author: Chenxu
 * @Date: 2022-12-29 11:22:42
 * @LastEditTime: 2023-01-07 10:18:46
 * @Msg: Nothing
 */
import { dashApi, request } from "./request";

// 登录(自定义接口)
export const login = (data: { account: string, password: string }) => {
  return request<{ token: string }>({
    url: '/api/auth/v1/request-login-token',
    method: 'POST',
    data,
    header: {
      // 暂不携带access token.
      Authorization: '',
    }
  });
};


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
export const getAllYanXi = ({ offset, limit }) => {
  return dashApi.search({
    vars: {
      model: 'yuanxi1',
      fields: ['id', 'yxdm'],
      limit,
      offset
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