/*
 * @Author: Chenxu
 * @Date: 2022-12-28 13:26:25
 * @LastEditTime: 2023-02-14 15:51:37
 * @Msg: Nothing
 */
import { getStuByTec } from '@/apis/index'
import { DataList, useDataList } from '@/components/data-list'
import { OpenEmail } from '@/components/open-email'
import { Search } from '@/components/search'
import { useUserReduce } from '@/src/provider/user-provider'
import { Button, Image, View } from '@tarojs/components'
import Taro from '@tarojs/taro'

import { FC, useMemo, useState } from 'react'

import './index.scss'

const Index: FC = () => {

  const [searchValue, setSearch] = useState('')
  const { state: userInfo, flushUserInfoDetail } = useUserReduce({ isRefresh: true })
  const [openEmail, setOpenEmail] = useState('')

  const params = useMemo(() => {
    const tecid = () => {
      if (userInfo.teacherInfo?.zhicheng !== '教秘' && userInfo.teacherInfo?.zhicheng !== '超管') {
        return userInfo.teacherInfo?.id
      }
    }
    const yuanxiidName = () => {
      if (userInfo.teacherInfo?.zhicheng === '教秘') {
        return userInfo.teacherInfo?.['yuanxi_id.name']
      }
    }
    return {
      searchValue,
      tecid: tecid(),
      yuanxiidName: yuanxiidName(),
      gyxxjd: 7
    }
  }, [searchValue, userInfo.teacherInfo])

  const { status, dataList, dispatch } = useDataList({ request: getStuByTec, params, isInit: true })

  return (
    <View className='index-page'>

      <OpenEmail openEmail={openEmail} onClose={() => setOpenEmail('')} />

      <View className='search-box'>
        <View className='mask-bottom flex-row justify-between'>
          <View className='left-horn'></View>
          <View className='right-horn'></View>
        </View>
        <Search onConfirm={value => setSearch(value)}></Search>
      </View>
      <View className='list-box'>
        <DataList status={status} dispatch={dispatch}>
          {dataList.map(({ data }) => (
            <View onClick={() => {
              // 请求学生的info
              flushUserInfoDetail(data.id, 'studentInfo')
              Taro.navigateTo({ url: '/pages/index/replay/replay-hack-by-android/index' })
            }} className='item flex-row justify-between items-center'>
              <View className='item-left flex-row '>
                <Image className='item-avatar' src={require('@/static/avatar.png')}></Image>
                <View className="item-center flex-col justify-around">
                  <View className='item-title'>{data.name}</View>
                  <View className='item-desc'>{data.code}</View>
                </View>
              </View>
              <Button onClick={e => {
                e.stopPropagation()
                setOpenEmail(data.email)
              }} className='chat-btn' hoverClass='chat-btn-hover' size="mini">联系</Button>
            </View>
          ))}
        </DataList>
      </View>
    </View >
  )
}

export default Index
