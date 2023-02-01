/*
 * @Author: Chenxu
 * @Date: 2022-12-29 10:42:33
 * @LastEditTime: 2023-02-01 13:14:18
 * @Msg: Nothing
 */
import Taro from '@tarojs/taro';
import { createDashApi } from './flora-api-dash/flora-api-dash';
import interceptors, { ResponseData } from './interceptors';

export const envVersion = 'develop'
export const baseApiUrl = {
  develop: 'http://192.168.196.1:8080',
  trial: 'http://xcc_http_flora.frp.freefrps.com',
  release: ''
}

// 拦截器
interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem))

// 自定义接口
export const request = <T>(params: Option) => {
  let { url, data } = params;
  const option = {
    url: baseApiUrl[envVersion] + url,
    data: data,
    method: params.method || 'GET',
    header: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + Taro.getStorageSync('Authorization'),
      ...params.header,
    }
  };
  return Taro.request(option) as unknown as Promise<ResponseData<T>>;
}

// 通用接口Flora-GraphQL
export const dashApi = createDashApi(request)