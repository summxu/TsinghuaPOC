/*
 * @Author: Chenxu
 * @Date: 2022-12-30 17:40:45
 * @LastEditTime: 2022-12-30 17:41:54
 * @Msg: Nothing
 */
interface Option<T = any, U extends string | TaroGeneral.IAnyObject | ArrayBuffer = any | any> {
  /** 开发者服务器接口地址 */
  url: string
  /** 请求的参数 */
  data?: U
  /** 设置请求的 header，header 中不能设置 Referer。
   *
   * `content-type` 默认为 `application/json`
   */
  header?: TaroGeneral.IAnyObject
  /** 超时时间，单位为毫秒
   * @default 2000
   * @supported weapp, h5, tt
   */
  timeout?: number
  /** HTTP 请求方法
   * @default GET
   */
  method?: keyof Method
  /** 返回的数据格式 */
  dataType?: keyof DataType | string
  /** 响应的数据类型 */
  responseType?: keyof ResponseType
  /** 开启 http2
   * @default false
   * @supported weapp
   */
  enableHttp2?: boolean
  /** 开启 quic
   * @default false
   * @supported weapp
   */
  enableQuic?: boolean
  /** 开启 cache
   * @default false
   * @supported weapp, tt
   */
  enableCache?: boolean
  /** 是否开启 HttpDNS 服务。如开启，需要同时填入 httpDNSServiceId 。 HttpDNS 用法详见 移动解析HttpDNS
   * @default false
   * @supported weapp
   */
  enableHttpDNS?: boolean
  /** HttpDNS 服务商 Id。 HttpDNS 用法详见 移动解析HttpDNS
   * @supported weapp
   */
  httpDNSServiceId?: string
  /** 开启 transfer-encoding chunked。
   * @default false
   * @supported weapp
   */
  enableChunked?: boolean
  /** 接口调用成功的回调函数 */
  success?: (result: SuccessCallbackResult<T>) => void
  /** 接口调用失败的回调函数 */
  fail?: (res: TaroGeneral.CallbackResult) => void
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  complete?: (res: TaroGeneral.CallbackResult) => void
  /** 设置 H5 端是否使用jsonp方式获取数据
   * @default false
   * @supported h5
   */
  jsonp?: boolean
  /** 设置 H5 端 jsonp 请求 url 是否需要被缓存
   * @default false
   * @supported h5
   */
  jsonpCache?: boolean
  /** 设置 H5 端是否允许跨域请求
   * @default "same-origin"
   * @supported h5
   */
  mode?: keyof CorsMode
  /** 设置 H5 端是否携带 Cookie
   * @default "omit"
   * @supported h5
   */
  credentials?: keyof Credentials
  /** 设置 H5 端缓存模式
   * @default "default"
   * @supported h5
   */
  cache?: keyof Cache
  /** 设置 H5 端请求重试次数
   * @default 2
   * @supported h5
   */
  retryTimes?: number
  /** 设置 H5 端请求的兜底接口
   * @supported h5
   */
  backup?: string | string[]
  /** 设置 H5 端请求响应的数据校验函数，若返回 false，则请求兜底接口，若无兜底接口，则报请求失败
   * @supported h5
   */
  dataCheck?(): boolean
  /** 设置 H5 端请求是否使用缓存
   * @default false
   * @supported h5
   */
  useStore?: boolean
  /** 设置 H5 端请求缓存校验的 key
   * @supported h5
   */
  storeCheckKey?: string
  /** 设置 H5 端请求缓存签名
   * @supported h5
   */
  storeSign?: string
  /** 设置 H5 端请求校验函数，一般不需要设置
   * @supported h5
   */
  storeCheck?(): boolean
}


interface SuccessCallbackResult<T extends string | TaroGeneral.IAnyObject | ArrayBuffer = any | any> extends TaroGeneral.CallbackResult {
  /** 开发者服务器返回的数据 */
  data: T
  /** 开发者服务器返回的 HTTP Response Header */
  header: TaroGeneral.IAnyObject
  /** 开发者服务器返回的 HTTP 状态码 */
  statusCode: number
  /** 调用结果 */
  errMsg: string
  /** cookies */
  cookies?: string[]
}

/** 返回的数据格式 */
interface DataType {
  /** 返回的数据为 JSON，返回后会对返回的数据进行一次 JSON.parse
   * 其他: 不对返回的内容进行 JSON.parse
   */
  json
}

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

/** 响应的数据类型 */
interface ResponseType {
  /** 响应的数据为文本 */
  text
  /** 响应的数据为 ArrayBuffer */
  arraybuffer
}

/** 跨域策略 */
interface CorsMode {
  /** 跨域请求将获取不透明的响应 */
  'no-cors'
  /** 允许跨域请求 */
  cors
  /** 请求总是向当前的源发起的 */
  'same-origin'
}
/** 证书 */
interface Credentials {
  /** 不论是不是跨域的请求,总是发送请求资源域在本地的 cookies、 HTTP Basic authentication 等验证信息 */
  include
  /** 只有当URL与响应脚本同源才发送 cookies、 HTTP Basic authentication 等验证信息 */
  'same-origin'
  /** 从不发送cookies */
  omit
}
/** 缓存策略 */
interface Cache {
  /** 浏览器从HTTP缓存中寻找匹配的请求 */
  default
  /** 浏览器在其HTTP缓存中寻找匹配的请求 */
  'no-cache'
  /** 浏览器直接从远程服务器获取资源，不查看缓存，然后使用下载的资源更新缓存 */
  reload
  /** 浏览器在其HTTP缓存中寻找匹配的请求 */
  'force-cache'
  /** 浏览器在其HTTP缓存中寻找匹配的请求 */
  'only-if-cached'
}