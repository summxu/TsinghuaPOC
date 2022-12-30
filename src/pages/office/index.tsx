/*
 * @Author: Chenxu
 * @Date: 2022-12-28 13:26:25
 * @LastEditTime: 2022-12-30 17:09:31
 * @Msg: Nothing
 */
import { testGraphQL } from '@/apis/index'
import { useDataList } from '@/components/data-list'
import { View } from '@tarojs/components'
import { FC, PropsWithChildren } from 'react'

import './index.scss'

const Office: FC<PropsWithChildren> = () => {
  const { dataList } = useDataList({ request: testGraphQL })
  return <View>Office</View>
}

export default Office
