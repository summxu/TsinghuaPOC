/*
 * @Author: Chenxu
 * @Date: 2022-12-28 13:26:25
 * @LastEditTime: 2022-12-30 17:39:30
 * @Msg: Nothing
 */
import { testPage } from '@/apis/index'
import { DataList, useDataList } from '@/components/data-list'
import { View } from '@tarojs/components'
import { FC, PropsWithChildren } from 'react'

import './index.scss'

const Index: FC<PropsWithChildren> = () => {

  const { status, dataList, dispatch } = useDataList({ request: testPage, params: { hahah: 1, heiheih: 2 } })

  return (
    <View>
      <DataList status={status} dispatch={dispatch}>
        {dataList.map(item => (
          <View className='item-box'>
            name: {item.name}
            sex: {item.sex}
            age: {item.age}
          </View>
        ))}
      </DataList>
    </View>
  )
}

export default Index
