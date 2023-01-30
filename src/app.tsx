/*
 * @Author: Chenxu
 * @Date: 2022-12-28 13:26:25
 * @LastEditTime: 2023-01-30 10:29:46
 * @Msg: Nothing
 */
import { useLaunch } from '@tarojs/taro'
import { FC, PropsWithChildren } from 'react'
import './app.scss'
import { UserProvider, useUserReduce } from './provider/user-provider'

const App: FC<PropsWithChildren> = (props) => {

  // 在index里初始化userInfo信息
  const { state: userInfo } = useUserReduce({ initLogin: true })

  useLaunch(() => {
    console.log('app on launch')
    // 这里请求学生信息
    if (JSON.stringify(userInfo) === '{}') {
      return
    }
    // if (userInfo.display_name) {
    //   tt.removeTabBarItem({ tag: 'pages/progress/index' })
    // } else {
    //   console.log('asdasd')
    //   tt.removeTabBarItem({ tag: 'pages/students/index' })
    // }
  })

  return <UserProvider>
    {props.children}
  </UserProvider>
}

export default App
