/*
 * @Author: Chenxu
 * @Date: 2022-12-29 10:42:33
 * @LastEditTime: 2023-01-09 11:56:23
 * @Msg: Nothing
 */
import Taro from '@tarojs/taro';
import { createDashApi } from './flora-api-dash/flora-api-dash';
import interceptors, { ResponseData } from './interceptors';

const envVersion = 'develop'
const baseApiUrl = {
  // develop: 'http://192.168.196.1:8080',
  develop: 'http://localhost:8080',
  trial: 'https://mock.presstime.cn/mock/63ae6a030a20cd00b248136c',
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
      'Authorization': Taro.getStorageSync('Authorization') || "Bearer fllt:v1:eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImV4cCI6MTY3NTU4NTc1NSwiaWF0IjoxNjcyOTkzNzU1fQ.qPDjJN3CkItln9KvM9bl_6dVRGGQ6H0ctqRyrn8LdwNE77GzUMAMVLTjA5VpVLpWThN9sDu3YCWiEr5WSe5_z9bGH2qt5Oef9f5m5B7b5-ElZoFhSyfOchyaAERG0IWnEk6x9JE3Wf1ObXtcCrEp9Ad3_GusC0mOHvKLu9Kk12DMP0QXK2-foDhglHiH1ukHI_xkvMYM5aOy9IA9bze0tsBe0s5yy-Mn04K9o1i3-mLcQjUxx0C3BJU2i7Zl80g2MGzMD3kQrcgNYdjahqmVgGK6X22N8GXtBIu8enuPAvRoIyRSy8dA3OQXCBemhSsEA3jFOI3JJsRlki1Ie6Q_yg",
      ...params.header,
    }
  };
  return Taro.request(option) as unknown as Promise<ResponseData<T>>;
}

// 通用接口Flora-GraphQL
export const dashApi = createDashApi(request)