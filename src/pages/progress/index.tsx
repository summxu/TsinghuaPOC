/*
 * @Author: Chenxu
 * @Date: 2022-12-28 13:26:25
 * @LastEditTime: 2023-01-13 14:39:53
 * @Msg: Nothing
 */
import { UserInfoCard } from '@/components/user-info-card'
import { Timeline } from '@taroify/core'
import { Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { FC } from 'react'
import './index.scss'
const TimeLineData = [{
  text: '入学'
}, {
  text: '培养计划制定'
}, {
  text: '培养计划完成'
}, {
  text: '开题'
}, {
  text: '中期'
}, {
  text: '学术活动'
}, {
  text: '答辩'
}]

const Progress: FC = () => {
  const goToPage = (index: number) => {
    if (index === 0) {
      Taro.navigateTo({ url: '/pages/progress/entrance/index' })
    }
    if (index === 1) {
      Taro.navigateTo({ url: '/pages/progress/plan/index' })
    }
  }
  return (
    <View className='replay-page'>
      <View className='replay-top'>
        <View className='card-box'>
          <UserInfoCard />
        </View>
        <View className='top-card'>
          <Text className="title">我的培养</Text>
        </View>
      </View>

      <View className='container'>

        <Timeline>

          {TimeLineData.map((item, index) => (
            <Timeline.Item>
              <Timeline.Content className='timeline-left' align="start">
                <View className='date'>03-02</View>
                <View className='year'>2012</View>
              </Timeline.Content>
              <Timeline.Content className='timeline-right' direction="column" align="start">
                <View className="timeline-title">{item.text}</View>
                <Text onClick={() => goToPage(index)} className='more'>更多</Text>
              </Timeline.Content>
              <Timeline.Separator>
                <Timeline.Dot color="danger"></Timeline.Dot>
                {index < TimeLineData.length - 1 && <Timeline.Connector />}
              </Timeline.Separator>
            </Timeline.Item>
          ))}

        </Timeline>

      </View>
    </View>

  )
}

export default Progress
