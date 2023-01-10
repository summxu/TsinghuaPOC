/*
 * @Author: Chenxu
 * @Date: 2022-12-28 13:26:25
 * @LastEditTime: 2023-01-10 14:32:45
 * @Msg: Nothing
 */
import { useUserReduce } from '@/src/provider/user-provider'
import { View, Image, Text, Button } from '@tarojs/components'
import { FC } from 'react'

import './index.scss'

const Mine: FC = () => {

  const { state: userInfo, logoutHandle } = useUserReduce()

  return (
    <View className='mine-page'>

      <View className='mine-top flex-col items-center '>
        <View className='avatar-box flex-row items-center justify-center'>
          <Image className='avatar' src={userInfo.avatar || require('@/static/avatar.png')}></Image>
        </View>
        <View className='top-text flex-row items-center'>
          <Text className="name">{userInfo.name}</Text>
          <View className='shu'></View>
          <Text className="role-label">{userInfo.nickname}</Text>
        </View>
      </View>

      <View className='mine-bottom'>
        <View className='item-box'>
          <View className='item-label'>账号</View>
          <Text className='item-value'>{userInfo.email}</Text>
        </View>
        <View className='item-box'>
          <View className='item-label'>身份证号</View>
          <Text className='item-value'>{userInfo.display_name}</Text>
        </View>

        <Button onClick={logoutHandle} hoverClass="logout-btn-hover" className='logout-btn' plain type='primary'>退出登录</Button>

      </View>
    </View>
  )
}

export default Mine
