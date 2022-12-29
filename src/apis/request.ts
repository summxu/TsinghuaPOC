/*
 * @Author: Chenxu
 * @Date: 2022-12-29 10:42:33
 * @LastEditTime: 2022-12-29 16:16:41
 * @Msg: Nothing
 */
import Taro, { RequestTask } from '@tarojs/taro';
import interceptors, { ResponseData } from './interceptors';

const BASE_URL = '/api';

// 拦截器
interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem))

/** HTTP 请求方法 */
interface Method {
  /** HTTP 请求 OPTIONS */
  OPTIONS
  /** HTTP 请求 GET */
  GET
  /** HTTP 请求 HEAD */
  HEAD
  /** HTTP 请求 POST */
  POST
  /** HTTP 请求 PUT */
  PUT
  /** HTTP 请求 DELETE */
  DELETE
  /** HTTP 请求 TRACE */
  TRACE
  /** HTTP 请求 CONNECT */
  CONNECT
}

class httpRequest {

  baseOptions(params, method: keyof Method | undefined = 'GET'): RequestTask<any> | ResponseData<unknown> {
    let { url, data } = params;
    const option = {
      url: BASE_URL + url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        ...params,
        'Authorization': Taro.getStorageSync('Authorization')
      }
    };
    return Taro.request(option);
  }

  get(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option);
  }

  post(url, data = {}, contentType?) {
    let params = { url, data, contentType };
    return this.baseOptions(params, "POST");
  }

  put(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option, "PUT");
  }

  delete(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option, "DELETE");
  }

}

export default new httpRequest()