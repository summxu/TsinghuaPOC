/*
 * @Author: Chenxu
 * @Date: 2022-12-28 13:26:25
 * @LastEditTime: 2023-01-06 10:03:53
 * @Msg: Nothing
 */
import { getAllYX } from '@/apis/index'
import { DataList, useDataList } from '@/components/data-list'
import { View } from '@tarojs/components'
import { FC, PropsWithChildren } from 'react'

import './index.scss'

const Index: FC<PropsWithChildren> = () => {

  const { status, dataList, dispatch } = useDataList({ request: getAllYX, params: { hahah: 1, heiheih: 2 } })

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
