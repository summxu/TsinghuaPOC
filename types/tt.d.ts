/*
 * @Author: Chenxu
 * @Date: 2022-12-28 16:36:38
 * @LastEditTime: 2023-01-10 16:17:45
 * @Msg: Nothing
 */
/// <reference types="@tarojs/taro" />

interface CommonInput {
  /** 接口调用成功的回调函数 */
  success?: (res: any) => void
  /** 接口调用失败的回调函数 */
  fail?: (res: any) => void
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  complete?: (res: any) => void
}

interface enterChat extends CommonInput {
  openid?: string
  openChatId?: string
  needBadge?: boolean
}

interface getUserInfo extends CommonInput {
  withCredentials?: boolean //是否需要返回敏感数据
}

type ttAPI = {
  enterChat(option: enterChat): void
  login(option?: CommonInput): void
  checkSession(option?: CommonInput): void
  getUserInfo(option?: getUserInfo): void
  removeTabBarItem(option?: { tag: string } | CommonInput): void
}

declare const tt: ttAPI