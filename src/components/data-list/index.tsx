/*
 * @Author: Chenxu
 * @Date: 2022-12-30 10:24:55
 * @LastEditTime: 2023-01-03 09:30:53
 * @Msg: Nothing
 */
import { ResponseData } from "@/apis/interceptors";
import { OKResult } from "@/apis/utils/gql";
import { Divider, Empty, Loading } from "@taroify/core";
import { View } from "@tarojs/components";
import Taro, { usePullDownRefresh, useReachBottom } from "@tarojs/taro";
import { Dispatch, FC, PropsWithChildren, useEffect, useReducer, useRef, useState } from "react";
import "./index.scss";

interface useDataListProps {
  request: (params: Object) => Promise<ResponseData<any>> | Promise<OKResult<{ raw: unknown; }>>;
  params?: Object | undefined
}

interface pageParamType {
  offset: number
  limit: number
  flush: number
}

interface pageDispatch {
  INIT
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

  const [dataList, setDataList] = useState<any[]>([])
  const [status, setStatus] = useState<keyof statusType>('NORMAL')

  const pageReducer = (state: pageParamType, action: {
    type: keyof pageDispatch;
    payload?: pageParamType;
  }) => {
    switch (action.type) {
      case 'INIT':
        return {
          ...pageParamInit,
          flush: Math.random()
        }
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

  useEffect(() => {
    setStatus('LOADING')
    request({
      offset: pageParam.offset,
      limit: pageParam.limit,
      ...params
    })
      .then(({ data }: ResponseData<any> & OKResult<{ raw: unknown; }>) => {
        // 判断是否第一页
        if (pageParam.offset) {
          setDataList([...dataList, ...data.list])
          dataListRef.current = [...dataList, ...data.list]
        } else {
          setDataList(data.list)
          dataListRef.current = data.list
        }
        // 判断有没有更多
        if (!dataListRef.current.length) {
          setStatus('EMPTY')
        } else if (data.list.length < pageParam?.limit!) {
          setStatus('NOMORE')
        } else {
          setStatus('NORMAL')
        }
        Taro.stopPullDownRefresh()
      })
      .catch(error => {
        setStatus('ERROR')
        Taro.stopPullDownRefresh()
        console.log(error)
      })
  }, [pageParam.offset, pageParam.flush])

  return { dispatch, dataList, status }
}

interface DataListProps {
  status: keyof statusType
  dispatch: Dispatch<{
    type: keyof pageDispatch;
    payload?: pageParamType;
  }>;
}

export const DataList: FC<PropsWithChildren & DataListProps> = ({ status, dispatch, children }) => {
  usePullDownRefresh(() => {
    dispatch({ type: 'FLUSH' })
  })

  useReachBottom(() => {
    dispatch({ type: 'NEXT' })
  })

  return (
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
        {status === 'LOADING' && <Loading style={{ width: '100%' }} type="spinner" size="18px">加载中...</Loading>}
        {status === 'NOMORE' && (
          <Divider>
            <Divider.Text >没有更多了</Divider.Text>
          </Divider>
        )}
        {status === 'EMPTY' && (
          <Empty style={{ marginTop: '150px' }}>
            <Empty.Image />
            <Empty.Description>内容为空</Empty.Description>
          </Empty>
        )}
      </View>
    </View>
  )
}