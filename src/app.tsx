/*
 * @Author: Chenxu
 * @Date: 2022-12-28 13:26:25
 * @LastEditTime: 2022-12-29 16:46:03
 * @Msg: Nothing
 */
import { FC } from 'react'
import './app.scss'
import { UserProvider } from './provider/user-provider'

const App: FC = (props) => {

  return <UserProvider>
    {props.children}
  </UserProvider>
}

export default App
