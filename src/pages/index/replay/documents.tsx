/*
 * @Author: Chenxu
 * @Date: 2023-01-12 17:30:24
 * @LastEditTime: 2023-01-12 17:43:32
 * @Msg: Nothing
 */
import { SwipeCell, Button, Image } from "@taroify/core";
import { View, Text } from "@tarojs/components";
import { FC } from "react";
import "./index.scss";

export const IndexDocuments: FC = () => {

  return (
    <View className="index-documents">
      <View className="title">相关文档</View>

      <SwipeCell>
        <View className="mumber-items">
          <View className="doc-tag">doc</View>
          <View className="doc-name">生物医药的相关研究参考文献</View>
        </View>
        <SwipeCell.Actions side="right">
          <Button style={{ height: '100%' }} variant="contained" shape="square" color="danger">删除</Button>
        </SwipeCell.Actions>
      </SwipeCell>

      <Image className="fab-btn" src={require('@/static/fab.png')}></Image>

    </View>
  )

}