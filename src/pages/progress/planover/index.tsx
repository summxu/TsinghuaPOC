/*
 * @Author: Chenxu
 * @Date: 2022-12-28 13:26:25
 * @LastEditTime: 2023-01-13 15:29:34
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

const PlanOver: FC = () => {

  return (
    <View className='planover-page'>
      <View className='planover-top'>
        <View className='card-box'>
          <UserInfoCard />
        </View>
        <View className='top-card'>
          <Text className="title">培养计划完成情况</Text>
        </View>
      </View>

      <View className='container'>

        <View className='item'>
          <View className='status-tag'>已完成</View>

          <Text className='item-title'>自然辩证法概论</Text>
          <View className='tag-box flex-row'>
            <View className='tag'>GEIP4002</View>
            <View className='tag'>学位课</View>
          </View>
          <View className='item-bottom '>
            成绩：A+
          </View>
        </View>

      </View>
    </View>

  )
}

export default PlanOver
