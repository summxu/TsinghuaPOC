/*
 * @Author: Chenxu
 * @Date: 2022-12-28 13:26:25
 * @LastEditTime: 2023-02-13 09:37:34
 * @Msg: Nothing
 */
import { UserInfoCard } from '@/components/user-info-card'
import { Timeline } from '@taroify/core'
import { Text, View } from '@tarojs/components'
import { FC } from 'react'
import './index.scss'
const TimeLineData = [{
  text: '发放一卡通'
}, {
  text: '学生缴费'
}, {
  text: '档案收缴登记'
}, {
  text: '领取体检表'
}, {
  text: '缴纳教材费'
}, {
  text: '教务管理系统登记'
}, {
  text: '答辩'
}]

const Entrance: FC = () => {

  return (
    <View className='entrance-page'>
      <View className='entrance-top'>
        <View className='card-box'>
          <UserInfoCard />
        </View>
        <View className='top-card'>
          <Text className="title">入学详情</Text>
          <View className='top-info flex-row justify-between'>
            <View className='top-item flex-col items-center'>
              <Text className='info-top'>202315467</Text>
              <Text className='info-bottom'>学号</Text>
            </View>
            <View className='shu'></View>
            <View className='top-item flex-col items-center'>
              <Text className='info-top'>厚朴502</Text>
              <Text className='info-bottom'>宿舍号</Text>
            </View>
            <View className='shu'></View>
            <View className='top-item flex-col items-center'>
              <Text className='info-top'>日语2班</Text>
              <Text className='info-bottom'>班级</Text>
            </View>
          </View>
        </View>
        <View className='heng'></View>
      </View>

      <View className='container'>

        <Timeline>

          {TimeLineData.map((item, index) => (
            <Timeline.Item>
              <Timeline.Content className='timeline-left-1' align="start">
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

export default Entrance
