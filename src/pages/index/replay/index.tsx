/*
 * @Author: Chenxu
 * @Date: 2023-01-10 16:46:40
 * @LastEditTime: 2023-01-12 17:44:46
 * @Msg: Nothing
 */
import { UserInfoCard } from '@/components/user-info-card'
import { Tabs } from '@taroify/core'
import { View, Image, Text } from '@tarojs/components'
import { FC } from 'react'
import { IndexDetail } from './detail'
import { IndexDocuments } from './documents'

import './index.scss'

const Replay: FC = () => {

  return (
    <View className='replay-page'>

      <View className='replay-top'>
        <View className='card-box'>
          <UserInfoCard />
        </View>
        <View className='top-card flex-row justify-between'>
          <View className='option-card option-card1 flex-row items-center'>
            <Image className='option-img' src={require('@/static/index/lunwen.png')}></Image>
            <Text className="option-text">论文查重</Text>
          </View>
          <View className='option-card option-card2 flex-row items-center'>
            <Image className='option-img' src={require('@/static/index/geshi.png')}></Image>
            <Text className="option-text">格式检查</Text>
          </View>
        </View>
      </View>

      <Tabs className='tabs-custom'>
        <Tabs.TabPane title="详情"><IndexDetail /></Tabs.TabPane>
        <Tabs.TabPane title="相关文档"><IndexDocuments /></Tabs.TabPane>
        <Tabs.TabPane title="答辩表"><IndexDocuments /></Tabs.TabPane>
      </Tabs>

    </View>
  )
}

export default Replay
