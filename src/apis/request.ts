/*
 * @Author: Chenxu
 * @Date: 2022-12-29 10:42:33
 * @LastEditTime: 2023-01-05 22:37:32
 * @Msg: Nothing
 */
import Taro from '@tarojs/taro';
import { createDashApi } from './flora-api-dash/flora-api-dash';
import interceptors, { ResponseData } from './interceptors';

const envVersion = 'develop'
const baseApiUrl = {
  develop: 'http://192.168.196.1:9901',
  trial: 'https://mock.presstime.cn/mock/63ae6a030a20cd00b248136c',
  release: ''
}

// 拦截器
interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem))

// 自定义接口
export const request = (params: Option): Promise<ResponseData<any>> => {
  let { url, data } = params;
  const option = {
    url: baseApiUrl[envVersion] + url,
    data: data,
    method: params.method || 'GET',
    header: {
      'Content-Type': 'application/json',
      ...params.header,
      'Authorization': Taro.getStorageSync('Authorization')
    }
  };
  return Taro.request(option) as unknown as Promise<ResponseData<any>>;
}

// 通用接口Flora-GraphQL
export const dashApi = createDashApi(request)