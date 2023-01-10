/*
 * @Author: Chenxu
 * @Date: 2022-12-29 11:22:42
 * @LastEditTime: 2023-01-10 10:47:45
 * @Msg: Nothing
 */
import { UserState } from "../provider/user-provider";
import { dashApi, request } from "./request";
import { GuestUserInfo } from "./utils/interface";

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

// 获取当前用户信息，这也是一个简单的调用自定义接口的例子。
export const userInfo = () => {
  return request<GuestUserInfo & { data: UserState }>({ url: '/user/info', method: 'POST' });
};

// 测试取出所有院系
export const getAllYanXi = ({ offset, limit }) => {
  return dashApi.search({
    vars: {
      model: 'yuanxi',
      fields: ['id', 'yxdm'],
      limit,
      offset
    }
  })
}