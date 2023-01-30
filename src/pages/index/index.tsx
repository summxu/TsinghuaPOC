/*
 * @Author: Chenxu
 * @Date: 2022-12-28 13:26:25
 * @LastEditTime: 2023-01-30 13:10:54
 * @Msg: Nothing
 */
import { getAllYanXi } from '@/apis/index'
import { DataList, useDataList } from '@/components/data-list'
import { Search } from '@/components/search'
import { Button, Image, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { FC, useMemo, useState } from 'react'

import './index.scss'

const Index: FC = () => {

  const [searchValue, setSearch] = useState('')
  const params = useMemo(() => ({ searchValue }), [searchValue])

  const { status, dataList, dispatch } = useDataList({ request: getAllYanXi, params, isInit: true })
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
