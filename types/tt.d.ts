/*
 * @Author: Chenxu
 * @Date: 2022-12-28 16:36:38
 * @LastEditTime: 2022-12-28 17:33:12
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

type ttAPI = {
  enterChat<T = any>(option: enterChat | CommonOption): Promise<T>
}

declare const tt: ttAPI