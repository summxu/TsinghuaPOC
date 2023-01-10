/*
 * @Author: Chenxu
 * @Date: 2022-12-28 13:26:25
 * @LastEditTime: 2023-01-10 16:35:44
 * @Msg: Nothing
 */
import { getAllYanXi } from '@/apis/index'
import { DataList, useDataList } from '@/components/data-list'
import { useUserReduce } from '@/src/provider/user-provider'
import { View } from '@tarojs/components'
import { FC, useEffect } from 'react'

import './index.scss'

const Index: FC = () => {

  // 在index里初始化userInfo信息
  const { state: userInfo } = useUserReduce({ isRefresh: true })
  useEffect(() => {
    if(JSON.stringify(userInfo) === '{}') {
      return
    }
    // 根据角色判断tabBarItems
    if (userInfo.display_name) {
      tt.removeTabBarItem({ tag: 'pages/progress/index' })
    } else {
      tt.removeTabBarItem({ tag: 'pages/students/index' })
    }
  }, [userInfo])


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
