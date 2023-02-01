/*
 * @Author: Chenxu
 * @Date: 2023-01-13 10:23:17
 * @LastEditTime: 2023-02-01 15:29:58
 * @Msg: Nothing
 */
import { getStuByTec } from '@/apis/index'
import { DataList, useDataList } from '@/components/data-list'
import SafeArea from '@/components/safearea'
import { Search } from '@/components/search'
import { Tabs } from '@taroify/core'
import { Clear } from '@taroify/icons'
import { Button, Checkbox, Text, View } from '@tarojs/components'
import { FC, useMemo, useState } from 'react'

import './index.scss'

interface DataListBoxProps {
  params?: Object
  type: 'student' | 'teacher'
}

const DataListBox: FC<DataListBoxProps> = ({ params = {}, type }) => {

  const { status, dataList, dispatch } = useDataList({ request: getStuByTec, params })
  // const 

  return (
    <View className="datalist-box">
      <DataList status={status} dispatch={dispatch}>
        {[...dataList, ...dataList, ...dataList, ...dataList, ...dataList].map(({ data }) => (
          <View className="item flex-row">
            <Text className="item-left">刘正</Text>
            <View className="item-center flex-col">
              <View className='item-tag'>正高</View>
              <Text className='item-desc'>清华大学深圳国际研究生院</Text>
            </View>
            <Checkbox className='item-right' color='#3370FF' value={String(Math.random())} checked={true}></Checkbox>
          </View>
        ))}
      </DataList>
    </View>
  )
}

const StudentsGroup: FC = () => {

  const [searchValue, setSearchValue] = useState('')
  const params = useMemo(() => ({ searchValue }), [searchValue])

  return (
    <View className='group-page'>
      <View className='search-box flex-row items-center'>
        <View style={{ flex: 1 }}>
          <Search onConfirm={value => setSearchValue(value)}></Search>
        </View>
      </View>

      <Tabs onChange={() => setSearchValue('')} className='tabs-custom'>
        <Tabs.TabPane title="教师列表">
          <DataListBox type="teacher" params={params} />
        </Tabs.TabPane>
        <Tabs.TabPane title="学生列表">
          <DataListBox type="student" params={params} />
        </Tabs.TabPane>
      </Tabs>

      <View className='bottom-info'>
        <View className='flex-row items-center justify-between'>
          <View className='bottom-left flex-row items-center'>
            <Text className='bottom-text'>已选5位老师，3位学生</Text>
            <Clear color='#93B3FF' />
          </View>
          <Button className='bottom-right' hoverClass='bottom-right-hover' size="default">完成</Button>
        </View>
        <SafeArea />
      </View>
      <SafeArea />
    </View>
  )
}

export default StudentsGroup
