/*
 * @Author: Chenxu
 * @Date: 2023-01-10 15:41:54
 * @LastEditTime: 2023-02-14 15:52:40
 * @Msg: Nothing
 */
import { getStuByTec } from '@/apis/index'
import { DataList, useDataList } from '@/components/data-list'
import { Search } from '@/components/search'
import { TimeLine } from '@/components/time-line'
import { Tabs } from '@taroify/core'
import { Plus } from "@taroify/icons"
import { Button, Image, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { FC, useMemo, useState } from 'react'

import { OpenEmail } from '@/components/open-email'
import './index.scss'
import { useUserReduce } from '@/src/provider/user-provider'

interface ListTabPanePorps {
  params: {
    searchValue: string
    tabsType?: number
  }
}

const TimeLineData = [{
  text: '入学'
}, {
  text: '培养计划制定'
}, {
  text: '培养计划完成'
}, {
  text: '开题'
}, {
  text: '中期'
}, {
  text: '学术活动'
}, {
  text: '答辩'
}]


const ListTabPane: FC<ListTabPanePorps> = ({ params }) => {
  const { status, dataList, dispatch } = useDataList({ request: getStuByTec, params })
  const [openEmail, setOpenEmail] = useState('')
  const { flushUserInfoDetail } = useUserReduce({ isRefresh: true })
  const goToPage = (tabsType) => {
    // if (tabsType === 1) {
    //   Taro.navigateTo({ url: '/pages/progress/entrance/index' })
    // }
    // if (tabsType === 2) {
    //   Taro.navigateTo({ url: '/pages/progress/plan/index' })
    // }
    // if (tabsType === 3) {
    //   Taro.navigateTo({ url: '/pages/progress/planover/index' })
    // }

    Taro.navigateTo({ url: '/pages/progress/progress-hack-by-android/index' })
  }
  return (
    <View className="datalist-box">

      <OpenEmail openEmail={openEmail} onClose={() => setOpenEmail('')} />

      <DataList status={status} dispatch={dispatch}>
        {dataList.map(({ data }) => (
          <View onClick={() => {
            flushUserInfoDetail(data.id, 'studentInfo')
            goToPage(Number(data.gyxxjd))
          }} className="item">
            <View className='flex-row justify-between items-center'>
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

            <View className="timeline-box">
              <TimeLine data={TimeLineData} active={Number(data.gyxxjd)}></TimeLine>
            </View>
          </View>
        ))}
      </DataList>
    </View>
  )
}


const Students: FC = () => {

  const [searchValue, setSearchValue] = useState('')
  const [tabsType, setTabsType] = useState(0)
  const { state: userInfo } = useUserReduce({ isRefresh: true })

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
      gyxxjd: tabsType,
      tecid: tecid(),
      yuanxiidName: yuanxiidName()
    }
  }, [searchValue, tabsType])

  return (
    <View className='students-page'>
      <View className='search-box flex-row items-center'>
        <View className='search-left'>
          <Search onConfirm={value => setSearchValue(value)}></Search>
        </View>
        <Button onClick={() => Taro.navigateTo({ url: '/pages/students/group/index' })} className='create-group-btn' hoverClass='create-group-btn-hover'><Plus /> 建群</Button>
      </View>

      <Tabs onChange={(value: number) => setTabsType(value)} className='tabs-custom'>
        <Tabs.TabPane value={0} title="全部"><ListTabPane params={params}></ListTabPane></Tabs.TabPane>
        <Tabs.TabPane value={1} title="入学"><ListTabPane params={params}></ListTabPane></Tabs.TabPane>
        <Tabs.TabPane value={2} title="培养计划制定"><ListTabPane params={params}></ListTabPane></Tabs.TabPane>
        <Tabs.TabPane value={3} title="培养计划完成"><ListTabPane params={params}></ListTabPane></Tabs.TabPane>
        <Tabs.TabPane value={4} title="开题"><ListTabPane params={params}></ListTabPane></Tabs.TabPane>
        <Tabs.TabPane value={5} title="中期"><ListTabPane params={params}></ListTabPane></Tabs.TabPane>
        <Tabs.TabPane value={6} title="学术活动"><ListTabPane params={params}></ListTabPane></Tabs.TabPane>
        <Tabs.TabPane value={7} title="答辩"><ListTabPane params={params}></ListTabPane></Tabs.TabPane>
      </Tabs>
    </View>
  )
}

export default Students
