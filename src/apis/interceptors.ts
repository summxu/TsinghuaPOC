/*
 * @Author: Chenxu
 * @Date: 2022-12-29 10:43:58
 * @LastEditTime: 2023-02-16 15:15:51
 * @Msg: Nothing
 */
import Taro, { Chain } from "@tarojs/taro"
import { HTTP_STATUS } from './config'

// GQL返回的数据格式
export interface ResponseData<T = unknown> extends Promise<T> {
  compressed: boolean
  result: T
  version: string
}

export interface CommonErrorResponse<T = unknown> extends Promise<T> {
  status: 'ok' | 'error'
  errorKind: string
  errorMsg: string
  error_msg: string
  errorSubKind: string
}

interface SuccessCallbackResult<T extends string | TaroGeneral.IAnyObject | ArrayBuffer = any | any> extends TaroGeneral.CallbackResult {
  /** 开发者服务器返回的数据 */
  data: ResponseData<T> & CommonErrorResponse
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
        return Promise.reject('请求资源不存在')
      } else if (res.statusCode === HTTP_STATUS.SERVER_ERROR) {
        return Promise.reject('服务端错误')
      } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
        return Promise.reject('网关错误')
      } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
        // TODO 根据自身业务修改
        Taro.setStorageSync("Authorization", "")
        // pageToLogin()
        return Promise.reject('没有权限访问');
      } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
        Taro.setStorageSync("Authorization", "")
        // pageToLogin()
        return Promise.reject('需要鉴权')
      } else if (res.statusCode === HTTP_STATUS.CLIENT_ERROR) {
        if (res.data.status === 'error') {
          return Promise.reject(res.data.error_msg)
        }
      } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
        if (res.data.status === 'error') {
          try {
            const sbErrorMsg = JSON.parse(res.data.errorMsg)
            return Promise.reject(sbErrorMsg.items[0].message)
          } catch (error) {
            return Promise.reject(res.data.errorMsg)
          }
        }
        // 成功后
        return res.data
      }
    })
    .catch(error => {
      if (error === 'Authorization verification failed' || error === '用户不存在') {
        return Promise.reject(error)
      }
      Taro.showToast({
        title: error,
        icon: 'none'
      })
      return Promise.reject(error)
    })
}

// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
// const interceptors = [customInterceptor, Taro.interceptors.logInterceptor]
const interceptors = [customInterceptor]

export default interceptors