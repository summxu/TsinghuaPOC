import { login } from '@/apis/index'
import { useUserReduce } from '@/src/provider/user-provider'
import { Button, Image, Input, View } from '@tarojs/components'
import { FC, useState } from 'react'

import './index.scss'

const Login: FC = () => {

  const [userName, setUserName] = useState<string>('')
  const [passWord, setPassWord] = useState<string>('')
  const [showPass, setShowPass] = useState<boolean>(true)

  const { loginInitHandle } = useUserReduce()

  // 自定义登录
  const loginHandle = () => {
    tt.login({
      async success({ code }) {
        try {
          const { token } = await login({
            code: userName,
            pwd: passWord,
            login_code: code
          })
          console.log(token)
          loginInitHandle(token)
        } catch (error) {
          console.log(error)
        }
      },
      fail(res) {
        console.log(`login fail: ${JSON.stringify(res)}`);
      }
    });
  }

  return (
    <View className='login-page'>
      <View className='top-box flex-col items-center'>
        <View className='login-text'>LOGIN</View>
        <Image className='login-image' src={require('@/static/login/login-image.png')}></Image>
        <View className='login-desc'>欢迎使用清华SIGS答辩助手</View>
      </View>

      <View className='form-box'>
        <View className='form-item-box flex-row items-center'>
          <Image className='form-item-icon' src={require('@/static/login/user.png')}></Image>
          <Input value='root@flora.local' onInput={e => setUserName(e.detail.value)} type='text' placeholder='请输入账号' className='form-item' ></Input>
        </View>
        <View className='form-item-box flex-row items-center'>
          <Image className='form-item-icon' src={require('@/static/login/password.png')}></Image>
          <Input value='flora#23456' onInput={e => setPassWord(e.detail.value)} password={showPass} type='text' placeholder='请输入密码' className='form-item' ></Input>
          {showPass ?
            <Image onClick={() => setShowPass(!showPass)} className='form-item-icon' src={require('@/static/login/eye.png')}></Image>
            :
            <Image onClick={() => setShowPass(!showPass)} style={{ height: '16px', marginTop: '3px' }} className='form-item-icon' src={require('@/static/login/eye1.png')}></Image>
          }
        </View>
      </View>

      <Button onClick={loginHandle} hoverClass="login-btn-hover" className='login-btn' plain type='primary'>授权登录</Button>

    </View>
  )
}

export default Login
