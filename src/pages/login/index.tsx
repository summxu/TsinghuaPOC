import { View, Image, Input } from '@tarojs/components'
import { FC, PropsWithChildren } from 'react'

import './index.scss'

const Login: FC<PropsWithChildren> = () => {

  return (
    <View className='login-page'>
      <View className='top-box flex-col items-center'>
        <View className='login-text'>LOGIN</View>
        <Image className='login-image' src={require('@/static/login/login-image.png')}></Image>
        <View className='login-desc'>欢迎使用清华SIGS答辩助手</View>
      </View>

      <View className='form-box'>
        <View className='form-item-box'>
          <Input type='text' placeholder='将会获取焦点' className='form-item' ></Input>
        </View>
      </View>

    </View>
  )
}

export default Login
