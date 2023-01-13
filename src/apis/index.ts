/*
 * @Author: Chenxu
 * @Date: 2022-12-29 11:22:42
 * @LastEditTime: 2023-01-13 15:51:54
 * @Msg: Nothing
 */
import { UserState } from "../provider/user-provider";
import { dashApi, request } from "./request";
import { GuestUserInfo } from "./utils/interface";

// 对象转URLcode
const json2url = (json) => {
  let tempArr: string[] = []
  Object.keys(json).forEach(item => {
    tempArr.push(`${encodeURIComponent(item)}=${encodeURIComponent(json[item])}`)
  })
  return tempArr.length ? '?' + tempArr.join('&') : ''
}

// 框架内基础登录(自定义接口，没用到)
export const loginBase = (data: { account: string, password: string }) => {
  return request<{ token: string }>({
    url: '/api/auth/v1/request-login-token',
    method: 'POST',
    data,
    header: { Authorization: '' }
  });
};

// 账号密码登录/绑定(自定义接口)
export const login = (data: { code: string, pwd: string, login_code: string }) => {
  return request<{ token: string }>({
    url: '/feishu_api/user_login',
    method: 'POST',
    data,
    header: { Authorization: '' }
  });
};

// 飞书openID登录
export const feishuOpenIDLogin = (data: { code: string }) => {
  return request<{ token: string }>({
    url: '/feishu_api/openid_login' + json2url(data),
    method: 'POST',
    data,
    header: { Authorization: '' }
  });
};

// 获取当前用户信息
export const userInfo = () => {
  return request<GuestUserInfo & { data: UserState }>({
    url: '/user/info',
    method: 'POST'
  });
};

// 获取当前用户详细信息表
export const userInfoDetail = (uid: number) => {
  return dashApi.getByRawID({
    vars: {
      model: 'User',
      fields: ['student_id', 'teacher_id'],
      id: uid,
      match_record_tags: []
    }
  })
};

// 测试取出所有院系
export const getAllYanXi = ({ offset, limit, searchValue }) => {
  return dashApi.search({
    vars: {
      model: 'student',
      fields: ['code', 'name'],
      condition: {
        logic_operator: "&",
        children: [{
          leaf: {
            field: 'name',
            comparator: 'like',
            value: searchValue,
          }
        }]
      },
      limit,
      offset
    }
  })
}
