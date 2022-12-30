/*
 * @Author: Chenxu
 * @Date: 2022-12-29 10:42:33
 * @LastEditTime: 2022-12-30 10:08:31
 * @Msg: Nothing
 */
import Taro, { Option, RequestTask } from '@tarojs/taro';
import { createDashApi } from './flora-api-dash/flora-api-dash';
import interceptors, { ResponseData } from './interceptors';

const envVersion = Taro.getAccountInfoSync().miniProgram.envVersion;
const baseApiUrl = {
  develop: 'http://localhost:8080',
  // develop: 'https://portal-miniapp-dev-test.nx1.applysquare.net',
  trial: 'https://portal-miniapp-dev-test.nx1.applysquare.net',
  release: ''
}

// 拦截器
interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem))

// 自定义接口
export const request = (params: Option): RequestTask<unknown> | ResponseData<unknown> => {
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
  return Taro.request(option);
}

// 通用接口Flora-GraphQL
export const dashApi = createDashApi(request)