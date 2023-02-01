/*
 * @Author: Chenxu
 * @Date: 2023-01-12 13:24:44
 * @LastEditTime: 2023-02-01 17:31:26
 * @Msg: Nothing
 */

import { View } from "@tarojs/components";
import { CSSProperties, FC } from "react";
import "./index.scss";

interface TimeLineProps {
  data: {
    text: string
    time?: string
    topText?: string
  }[]
  active: number
}

export const TimeLine: FC<TimeLineProps> = ({ data, active }) => {

  active = active - 1

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
          {item.topText && <View className="top-text-timeline">{item.topText}</View>}
          <View style={colorHandle(index, false)} className="dot-box flex-col items-center">
            <View style={colorHandle(index, true)} className="dot"></View>
          </View>
          <View className={item.topText ? 'text-plus' : 'text'}>{item.text}</View>
          {item.time && <View className="time">{item.time}</View>}
        </View>
      ))}
    </View>
  )

}