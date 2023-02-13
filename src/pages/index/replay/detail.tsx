/*
 * @Author: Chenxu
 * @Date: 2023-01-12 16:24:10
 * @LastEditTime: 2023-02-13 10:32:20
 * @Msg: Nothing
 */

import { booking, getWyhcyList } from "@/apis/index";
import { useUserReduce } from "@/src/provider/user-provider";
import { DatetimePicker, Empty, Popup } from "@taroify/core";
import { Button, Text, View } from "@tarojs/components";
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

  const [open, setOpen] = useState<boolean[]>([false, false])
  const [value, setValue] = useState<Date[]>([])
  const newDateTime = new Date()

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

  const bookingHandle = async () => {
    Taro.showLoading({ title: '正在预约..', mask: true })
    const timeRange = value
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
      Taro.showToast({ icon: 'success', title: '预约失败' })
      console.log(error)
    }
  }

  return (
    <View className="index-detail">

      {/* 开始时间弹窗 */}
      <Popup open={open[0]} rounded placement="bottom" onClose={() => setOpen([false, false])}>
        <DatetimePicker
          type="datetime"
          defaultValue={newDateTime}
          value={value[0]}
          onChange={e => setValue([e])}
        >
          <DatetimePicker.Toolbar>
            <DatetimePicker.Button onClick={() => setOpen([false, false])}>取消</DatetimePicker.Button>
            <DatetimePicker.Title>选择开始时间</DatetimePicker.Title>
            <DatetimePicker.Button onClick={() => {
              if (!value[0]) { setValue([newDateTime]) }
              setOpen([false, true])
            }}>确认</DatetimePicker.Button>
          </DatetimePicker.Toolbar>
        </DatetimePicker>
      </Popup>

      {/* 结束时间弹窗 */}
      <Popup open={open[1]} rounded placement="bottom" onClose={() => setOpen([false, false])}>
        {value[0] && <DatetimePicker
          type="datetime"
          defaultValue={value[0]}
          value={value[1]}
          min={value[0]}
          onChange={e => setValue([...value, e])}
        >
          <DatetimePicker.Toolbar>
            <DatetimePicker.Button onClick={() => setOpen([false, false])}>取消</DatetimePicker.Button>
            <DatetimePicker.Title>选择结束时间</DatetimePicker.Title>
            <DatetimePicker.Button onClick={() => {
              bookingHandle()
              setOpen([false, false])
            }}>确认</DatetimePicker.Button>
          </DatetimePicker.Toolbar>
        </DatetimePicker>}
      </Popup>

      <View className="title">答辩时间</View>
      <View className="minicard flex-row justify-between items-center">
        {<Text className="mini-left">答辩时间：{userInfo.studentInfo?.dbsj}</Text>}
        {
          userInfo.studentInfo?.sfyyhy === '0' ?
            (userInfo.role === 'teacher' ? <Button onClick={() => setOpen([true, false])} className="mini-right">预约会议</Button> :
            <Text style={{color:'#7F7F7F'}} className="mini-right ">未预约</Text>) :
            <Text className="mini-right ">已预约</Text>
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