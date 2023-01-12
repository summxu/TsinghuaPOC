/*
 * @Author: Chenxu
 * @Date: 2023-01-12 16:24:10
 * @LastEditTime: 2023-01-12 17:24:52
 * @Msg: Nothing
 */

import { View, Text } from "@tarojs/components";
import { FC } from "react";
import "./index.scss";



export const IndexDetail: FC = () => {

  return (
    <View className="index-detail">
      <View className="title">答辩时间</View>
      <View className="minicard flex-row justify-between items-center">
        <Text className="mini-left">答辩时间：2022-02-12  14:00</Text>
        <Text className="mini-right">预约会议</Text>
      </View>
      <View className="title">委员会成员</View>

      <View className="mumber-items">
        <View className="item-top flex-row items-center">
          <Text className="munber-name">刘华</Text>
          <View className="mumber-tag">答辩主席</View>
        </View>
        <Text className="mumber-desc">正高 | 清华大学深圳国际研究生院</Text>
      </View>
    </View>
  )

}