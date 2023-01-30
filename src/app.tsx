/*
 * @Author: Chenxu
 * @Date: 2022-12-28 13:26:25
 * @LastEditTime: 2023-01-30 14:45:50
 * @Msg: Nothing
 */
import { useLaunch } from '@tarojs/taro'
import { FC, PropsWithChildren } from 'react'
import './app.scss'
import { UserProvider, useUserReduce } from './provider/user-provider'

const App: FC<PropsWithChildren> = (props) => {

  const { InitLogin } = useUserReduce()

  useLaunch(() => {
    console.log('app on launch')
    InitLogin()
  })

  return <UserProvider>
    {props.children}
  </UserProvider>
}

export default App
