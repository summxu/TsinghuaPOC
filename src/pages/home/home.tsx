/*
 * @Author: Chenxu
 * @Date: 2022-12-28 16:00:04
 * @LastEditTime: 2022-12-28 17:33:16
 * @Msg: Nothing
 */

import { View } from "@tarojs/components"
import Taro from "@tarojs/taro"
import { useLoad } from "@tarojs/taro"
import { FC } from "react"

const Home: FC = () => {

  useLoad(() => {
    console.log(123123)
    setTimeout(() => {

      // Taro.showToast({
      //   title: '成功',
      //   icon: 'success',
      //   duration: 2000
      // })

      tt.enterChat({
        openChatId: 'oc_1965ed81fc91d3b73d68c4ca4cfc110a',
        success(res) {
          console.log(JSON.stringify(res));
        },
        fail(res) {
          console.log(`enterChat fail:${JSON.stringify(res)}`);
        }
      });

    }, 2000);
  })

  return <View>哈哈哈哈</View>
}

export default Home