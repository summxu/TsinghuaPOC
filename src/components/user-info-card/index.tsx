/*
 * @Author: Chenxu
 * @Date: 2023-01-12 15:36:09
 * @LastEditTime: 2023-02-01 17:26:07
 * @Msg: Nothing
 */
import { useUserReduce } from "@/src/provider/user-provider";
import { Image, Text, View } from "@tarojs/components";
import { FC } from "react";
import "./index.scss";

export const UserInfoCard: FC = () => {

  const { state: userInfo } = useUserReduce({ isRefresh: true })

  return (
    <View className="user-info-card">
      <View className="user-info-top flex-row items-center">
        <Image className='avatar-com' src={userInfo.avatar || require('@/static/avatar.png')}></Image>
        {userInfo.studentInfo && <Text className="name">{userInfo.studentInfo.name}</Text>}
        {userInfo.studentInfo && <View className="tag">{userInfo.studentInfo.pycc === '02' ? '博士' : '硕士'}</View>}
      </View>
      <View className="user-info-bottom flex-row items-center justify-between">
        <View className="bottom-item flex-col">
          <Text className="label">学院</Text>
          {userInfo.studentInfo && <Text className="value">{userInfo.studentInfo['yuanxi_id.name']}</Text>}
        </View>
        <View className="shu"></View>
        <View className="bottom-item flex-col items-end">
          <Text className="label">导师</Text>
          {userInfo.studentInfo && <Text className="value">{userInfo.studentInfo['dsxx_id.name']}</Text>}
        </View>
      </View>
    </View>
  )

}