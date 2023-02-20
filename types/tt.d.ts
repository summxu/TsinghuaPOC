/*
 * @Author: Chenxu
 * @Date: 2022-12-28 16:36:38
 * @LastEditTime: 2023-02-20 13:28:26
 * @Msg: Nothing
 */
/// <reference types="@tarojs/taro" />

interface CommonInput<T> {
  /** 接口调用成功的回调函数 */
  success?: (res: T) => void
  /** 接口调用失败的回调函数 */
  fail?: (res: any) => void
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  complete?: (res: any) => void
}

interface enterChat extends CommonInput<any> {
  openid?: string
  openChatId?: string
  needBadge?: boolean
}

interface getUserInfo extends CommonInput<any> {
  withCredentials?: boolean //是否需要返回敏感数据
}

interface filePicker extends CommonInput<{
  list: {
    path: string
    name: string
    size: string
  }[]
}> {
  maxNum?: number
  isSystem?: boolean
  pickerTitle?: string
  pickerConfirm?: string
}

type ttAPI = {
  enterChat(option: enterChat): void
  login(option?: CommonInput<any>): void
  checkSession(option?: CommonInput<any>): void
  getUserInfo(option?: getUserInfo): void
  removeTabBarItem(option?: { tag: string } | CommonInput<any>): void
  addTabBarItem(option?: any | CommonInput<any>): void
  showTabBar(option?: { animation: boolean } | CommonInput<any>): void
  hideTabBar(option?: { animation: boolean } | CommonInput<any>): void
  filePicker(option: filePicker): void
  getSystemInfoSync(option?: CommonInput<any>): any
}

declare const tt: ttAPI