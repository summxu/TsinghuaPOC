/*
 * @Author: Chenxu
 * @Date: 2022-12-28 13:26:25
 * @LastEditTime: 2023-02-07 11:26:05
 * @Msg: Nothing
 */
import { useUserReduce } from '@/src/provider/user-provider'
import { Button, Image, Text, View } from '@tarojs/components'
import { FC } from 'react'

import './index.scss'

const Mine: FC = () => {

  const { state: userInfo, logoutHandle } = useUserReduce({ isRefresh: true })

  return (
    <View className='mine-page'>

      <View className='mine-top flex-col items-center '>
        <View className='avatar-box flex-row items-center justify-center'>
          <Image className='avatar' src={userInfo.avatar || require('@/static/avatar.png')}></Image>
        </View>
        <View className='top-text flex-row items-center'>
          <Text className="name-mine">{userInfo.name}</Text>
          <View className='shu'></View>
          {userInfo.role === 'student' && <Text className="role-label">{userInfo.studentInfo?.pycc === '02' ? '博士' : '硕士'}</Text>}
          {userInfo.role === 'teacher' && <Text className="role-label">{userInfo.teacherInfo?.zhicheng}</Text>}
        </View>
      </View>

      <View className='mine-bottom'>
        <View className='item-box'>
          <View className='item-label'>账号</View>
          <Text className='item-value'>{userInfo.user_name}</Text>
        </View>
        {
          userInfo.teacherInfo && userInfo.role === 'teacher' && <View className='item-box'>
            <View className='item-label'>电子邮箱</View>
            <Text className='item-value'>{userInfo.email}</Text>
          </View>
        }
        {
          userInfo.studentInfo && userInfo.role === 'student' && <View className='item-box'>
            <View className='item-label'>身份证号</View>
            <Text className='item-value'>{userInfo.studentInfo.sfzh}</Text>
          </View>
        }

        <Button onClick={logoutHandle} hoverClass="logout-btn-hover" className='logout-btn' plain type='primary'>退出登录</Button>

      </View>
    </View>
  )
}

export default Mine
