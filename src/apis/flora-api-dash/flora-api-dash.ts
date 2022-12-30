/*
 * @Author: Chenxu
 * @Date: 2022-12-30 09:13:15
 * @LastEditTime: 2022-12-30 10:18:31
 * @Msg: Nothing
 */
import { GQLClient, GQLLoader } from "../utils/gql";
import { DataAPI } from "./data-api";

// 通用接口
export function createDashApi(request) {
  const gqlClient = createGQLClient(request);
  return new DataAPI(gqlClient)
}

function createGQLClient(request): GQLClient {
  const c = {
    request,
    isServer: false, // 返回是否为服务器端渲染。
    isDev: false, // 是否为开发调试环境。
    endpointPath: '/gql/endpoint',
    batchedEndPointPath: '/gql/endpoint_batch',
    gqlLoader: undefined as any,
  };
  c.gqlLoader = new GQLLoader(c);
  return c;
}
