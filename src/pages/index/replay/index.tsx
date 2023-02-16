/*
 * @Author: Chenxu
 * @Date: 2023-01-10 16:46:40
 * @LastEditTime: 2023-02-16 13:52:55
 * @Msg: Nothing
 */
import { lwcc, userInfo } from '@/apis/index'
import { UserInfoCard } from '@/components/user-info-card'
import { useUserReduce } from '@/src/provider/user-provider'
import { Tabs } from '@taroify/core'
import { Image, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { FC } from 'react'
import { IndexDetail } from './detail'
import { IndexDocuments } from './documents'

import './index.scss'

const Replay: FC = () => {

  const { state: userInfo } = useUserReduce()

  const lwccHandle = async (type) => {
    if (userInfo.studentInfo?.filestateid || type === 2) {
      Taro.navigateTo({ url: '/pages/index/result/index' })
      return
    }
    Taro.showLoading({ title: '正在查询..' })
    try {
      await lwcc({ xh: userInfo.studentInfo!.code })
    } catch (error) {
      console.log(error)
    }
    Taro.showToast({icon: 'none', title: '查重结束，需要等待一段时间返回查重结果' })
  }

  return (
    <View className='replay-page'>

      <View className='replay-top'>
        <View className='card-box'>
          <UserInfoCard />
        </View>
        <View className='top-card flex-row justify-between'>
          <View onClick={lwccHandle} className='option-card option-card1 flex-row items-center'>
            <Image className='option-img' src={require('@/static/index/lunwen.png')}></Image>
            <Text className="option-text">论文查重</Text>
          </View>

          {/* <View onClick={() => {
            Taro.showToast({ title: '暂无对接', icon: 'error' })
          }} className='option-card option-card2 flex-row items-center'>
            <Image className='option-img' src={require('@/static/index/geshi.png')}></Image>
            <Text className="option-text">格式检查</Text>
          </View> */}

          <View onClick={() => lwccHandle(2)} className='option-card option-card2 flex-row items-center'>
            <Image className='option-img' src={require('@/static/index/geshi.png')}></Image>
            <Text className="option-text">查重结果</Text>
          </View>

        </View>
      </View>

      <Tabs lazyRender className='tabs-custom'>
        <Tabs.TabPane title="详情"><IndexDetail /></Tabs.TabPane>
        <Tabs.TabPane title="相关文档"><IndexDocuments lx={'1'} /></Tabs.TabPane>
        <Tabs.TabPane title="答辩表"><IndexDocuments lx={'2'} /></Tabs.TabPane>
      </Tabs>

    </View>
  )
}

export default Replay
