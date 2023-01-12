/*
 * @Author: Chenxu
 * @Date: 2023-01-10 15:41:54
 * @LastEditTime: 2023-01-12 13:16:23
 * @Msg: Nothing
 */
import { Search } from '@/components/search'
import { View, Button } from '@tarojs/components'
import { FC, useMemo, useState } from 'react'
import { Plus } from "@taroify/icons"

import './index.scss'
import { Tabs } from '@taroify/core'
import ListTabPane from './list-tab-pane'

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
        <Button className='create-group-btn' hoverClass='create-group-btn-hover'><Plus /> 建群</Button>
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
