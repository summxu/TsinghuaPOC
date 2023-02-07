/*
 * @Author: Chenxu
 * @Date: 2022-12-28 13:26:25
 * @LastEditTime: 2023-02-07 11:16:32
 * @Msg: Nothing
 */
import { getXxjd } from '@/apis/index'
import { UserInfoCard } from '@/components/user-info-card'
import { useUserReduce } from '@/src/provider/user-provider'
import { Timeline } from '@taroify/core'
import { Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import moment from 'moment'
import { FC, useEffect, useState } from 'react'
import './index.scss'

const wcztOption = {
  "0": "primary",
  "1": "success",
  "-1": "danger"
}

const Progress: FC = () => {

  const { state: userInfo } = useUserReduce()
  const [TimeLineData, setTimeLineData] = useState<{
    data: {
      wcsj: string;
      xuhao: string;
      name: string;
      wczt: string;
    }
  }[]>([])

  const goToPage = (index: number) => {
    if (index === 0) {
      Taro.navigateTo({ url: '/pages/progress/entrance/index' })
    }
    if (index === 1) {
      Taro.navigateTo({ url: '/pages/progress/plan/index' })
    }
    if (index === 2) {
      Taro.navigateTo({ url: '/pages/progress/planover/index' })
    }
  }

  const getXxjdHandle = async () => {
    try {
      if (userInfo.studentInfo) {
        const { result } = await getXxjd(userInfo.studentInfo?.id)
        setTimeLineData(result.items.sort((a, b) => Number(a.data.xuhao) - Number(b.data.xuhao)))
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getXxjdHandle()
  }, [userInfo.studentInfo])


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
                {item.data.wcsj && <View className='date'>{moment(item.data.wcsj).format('MM-DD')}</View>}
                {item.data.wcsj && <View className='year'>{moment(item.data.wcsj).format('YYYY')}</View>}
              </Timeline.Content>
              <Timeline.Content className='timeline-right' direction="column" align="start">
                <View className="timeline-title">{item.data.name}</View>
                {index < 3 && <Text onClick={() => goToPage(index)} className='more'>更多</Text>}
              </Timeline.Content>
              <Timeline.Separator>
                <Timeline.Dot color={wcztOption[item.data.wczt]}></Timeline.Dot>
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
