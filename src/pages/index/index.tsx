/*
 * @Author: Chenxu
 * @Date: 2022-12-28 13:26:25
 * @LastEditTime: 2023-01-10 13:49:49
 * @Msg: Nothing
 */
import { getAllYanXi } from '@/apis/index'
import { DataList, useDataList } from '@/components/data-list'
import { useUserReduce } from '@/src/provider/user-provider'
import { View } from '@tarojs/components'
import { FC } from 'react'

import './index.scss'

const Index: FC = () => {

  useUserReduce()

  const { status, dataList, dispatch } = useDataList({ request: getAllYanXi, params: { hahah: 1, heiheih: 2 } })

  return (
    <View>
      <DataList status={status} dispatch={dispatch}>
        {dataList.map(item => (
          <View className='item-box'>
            id: {item.id}
            yxdm: {item.yxdm}
            name: {item.name}
          </View>
        ))}
      </DataList>
    </View>
  )
}

export default Index
