/*
 * @Author: Chenxu
 * @Date: 2023-01-12 15:36:09
 * @LastEditTime: 2023-01-30 14:14:43
 * @Msg: Nothing
 */
import { stdentInfo } from "@/apis/index";
import { useUserReduce } from "@/src/provider/user-provider";
import { View, Image, Text } from "@tarojs/components";
import { FC, useEffect, useState } from "react";
import "./index.scss";

export const UserInfoCard: FC = () => {

  const { state: userInfo } = useUserReduce({ isRefresh: true })
  const [studentInfo, setStudentInfo] = useState({})

  const getStdentInfo = async () => {
    try {
      if (userInfo.stuid) {
        const { result } = await stdentInfo(userInfo.stuid)
        setStudentInfo(result)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getStdentInfo()
  }, [userInfo])

  return (
    <View className="user-info-card">
      <View className="user-info-top flex-row items-center">
        <Image className='avatar-com' src={userInfo.avatar || require('@/static/avatar.png')}></Image>
        <Text className="name">{userInfo.name}</Text>
        <View className="tag">{userInfo.pycc === '02' ? '博士' : '硕士'}</View>
      </View>
      <View className="user-info-bottom flex-row items-center justify-between">
        <View className="bottom-item flex-col">
          <Text className="label">学院</Text>
          <Text className="value">生物医药研究中心</Text>
        </View>
        <View className="shu"></View>
        <View className="bottom-item flex-col items-end">
          <Text className="label">导师</Text>
          <Text className="value">王博</Text>
        </View>
      </View>
    </View>
  )

}