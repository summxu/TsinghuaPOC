/*
 * @Author: Chenxu
 * @Date: 2022-12-28 13:26:25
 * @LastEditTime: 2022-12-29 16:04:06
 * @Msg: Nothing
 */
import { FC, PropsWithChildren } from 'react'
import './app.scss'
import { UserProvider } from './utils/user-provider'

const App: FC<PropsWithChildren> = (props) => {

  return <UserProvider>
    {props.children}
  </UserProvider>
}

export default App
