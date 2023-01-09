import { Image, Input, View } from '@tarojs/components'
import { FC, useState } from 'react'

import './index.scss'

const Login: FC = () => {

  const [userName, setUserName] = useState<string>('')
  const [passWord, setPassWord] = useState<string>('')
  const [showPass, setShowPass] = useState<boolean>(true)

  const loginHandle = () => {
    tt.login({
      success({ code }) {
        tt.getUserInfo({
          withCredentials: true,
          success({ userInfo }) {
            console.log(code, userInfo)
          },
          fail(res) {
            console.log(`getUserInfo fail: ${JSON.stringify(res)}`);
          }
        });
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
        <View className='form-item-box flex-row'>
          <Image className='form-item-icon' src={require('@/static/login/user.png')}></Image>
          <Input onInput={e => setUserName(e.detail.value)} type='text' placeholder='请输入账号' className='form-item' ></Input>
        </View>
        <View className='form-item-box flex-row'>
          <Image className='form-item-icon' src={require('@/static/login/password.png')}></Image>
          <Input onInput={e => setPassWord(e.detail.value)} password={showPass} type='text' placeholder='请输入密码' className='form-item' ></Input>
          <Image onClick={() => setShowPass(!showPass)} className='form-item-icon' src={require('@/static/login/eye.png')}></Image>
        </View>
      </View>

      <View onClick={loginHandle} className='login-btn flex-row items-center justify-center'>授权登录</View>

    </View>
  )
}

export default Login
