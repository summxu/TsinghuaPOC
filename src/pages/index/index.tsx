/*
 * @Author: Chenxu
 * @Date: 2022-12-28 13:26:25
 * @LastEditTime: 2023-01-12 17:46:25
 * @Msg: Nothing
 */
import { getAllYanXi } from '@/apis/index'
import { DataList, useDataList } from '@/components/data-list'
import { Search } from '@/components/search'
import { useUserReduce } from '@/src/provider/user-provider'
import { View, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { FC, useEffect, useMemo, useState } from 'react'

import './index.scss'

const Index: FC = () => {

  // 在index里初始化userInfo信息
  const { state: userInfo } = useUserReduce({ initLogin: true })
  useEffect(() => {
    if (JSON.stringify(userInfo) === '{}') {
      return
    }
    // 根据角色判断tabBarItems
    // if (userInfo.display_name) {
    //   tt.removeTabBarItem({ tag: 'pages/progress/index' })
    // } else {
    //   console.log('asdasd')
    //   tt.removeTabBarItem({ tag: 'pages/students/index' })
    // }
  }, [userInfo])

  const [searchValue, setSearch] = useState('')
  const params = useMemo(() => ({ searchValue }), [searchValue])

  const { status, dataList, dispatch } = useDataList({ request: getAllYanXi, params })
  return (
    <View className='index-page'>
      <View className='search-box'>
        <View className='mask-bottom flex-row justify-between'>
          <View className='left-horn'></View>
          <View className='right-horn'></View>
        </View>
        <Search onConfirm={value => setSearch(value)}></Search>
      </View>
      <View className='list-box'>
        <DataList status={status} dispatch={dispatch}>
          {dataList.map(({ data }) => (
            <View onClick={() => Taro.navigateTo({ url: '/pages/index/replay/index' })} className='item flex-row justify-between items-center'>
              <View className='item-left flex-row '>
                <Image className='item-avatar' src={require('@/static/avatar.png')}></Image>
                <View className="item-center flex-col justify-around">
                  <View className='item-title'>{data.name}</View>
                  <View className='item-desc'>{data.code}</View>
                </View>
              </View>
              <Button className='chat-btn' hoverClass='chat-btn-hover' size="mini">联系</Button>
            </View>
          ))}
        </DataList>
      </View>
    </View >
  )
}

export default Index
