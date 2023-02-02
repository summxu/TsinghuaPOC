import { View } from "@tarojs/components"
import Taro from "@tarojs/taro"
/*
 * @Author: Chenxu
 * @Date: 2023-01-13 13:10:01
 * @LastEditTime: 2023-02-02 09:53:43
 * @Msg: Nothing
 */
import { FC, useLayoutEffect, useState } from "react"

const SafeArea: FC = () => {
  const [safeHeight, setSafeHeight] = useState(0)
  useLayoutEffect(() => {
    Taro.getSystemInfo().then(({ safeArea, screenHeight }) => {
      const { bottom } = safeArea!
      setSafeHeight(screenHeight - bottom)
    })
  }, [])
  return (
    <View style={{ height: safeHeight, background: 'inherit' }}></View>
  )
}
export default SafeArea