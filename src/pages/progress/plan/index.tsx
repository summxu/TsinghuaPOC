/*
 * @Author: Chenxu
 * @Date: 2022-12-28 13:26:25
 * @LastEditTime: 2023-01-13 15:18:43
 * @Msg: Nothing
 */
import { TimeLine } from '@/components/time-line'
import { UserInfoCard } from '@/components/user-info-card'
import { Text, View } from '@tarojs/components'
import { FC } from 'react'
import './index.scss'
const TimeLineData = [{
  text: '任珂',
  topText: '提交申请',
  time: '2022-03-12 22:10:00'
}, {
  text: '肖妮',
  topText: '导师未审核',
  time: '2022-03-28 22:10:00'
}, {
  text: '融亦鸣',
  topText: '培养单位未审核',
}]

const Plan: FC = () => {

  return (
    <View className='plan-page'>
      <View className='plan-top'>
        <View className='card-box'>
          <UserInfoCard />
        </View>
        <View className='top-card'>
          <Text className="title">培养计划审核进度</Text>
          <View className="timeline-box">
            <TimeLine data={TimeLineData} active={3}></TimeLine>
          </View>
        </View>
      </View>

      <View className='container'>
        <View className='title1 flex-row justify-between items-center'>
          <Text className="title ">培养计划制定情况</Text>
          <Text className='more'>共18项</Text>
        </View>

        <View className='item'>
          <Text className='item-title'>自然辩证法概论</Text>
          <View className='tag-box flex-row'>
            <View className='tag'>GEIP4002</View>
            <View className='tag'>学位课</View>
          </View>
          <View className='item-bottom flex-row'>
            <View style={{ minWidth: '84px' }}>
              <Text className='item-bottom-text'>学分：</Text>
              <Text className='item-bottom-sorc'>2</Text>
            </View>
            <View style={{ minWidth: '84px' }}>
              <Text className='item-bottom-text'>学分：</Text>
              <Text className='item-bottom-sorc'>2</Text>
            </View>
            <View>
              <Text className='item-bottom-text'>学期：秋季学期</Text>
            </View>
          </View>
        </View>

      </View>
    </View>

  )
}

export default Plan
