/*
 * @Author: Chenxu
 * @Date: 2023-01-10 16:46:40
 * @LastEditTime: 2023-01-31 14:52:48
 * @Msg: Nothing
 */
import { UserInfoCard } from '@/components/user-info-card'
import { Tabs } from '@taroify/core'
import { View, Image, Text } from '@tarojs/components'
import { FC, useState } from 'react'
import { IndexDetail } from './detail'
import { IndexDocuments } from './documents'

import './index.scss'

const Replay: FC = () => {

  const [key, setKey] = useState(0)

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

      <Tabs lazyRender onChange={(value) => setKey(value)} className='tabs-custom'>
        <Tabs.TabPane title="详情"><IndexDetail /></Tabs.TabPane>
        <Tabs.TabPane title="相关文档"><IndexDocuments lx={'1'} /></Tabs.TabPane>
        <Tabs.TabPane title="答辩表"><IndexDocuments lx={'2'} /></Tabs.TabPane>
      </Tabs>

    </View>
  )
}

export default Replay
