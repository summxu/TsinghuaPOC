/*
 * @Author: Chenxu
 * @Date: 2023-01-12 16:24:10
 * @LastEditTime: 2023-02-02 09:18:33
 * @Msg: Nothing
 */

import { booking, getStudentInfo, getWyhcyList, setYYY } from "@/apis/index";
import { useUserReduce } from "@/src/provider/user-provider";
import { Calendar, Empty, Popup } from "@taroify/core";
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import "./index.scss";

const SF_TYPE = {
  "1": "主席",
  "2": "成员",
  "3": "秘书"
}

export const IndexDetail: FC = () => {

  const { state: userInfo, flushUserInfoDetail } = useUserReduce()
  const [wyhList, setWyhList] = useState<{
    data: any;
    allow_record_tags: string[];
  }[]>([])

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<Date[]>([])

  const getWyhcyListHandle = async () => {
    try {
      if (userInfo.studentInfo) {
        const { result } = await getWyhcyList(userInfo.studentInfo.id)
        setWyhList(result.items)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getWyhcyListHandle()
  }, [userInfo])

  const bookingHandle = async (timeRange) => {
    try {
      await booking({
        topic: `预约会议${moment(timeRange[0]).format('MM-DD')}-${moment(timeRange[1]).format('MM-DD')}`,
        startTime: moment(timeRange[0]).format('YYYY-MM-DD HH:mm:ss'),
        endTime: moment(timeRange[1]).format('YYYY-MM-DD HH:mm:ss'),
        open_id: userInfo.fsopen_id,
        xh: String(userInfo.studentInfo?.code)
      })
      Taro.showToast({ icon: 'success', title: '预约成功' })
      // await setYYY(userInfo.stuid!)
      flushUserInfoDetail(userInfo.studentInfo?.id!, 'studentInfo')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View className="index-detail">

      <Popup style={{ height: "80%" }} open={open} rounded placement="bottom" onClose={setOpen}>
        <Calendar
          style={{ "--calendar-active-color": "#2039D4" }}
          type="range"
          value={value}
          onChange={setValue}
          onConfirm={(newValue) => {
            bookingHandle(newValue)
            setOpen(false)
          }}
        >
          <Calendar.Footer>
            <Calendar.Button type="confirm">确定</Calendar.Button>
          </Calendar.Footer>
        </Calendar>
      </Popup>

      <View className="title">答辩时间</View>
      <View className="minicard flex-row justify-between items-center">
        {userInfo.studentInfo && <Text className="mini-left">答辩时间：{userInfo.studentInfo.dbsj}</Text>}
        {
          userInfo.studentInfo && (userInfo.studentInfo.sfyyhy === '0' ?
            <Text onClick={() => setOpen(true)} className="mini-right">预约会议</Text> :
            <Text className="mini-right ">已预约</Text>)
        }
      </View>
      <View className="title">委员会成员</View>

      {wyhList.length ?
        wyhList.map(item => (
          <View className="mumber-items">
            <View className="item-top flex-row items-center">
              <Text className="munber-name">{item.data['teacher_id.name']}</Text>
              <View className="mumber-tag">{SF_TYPE[item.data['sf']]}</View>
            </View>
            <Text className="mumber-desc">{item.data['teacher_id.zhicheng']} | {item.data['teacher_id.yuanxi_id.name']}</Text>
          </View>
        )) :
        <Empty >
          <Empty.Image style={{ width: '107px', height: '70px' }} src={require('@/static/empty.png')} />
          <Empty.Description>内容为空</Empty.Description>
        </Empty>
      }

    </View>
  )

}