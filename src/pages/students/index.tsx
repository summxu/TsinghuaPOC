/*
 * @Author: Chenxu
 * @Date: 2023-01-10 15:41:54
 * @LastEditTime: 2023-01-11 15:48:06
 * @Msg: Nothing
 */
import { Search } from '@/components/search'
import Button from '@taroify/core/button/button'
import { View } from '@tarojs/components'
import { FC, useState } from 'react'
import { Plus } from "@taroify/icons"

import './index.scss'

const Students: FC = () => {

  const [searchValue, setSearchValue] = useState('')

  return (
    <View className='students-page'>
      <View className='search-box flex-row items-center'>
        <View className='search-left'>
          <Search onConfirm={value => setSearchValue(value)}></Search>
        </View>
        <Button className='create-group-btn' hoverClass='create-group-btn-hover'><Plus /> 建群</Button>
      </View>
    </View>
  )
}

export default Students
