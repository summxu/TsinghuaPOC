/*
 * @Author: Chenxu
 * @Date: 2022-12-28 16:36:38
 * @LastEditTime: 2023-01-09 17:58:33
 * @Msg: Nothing
 */
/// <reference types="@tarojs/taro" />

interface CommonOption {
  /** 接口调用成功的回调函数 */
  success?: (res: any) => void
  /** 接口调用失败的回调函数 */
  fail?: (res: any) => void
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  complete?: (res: any) => void
}

interface enterChat {
  openid?: string
  openChatId?: string
  needBadge?: boolean
}

interface getUserInfo {
  withCredentials?: boolean //是否需要返回敏感数据
}

type ttAPI = {
  enterChat(option: enterChat | CommonOption): void
  login(option?: CommonOption): void
  checkSession(option?: CommonOption): void
  getUserInfo(option?: getUserInfo | CommonOption): void
}

declare const tt: ttAPI