/*
 * @Author: Chenxu
 * @Date: 2023-01-10 15:41:54
 * @LastEditTime: 2023-01-13 11:03:09
 * @Msg: Nothing
 */
import { Search } from '@/components/search'
import { View, Button, Image } from '@tarojs/components'
import { FC, useMemo, useState } from 'react'
import { Plus } from "@taroify/icons"
import { Tabs } from '@taroify/core'
import Taro from '@tarojs/taro'
import { DataList, useDataList } from '@/components/data-list'
import { getAllYanXi } from '@/apis/index'
import { TimeLine } from '@/components/time-line'

import './index.scss'

interface ListTabPanePorps {
  params?: Object
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


const ListTabPane: FC<ListTabPanePorps> = ({ params = {} }) => {
  const { status, dataList, dispatch } = useDataList({ request: getAllYanXi, params })

  return (
    <View className="datalist-box">
      <DataList status={status} dispatch={dispatch}>
        {dataList.map(({ data }) => (
          <View className="item">
            <View className='flex-row justify-between items-center'>
              <View className='item-left flex-row '>
                <Image className='item-avatar' src={require('@/static/avatar.png')}></Image>
                <View className="item-center flex-col justify-around">
                  <View className='item-title'>{data.name}</View>
                  <View className='item-desc'>{data.code}</View>
                </View>
              </View>
              <Button className='chat-btn' hoverClass='chat-btn-hover' size="mini">联系</Button>
            </View>

            <View className="timeline-box">
              <TimeLine data={TimeLineData} active={2}></TimeLine>
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
  const params = useMemo(() => ({ searchValue, tabsType }), [searchValue, tabsType])

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
      </Tabs>
    </View>
  )
}

export default Students
