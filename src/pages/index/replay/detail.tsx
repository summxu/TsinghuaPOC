/*
 * @Author: Chenxu
 * @Date: 2023-01-12 16:24:10
 * @LastEditTime: 2023-01-31 10:22:14
 * @Msg: Nothing
 */

import { getStudentInfo, getWyhcyList } from "@/apis/index";
import { useUserReduce } from "@/src/provider/user-provider";
import { Empty } from "@taroify/core";
import { View, Text } from "@tarojs/components";
import { FC, useEffect, useState } from "react";
import "./index.scss";

const SF_TYPE = {
  "1": "主席",
  "2": "成员",
  "3": "秘书"
}

export const IndexDetail: FC = () => {

  const { state: userInfo } = useUserReduce()
  const [studentInfo, setStudentInfo] = useState<any>({})
  const [wyhList, setWyhList] = useState<{
    data: any;
    allow_record_tags: string[];
  }[]>([])

  const getReplayInfo = async () => {
    try {
      if (userInfo.stuid) {
        const { result } = await getStudentInfo(userInfo.stuid)
        setStudentInfo(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getWyhcyListHandle = async () => {
    try {
      if (userInfo.stuid) {
        const { result } = await getWyhcyList(userInfo.stuid)
        setWyhList(result.items)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getReplayInfo()
    getWyhcyListHandle()
  }, [userInfo])

  return (
    <View className="index-detail">
      <View className="title">答辩时间</View>
      <View className="minicard flex-row justify-between items-center">
        <Text className="mini-left">答辩时间：{studentInfo.dbsj}</Text>
        {
          studentInfo.sfyyhy === '0' ?
            <Text className="mini-right">预约会议</Text> :
            <Text className="mini-right mini-right-over">已预约</Text>
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