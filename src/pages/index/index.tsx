/*
 * @Author: Chenxu
 * @Date: 2022-12-28 13:26:25
 * @LastEditTime: 2023-01-09 16:59:07
 * @Msg: Nothing
 */
import { getAllYanXi } from '@/apis/index'
import { DataList, useDataList } from '@/components/data-list'
import { View } from '@tarojs/components'
import { FC } from 'react'

import './index.scss'

const Index: FC = () => {

  const { status, dataList, dispatch } = useDataList({ request: getAllYanXi, params: { hahah: 1, heiheih: 2 } })

  // useLoad(async () => {
  //   const { token } = await login({ account: 'root@flora.local', password: 'flora#23456' })
  // })

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
