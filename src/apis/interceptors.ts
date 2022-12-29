/*
 * @Author: Chenxu
 * @Date: 2022-12-29 10:43:58
 * @LastEditTime: 2022-12-29 11:35:14
 * @Msg: Nothing
 */
import Taro, { Chain } from "@tarojs/taro"
import { HTTP_STATUS } from './config'

export interface ResponseData<T> {
  code: number
  data: T
  msg: string
}

interface SuccessCallbackResult<T extends string | TaroGeneral.IAnyObject | ArrayBuffer = any | any> extends TaroGeneral.CallbackResult {
  /** 开发者服务器返回的数据 */
  data: ResponseData<T>
  /** 开发者服务器返回的 HTTP Response Header */
  header: TaroGeneral.IAnyObject
  /** 开发者服务器返回的 HTTP 状态码 */
  statusCode: number
  /** 调用结果 */
  errMsg: string
  /** cookies */
  cookies?: string[]
}

const customInterceptor = (chain: Chain) => {

  const requestParams = chain.requestParams

  return chain.proceed(requestParams)
    .then((res: SuccessCallbackResult) => {
      // 只要请求成功，不管返回什么状态码，都走这个回调
      if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
        const msg = '请求资源不存在'
        Taro.showToast({
          title: msg,
          icon: 'none'
        })
        return Promise.reject(msg)

      } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
        const msg = '服务端出现了问题'
        Taro.showToast({
          title: msg,
          icon: 'none'
        })
        return Promise.reject(msg)
      } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
        // TODO 根据自身业务修改
        Taro.setStorageSync("Authorization", "")
        // pageToLogin()
        const msg = '没有权限访问'
        Taro.showToast({
          title: msg,
          icon: 'none'
        })
        return Promise.reject(msg);
      } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
        Taro.setStorageSync("Authorization", "")
        // pageToLogin()
        const msg = '需要鉴权'
        Taro.showToast({
          title: msg,
          icon: 'none'
        })
        return Promise.reject(msg)
      } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
        // 成功后
        return res.data
      }
    })
    .catch(error => {
      const msg = '网络链接失败/(ㄒoㄒ)/~~'
      Taro.showToast({
        title: msg,
        icon: 'none'
      })
      return Promise.reject(error)
    })
}

// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
const interceptors = [customInterceptor, Taro.interceptors.logInterceptor]

export default interceptors