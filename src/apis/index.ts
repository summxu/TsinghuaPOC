/*
 * @Author: Chenxu
 * @Date: 2022-12-29 11:22:42
 * @LastEditTime: 2022-12-29 11:35:53
 * @Msg: Nothing
 */
import request from "./request"

export const getResultData_servers = (data) => {
  return request.post('/api/white-screen/search', data)
}