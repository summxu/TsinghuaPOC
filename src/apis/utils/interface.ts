/*
 * @Author: Chenxu
 * @Date: 2022-12-29 16:48:16
 * @LastEditTime: 2022-12-29 16:48:16
 * @Msg: Nothing
 */
export interface RequestOptions<T = unknown> {
  url: string,
  data?: T,
  header?: Record<string, string>,
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
};

export type RequestResult<T = unknown> = {
  data: T,
} | { errorMsg: string }
