/*
 * @Author: Chenxu
 * @Date: 2022-12-28 13:26:25
 * @LastEditTime: 2023-01-13 10:19:33
 * @Msg: Nothing
 */
import { UserInfoCard } from '@/components/user-info-card'
import { Timeline } from '@taroify/core'
import { FireOutlined, StarOutlined, GemOutlined, SmileOutlined } from '@taroify/icons'
import { View, Text } from '@tarojs/components'
import { FC } from 'react'
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
import './index.scss'

const Progress: FC = () => {

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
                <Text className='more'>更多</Text>
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
