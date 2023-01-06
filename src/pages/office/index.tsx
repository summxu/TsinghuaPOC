/*
 * @Author: Chenxu
 * @Date: 2022-12-28 13:26:25
 * @LastEditTime: 2023-01-06 09:59:39
 * @Msg: Nothing
 */
import { getAllYX, testGraphQL } from '@/apis/index'
import { useDataList } from '@/components/data-list'
import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { FC, PropsWithChildren } from 'react'

import './index.scss'

const Office: FC<PropsWithChildren> = () => {
  // const { dataList } = useDataList({ request: getAllYX })
  // const getAllYXHandle = async () => {
  //   const res = await testGraphQL()
  //   console.log(res)
  //   // console.log(result)
  // }
  // useLoad(() => {
  //   getAllYXHandle()
  // })
  return <View>Office</View>
}

export default Office
