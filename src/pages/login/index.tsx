import { feishuOpenIDLogin, login, loginBase } from '@/apis/index'
import { Button, Image, Input, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { FC, useState } from 'react'

import './index.scss'

const Login: FC = () => {

  const [userName, setUserName] = useState<string>('root@flora.local')
  const [passWord, setPassWord] = useState<string>('flora#23456')
  const [showPass, setShowPass] = useState<boolean>(true)

  // 统一登录后的操作
  const loginAfterHandle = async (token: string) => {
    Taro.setStorageSync('Authorization', token)
    Taro.switchTab({ url: '/pages/index/index' })
  }

  // 自定义登录
  const loginHandle = async (code: string) => {
    try {
      // const { token } = await login({
      //   code: '1234',
      //   name: '张三',
      //   login_code: code
      // })
      const { token } = await loginBase({ account: 'root@flora.local', password: 'flora#23456' })
      loginAfterHandle(token)
    } catch (error) {
      console.log(error)
    }
  }

  // 飞书登录
  const feishuLoginHandle = async (code: string) => {
    try {
      await feishuOpenIDLogin({ code })
    } catch (error) {
      console.log(error)
    }
  }

  const getUserInfoHandle = () => {
    tt.login({
      success({ code }) {
        console.log(code)
        tt.getUserInfo({
          withCredentials: true,
          success(res) {
            console.log(res)
            // feishuLoginHandle(code)
            loginHandle(code)
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
        <View className='form-item-box flex-row items-center'>
          <Image className='form-item-icon' src={require('@/static/login/user.png')}></Image>
          <Input onInput={e => setUserName(e.detail.value)} type='text' placeholder='请输入账号' className='form-item' ></Input>
        </View>
        <View className='form-item-box flex-row items-center'>
          <Image className='form-item-icon' src={require('@/static/login/password.png')}></Image>
          <Input onInput={e => setPassWord(e.detail.value)} password={showPass} type='text' placeholder='请输入密码' className='form-item' ></Input>
          {showPass ?
            <Image onClick={() => setShowPass(!showPass)} className='form-item-icon' src={require('@/static/login/eye.png')}></Image>
            :
            <Image onClick={() => setShowPass(!showPass)} style={{ height: '16px', marginTop: '3px' }} className='form-item-icon' src={require('@/static/login/eye1.png')}></Image>
          }
        </View>
      </View>

      <Button onClick={getUserInfoHandle} hoverClass="login-btn-hover" className='login-btn' plain type='primary'>授权登录</Button>

    </View>
  )
}

export default Login
