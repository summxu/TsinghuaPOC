/*
 * @Author: Chenxu
 * @Date: 2022-12-28 16:00:04
 * @LastEditTime: 2022-12-29 16:45:43
 * @Msg: Nothing
 */

import { useUserReduce } from "@/src/provider/user-provider"
import { View } from "@tarojs/components"
import { useLoad } from "@tarojs/taro"
import { FC } from "react"

const Home: FC = () => {

  const { state: userInfo, dispatch } = useUserReduce()

  useLoad(() => {
    dispatch({
      type: 'FLUSH',
      payload: {
        username: 'summxu',
        userid: 123,
        avatar: '123',
      }
    })
    console.log(userInfo)
  })

  return <View>{userInfo.username}</View>
}

export default Home