/*
 * @Author: Chenxu
 * @Date: 2023-01-12 13:24:44
 * @LastEditTime: 2023-01-12 15:28:43
 * @Msg: Nothing
 */

import { View } from "@tarojs/components";
import { CSSProperties, FC, useState } from "react";
import "./index.scss";

interface TimeLineProps {
  data: { text: string }[]
  active: number
}

export const TimeLine: FC<TimeLineProps> = ({ data, active }) => {

  const colorHandle = (index: number, isDot: boolean) => {
    let colorStr: CSSProperties = { background: "#DCDEE0" }

    if (index < active) {
      colorStr = { background: "#3370FF" }
    }

    if (index === active) {
      colorStr = { background: "#269949" }
    }

    if (index === 0 && !isDot) { colorStr = { backgroundImage: `linear-gradient(to right, #fff 50%, ${colorStr.background} 0);` } }
    if (index === data.length - 1 && !isDot) { colorStr = { backgroundImage: `linear-gradient(to right, ${colorStr.background} 50%, #fff 0);` } }

    return colorStr
  }

  return (
    <View className="timeline flex-row justify-between">
      {data.map((item, index) => (
        <View className="timeline-item flex-col items-center">
          <View style={colorHandle(index, false)} className="dot-box flex-col items-center">
            <View style={colorHandle(index, true)} className="dot"></View>
          </View>
          <View className="text">{item.text}</View>
        </View>
      ))}
    </View>
  )

}