/*
 * @Author: Chenxu
 * @Date: 2023-01-06 17:06:07
 * @LastEditTime: 2023-01-06 17:15:30
 * @Msg: Nothing
 */
import * as graphqlify from 'typed-graphqlify';
import * as DataLoader from 'dataloader';
import { RequestOptions, RequestResult } from './interface';
import { Limiter } from './limiter';


// 重新导出常用于定义query的函数。
export const params = graphqlify.params;
export const types = graphqlify.types;
export const fragment = graphqlify.fragment;
export const optional = graphqlify.optional;

// 常用的fragment, fields。
export const resultFields = {
  error_msg: types.string,
  status: types.string,
  sub_kind: types.string,
}

// defineQuery和defineMutation的参数类型。
export interface QueryDef<Q, V> {
  v?: V;
  q: Q;
  name: string;
  skipCache?: boolean;
}

// 定义好的Query.
export interface Query<Q, V> {
  // 执行query，用Promise返回结果。
  fetch: (args: FetchArgs<V>) => Promise<OKResult<Q>>;
}


export type OKResult<R> = {
  status: 'ok',
  result: R,
};

export type Result<R> = OKResult<R> | { status: 'error', error: any } | { status: 'loading' };

function makeOKResult<R>(r: R): OKResult<R> {
  return { status: 'ok', result: r };
}

// @ts-ignore
export type ResultType<T> = T extends Query<infer Q, infer V> ? Q : T extends Mutation<infer Q, infer V> ? Q : never;
// @ts-ignore
export type VariableType<T> = OptionalUndefined<T extends Query<infer Q, infer V> ? V : T extends Mutation<infer Q, infer V> ? V : never>;

// 定义一个Query, 第二个参数用于使查询结果直接返回内层结果。
export function defineQuery<Q0, V>(def: QueryDef<Q0, V>): Query<Q0, V>;
export function defineQuery<Q0, Q, V>(def: QueryDef<Q0, V>, t: (r: Q0) => Q): Query<Q, V>;
export function defineQuery<Q, V, V1>(def: QueryDef<Q, V>, t: undefined, tv: (v: OptionalUndefined<V>) => V1): Query<Q, V>;
export function defineQuery<Q0, Q, V, V1>(def: QueryDef<Q0, V>, t: (r: Q0) => Q, tv: (v: OptionalUndefined<V>) => V1): Query<Q, V>;
export function defineQuery<Q0, Q, V, V1>(def: QueryDef<Q0, V>, t?: (r: Q0) => Q, tv?: (v: OptionalUndefined<V>) => V1): Query<Q, V> {
  const tt = t ?? ((r) => r);
  const ttv = tv ?? ((r) => r);

  const queryStr = graphqlify.query(def.name, def.q).toString();

  const fetchRaw = async (args: FetchArgs<OptionalUndefined<V>>) => {
    const r = await gqlPromise<any, { data: Q0 }>({
      client: args.client,
      v: ttv(args.v),
      query: queryStr,
      cacheMode: args.cacheMode || 'no-cache',
      operationName: def.name,
    }).then(r => r.data);
    return tt(r) as Q;
  };

  return {
    fetch: (args: FetchArgs<OptionalUndefined<V>>) => {
      return fetchRaw(args).then(makeOKResult);
    },
  };
}

export interface Mutation<Q, V> {
  run: (vars: FetchArgs<V>) => Promise<OKResult<Q>>;
}
export function defineMutation<Q, V>(def: QueryDef<Q, V>): Mutation<Q, V>;
export function defineMutation<Q0, Q, V>(def: QueryDef<Q0, V>, t: (r: Q0) => Q): Mutation<Q, V>;
export function defineMutation<Q0, Q, V, V1>(def: QueryDef<Q0, V>, t?: (r: Q0) => Q, tv?: (v: OptionalUndefined<V>) => V1): Mutation<Q, V>;
export function defineMutation<Q0, Q, V, V1>(def: QueryDef<Q0, V>, t?: (r: Q0) => Q, tv?: (v: OptionalUndefined<V>) => V1): Mutation<Q, V> {
  const tt = t ?? ((r) => r);
  const ttv = tv ?? ((r) => r);
  const queryStr = graphqlify.mutation(def.name, def.q).toString();

  const fetchRaw = async (args: FetchArgs<V>) => {
    const r = await gqlPromise<any, { data: Q0 }>({
      client: args.client,
      v: ttv(args.v),
      query: queryStr,
      cacheMode: args.cacheMode || 'no-cache',
      operationName: def.name,
    }).then(r => r.data);
    return tt(r) as Q;
  };
  return {
    run: (args: FetchArgs<V>) => {
      return fetchRaw(args).then(makeOKResult);
    }
  };
}

export type CacheMode = 'use-cache' | 'no-cache' | 'invalidate' | 'invalidate-all';

export type FetchArgs<V> = {
  v: V,
  client: GQLClient,
  cacheMode?: CacheMode,
}

export interface RawRequest<V> {
  query: string;
  v?: V;
  operationName?: string;
  cacheMode?: CacheMode;
}

type GqlPromiseArgs<V> = RawRequest<V> & { client: GQLClient } & { cacheMode: CacheMode };

function postGQLEndpoint<R>(args: {
  client: GQLClient,
  endpoint: string,
  query: string;
  variables?: any;
  operationName?: string;
}) {
  return args.client.request<R>({
    url: args.endpoint,
    method: 'POST',
    data: {
      query: args.query,
      variables: args.variables,
      operationName: args.operationName,
    },
  }).then((r) => {
    if ('result' in r) {
      return r.result;
    }
    throw new Error('request gql failed: ' + r);
  });
}

export function gqlPromise<V, R>(args: GqlPromiseArgs<V>): Promise<R> {
  const { client } = args;
  const cacheMode = args.cacheMode || 'no-cache'; // 默认不缓存

  const endpoint = args.client.isDev ? args.client.endpointPath + `?_=${args.operationName}` : args.client.endpointPath;

  const q = {
    query: args.query,
    variables: args.v,
    operationName: args.operationName,
  };
  switch (cacheMode) {
    case 'invalidate':
      client.gqlLoader?.clear(q);
    case 'no-cache': // 不缓存的时候也从新创建请求对象
      client.gqlLoader?.clearAll();
    case 'invalidate-all':
      client.gqlLoader?.clearAll();
  }

  if (!client.isServer && !client.isDev && client.gqlLoader) {
    return mapErrors(client.gqlLoader.getData({
      query: args.query,
      variables: args.v,
      operationName: args.operationName,
    }))
  }

}

export function mapErrors<T extends { errors?: any }>(p: Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    p.then(r => {
      const data: any = r;
      if (!(data instanceof Object)) {
        resolve(r);
        return;
      }
      if (!r['errors']) {
        resolve(r);
        return;
      }

      const errs = r['errors'];
      if (!errs.length || errs.length > 1) {
        reject(new Error(JSON.stringify(r, null, 2)));
        return;
      }

      const err = errs[0];
      if (!err.message) {
        reject(new Error(JSON.stringify(r, null, 2)));
        return;
      }

      const msg: string = err.message;
      if (!msg.startsWith('{')) {
        reject(new Error(JSON.stringify(r, null, 2)));
        return;
      }

      const appErr = JSON.parse(msg);
      reject(new A2Error(appErr));
    }).catch(e => {
      reject(e);
    });
  });
}

type BatchLoadQueryType = {
  query: string,
  variables: any,
  operationName?: string,
  key?: string,
}

export class GQLLoader {

  private readonly loader: DataLoader<BatchLoadQueryType, any, string>;

  #limitter = new Limiter(1);

  constructor(public client: GQLClient & { gqlLoader: undefined }) {
    this.loader = new DataLoader<BatchLoadQueryType, any, string>(this.batchLoad, {
      cache: !client.isServer,
      cacheKeyFn: (key) => {
        return JSON.stringify(key);
      },
    }) as unknown as DataLoader<BatchLoadQueryType, any>;
  }

  public getData(query: BatchLoadQueryType, invalidateCache: boolean = false) {
    if (invalidateCache) {
      this.loader.clear(query);
    }
    return this.loader.load(query);
  }
  public clear(query: BatchLoadQueryType) {
    return this.loader.clear(query);
  }
  public clearAll() {
    return this.loader.clearAll();
  }

  private batchLoad = (querys: readonly BatchLoadQueryType[]) => {
    let version = '' // version = 'v1' 时使用加密算法
    querys = querys.map((item, i) => {
      item.key = `batch_load_${i}`
      return {
        query: item.query,
        variables: item.variables,
        key: `batch_load_${i}`,
        operationName: item.operationName,
      }
    })
    const data = querys.map((item) => {
      return JSON.stringify(item)
    })
    let dataStr = JSON.stringify(data);
    switch (version) {
      case 'v1': {
        // 加密算法后续添加
        break;
      }
    }

    return this.client.request({
      url: this.client.batchedEndPointPath,
      method: 'POST',
      data: {
        query: dataStr,
        version: version,
      },
    }).then((r) => {
      if ('result' in r) {

        const aesResultMap = r as any;
        let resultMapStr = ''
        switch (aesResultMap?.version) {
          case 'v1': {
            // 加密算法后续添加
            break;
          }
          default:
            resultMapStr = aesResultMap?.result
            break;
        }

        const resultMap = JSON.parse(resultMapStr || '{}')
        return querys.map((query) => resultMap[query.key || ""]);
      }
      throw new Error('request gql failed: ' + r);
    });
  };
}

export class A2Error extends Error {
  kind: string = 'Internal';
  constructor(public data: ErrorData) {
    super();

    if ((Error as any).captureStackTrace) {
      (Error as any).captureStackTrace(this, A2Error);
    }
    this.name = 'A2Error';
    this.kind = this.data.error_kind || this.kind;
    this.message = `${this.kind} error: ${this.data.error_msg}`
  }
}

interface ErrorData {
  error_msg: string
  error_kind?: string
  error_sub_kind?: string
}


// GQLClient 传递请求需要的背景信息。
export interface GQLClient {
  // 发送网络请求。
  request: <T>(opts: RequestOptions) => Promise<RequestResult<T>>;
  // 数据加载器。
  gqlLoader: GQLLoader | undefined;
  // 返回是否为服务器端渲染。
  isServer: boolean;
  // 是否为开发调试环境。
  isDev: boolean;
  // e.g. /gql/endpoint.
  endpointPath: string;
  // e.g. /gql/endpoint_batch
  batchedEndPointPath: string;
}


// https://stackoverflow.com/a/69412589
type KeysOfType<T, SelectedType> = {
  [key in keyof T]: SelectedType extends T[key] ? key : never;
}[keyof T];
type Optional<T> = Partial<Pick<T, KeysOfType<T, undefined>>>;
type Required<T> = Omit<T, KeysOfType<T, undefined>>;
type OptionalUndefined<T> = Optional<T> & Required<T>;
