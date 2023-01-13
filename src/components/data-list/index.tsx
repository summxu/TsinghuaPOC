/*
 * @Author: Chenxu
 * @Date: 2022-12-30 10:24:55
 * @LastEditTime: 2023-01-13 11:17:14
 * @Msg: Nothing
 */
import { GenericSearchResult } from "@/apis/flora-api-dash/query-defs";
import { ResponseData } from "@/apis/interceptors";
import { Divider, Empty, Loading, PullRefresh } from "@taroify/core";
import { View } from "@tarojs/components";
import { useReachBottom } from "@tarojs/taro";
import { Dispatch, FC, PropsWithChildren, useEffect, useReducer, useRef, useState } from "react";
import "./index.scss";

interface useDataListProps {
  request: (params: Object) => Promise<any>;
  params?: Object | undefined
}

interface pageParamType {
  offset: number
  limit: number
  flush: number
}

interface pageDispatch {
  NEXT
  CHANGE_LIMIT,
  FLUSH
}

interface statusType {
  LOADING
  NORMAL
  NOMORE
  EMPTY
  ERROR
}

export const useDataList = ({ request, params = {} }: useDataListProps) => {
  const pageParamInit: pageParamType = {
    offset: 0,
    limit: 20,
    flush: 0
  }

  const [dataList, setDataList] = useState<{ data: any }[]>([])
  const [status, setStatus] = useState<keyof statusType>('NORMAL')
  const [total, setTotal] = useState(0)

  const pageReducer = (state: pageParamType, action: {
    type: keyof pageDispatch;
    payload?: pageParamType;
  }) => {
    switch (action.type) {
      case 'FLUSH':
        return {
          ...state,
          offset: 0,
          flush: Math.random()
        }
      case 'NEXT':
        // 判断有没有更多
        if (status === 'NOMORE') {
          return state
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

  const dataListRef = useRef<any[]>([])

  const queryRequest = async () => {
    setStatus('LOADING')
    try {
      const { result }: ResponseData<GenericSearchResult<any>> = await request({
        offset: pageParam.offset,
        limit: pageParam.limit,
        ...params
      })
      // 判断是否第一页
      if (pageParam.offset) {
        setDataList([...dataList, ...result.items])
        dataListRef.current = [...dataList, ...result.items]
      } else {
        setDataList(result.items)
        dataListRef.current = result.items
      }
      setTotal(result.page_info.total_count)
      // 判断有没有更多
      if (!dataListRef.current.length) {
        setStatus('EMPTY')
      } else if (result.items.length < pageParam?.limit!) {
        setStatus('NOMORE')
      } else {
        setStatus('NORMAL')
      }
    } catch (error) {
      setStatus('ERROR')
      console.log(error)
    }
  }

  useEffect(() => { queryRequest() }, [pageParam, params])

  return { dispatch, dataList, status, total }
}

interface DataListProps {
  status: keyof statusType
  dispatch: Dispatch<{
    type: keyof pageDispatch;
    payload?: pageParamType;
  }>;
}

export const DataList: FC<PropsWithChildren<unknown> & DataListProps> = ({ status, dispatch, children }) => {

  useReachBottom(() => dispatch({ type: 'NEXT' }))

  return (
    <PullRefresh
      loading={status === 'LOADING'}
      reachTop={true}
      onRefresh={() => dispatch({ type: 'FLUSH' })}
    >
      <View className="page-bottom">
        {children}
        <View className="flex justify-center">
          {status === 'NORMAL' && (
            <Divider onClick={() => dispatch({ type: 'NEXT' })}>
              <Divider.Text >点击加载更多</Divider.Text>
            </Divider>
          )}
          {status === 'ERROR' && (
            <Divider onClick={() => dispatch({ type: 'FLUSH' })}>
              <Divider.Text >加载失败，点击重新加载</Divider.Text>
            </Divider>
          )}
          {/* {status === 'LOADING' && <Loading style={{ width: '100%' }} type="spinner" size="18px">加载中...</Loading>} */}
          {status === 'NOMORE' && (
            <Divider style={{ border: 'none' }}>
              <Divider.Text >没有更多了</Divider.Text>
            </Divider>
          )}
          {status === 'EMPTY' && (
            <Empty style={{ paddingTop: '100px' }}>
              <Empty.Image style={{ width: '177px', height: '120px' }} src={require('@/static/empty.png')} />
              <Empty.Description>内容为空</Empty.Description>
            </Empty>
          )}
        </View>
      </View>
    </PullRefresh>

  )
}