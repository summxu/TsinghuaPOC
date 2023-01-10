/*
 * @Author: Chenxu
 * @Date: 2022-12-30 10:24:55
 * @LastEditTime: 2023-01-10 17:23:03
 * @Msg: Nothing
 */
import { View, Image, Input } from "@tarojs/components";
import { FC, useState } from "react";
import "./index.scss";

export const Search: FC<{ onConfirm: (value: string) => void }> = ({ onConfirm }) => {

  const [value, setValue] = useState<string>('')

  return (
    <View className="search flex-row items-center">
      <Image className="search-icon" src={require('@/static/search/search-icon.png')}></Image>
      <Input type="text" value={value} onInput={e => setValue(e.detail.value)} onConfirm={e => onConfirm(e.detail.value)} className="search-inner" placeholder="搜索"></Input>
      <Image onClick={() => {
        setValue('')
        onConfirm('')
      }} className="clear-icon" src={require('@/static/search/clear.png')}></Image>
    </View>
  )
}