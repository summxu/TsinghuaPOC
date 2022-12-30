/*
 * @Author: Chenxu
 * @Date: 2022-12-30 10:24:55
 * @LastEditTime: 2022-12-30 14:41:16
 * @Msg: Nothing
 */
import { ResponseData } from "@/apis/interceptors";
import { View } from "@tarojs/components";
import { Children, Dispatch, FC, PropsWithChildren, useEffect, useReducer, useState } from "react";
import { List, Loading } from '@taroify/core';
import { usePageScroll } from "@tarojs/taro";

interface useDataListProps {
  request: (params: Object) => Promise<ResponseData<any>>
  params?: Object | undefined
}

interface pageParamType {
  offset: number
  limit: number
}

interface pageDispatch {
  INIT
  NEXT
  CHANGE_LIMIT
}

interface statusType {
  LOADING
  NORMAL
  NOMORE
  EMPTY
}

export const useDataList = ({ request, params = {} }: useDataListProps) => {
  const pageParamInit: pageParamType = {
    offset: 0,
    limit: 20
  }

  const [dataList, setDataList] = useState<Object[]>([])
  const [status, setStatus] = useState<keyof statusType>('NORMAL')
  const [total, setTotal] = useState(0)

  const pageReducer = (state: pageParamType, action: {
    type: keyof pageDispatch;
    payload?: pageParamType;
  }) => {
    switch (action.type) {
      case 'INIT':
        return pageParamInit
      case 'NEXT':
        // 判断有没有更多
        if (status === 'NOMORE') {
          break
        }
        return {
          ...state,
          offset: state.offset + state.limit
        }
      case 'CHANGE_LIMIT':
        return {
          ...state,
          offset: 0,
          limit: action.payload?.limit
        }
      default:
        return state;
    }
  };
  const [pageParam, dispatch] = useReducer(pageReducer, pageParamInit);

  useEffect(() => {
    setStatus('LOADING')
    request({ ...pageParam, ...params })
      .then(({ data }) => {
        // 判断是否第一页
        if (!pageParam!.offset) {
          setDataList([
            ...dataList,
            ...data.list
          ])
        } else {
          setDataList(data.list)
        }
        // 设置total
        setTotal(data.total)
        // 判断有没有更多
        if (!data.total) {
          setStatus('EMPTY')
        } else if (total < dataList.length) {
          setStatus('NOMORE')
        } else {
          setStatus('NORMAL')
        }
      })
      .catch(error => {
        setStatus('NORMAL')
        console.log(error)
      })
  }, [pageParam!.offset])

  return { dispatch, dataList, status, total }
}

interface DataListProps {
  onDataList: (dataList: any[]) => void
  request: (params: Object) => ResponseData<any>
  params?: Object | undefined
}

export const DataList: FC<PropsWithChildren & DataListProps> = ({ request, onDataList, params = {}, children }) => {

  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [error, setError] = useState(false)

  usePageScroll(({ scrollTop: aScrollTop }) => setScrollTop(aScrollTop))

  const pageParamInit: pageParamType = {
    offset: 0,
    limit: 20
  }
  const pageReducer = (state: pageParamType, action: {
    type: keyof pageDispatch;
    payload?: pageParamType;
  }) => {
    switch (action.type) {
      case 'INIT':
        return pageParamInit
      case 'NEXT':
        return {
          ...state,
          offset: state.offset + state.limit
        }
      case 'CHANGE_LIMIT':
        return {
          ...state,
          offset: 0,
          limit: action.payload?.limit!
        }
      default:
        return state;
    }
  };
  const [pageParam, dispatch] = useReducer(pageReducer, pageParamInit);

  return <List
    loading={loading}
    hasMore={hasMore}
    scrollTop={scrollTop}
    onLoad={async () => {
      console.log(123123)
      setLoading(true)

      try {
        const { data } = await request({ ...pageParam, ...params })
        // 判断是否第一页
        if (pageParam.offset) {
          setList([
            ...list,
            ...data.list
          ])
        } else {
          setList(data.list)
        }
        onDataList(list)
        setHasMore(list.length < pageParam.limit)

        dispatch({ type: 'NEXT' })
      } catch (error) {
        setError(true)
        console.log(error)
      }

      setLoading(false)
    }}
  >
    {children}
    <List.Placeholder
      onClick={() => {
        if (error) {
          setHasMore(true)
          setError(false)
        }
      }}
    >
      {loading && <Loading>加载中...</Loading>}
      {error && "请求失败，点击重新加载"}
      {!hasMore && "没有更多了"}
    </List.Placeholder>
  </List>
}