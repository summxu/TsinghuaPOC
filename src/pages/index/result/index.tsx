/*
 * @Author: Chenxu
 * @Date: 2023-02-09 09:51:56
 * @LastEditTime: 2023-02-09 10:55:41
 * @Msg: Nothing
 */

import { getLwchachong } from "@/apis/index";
import { useUserReduce } from "@/src/provider/user-provider";
import { Cell } from "@taroify/core";
import { Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { FC, useEffect, useState } from "react";
import "./index.scss";

const Result: FC = () => {

  const { state: userInfo } = useUserReduce()

  const [data, setData] = useState<any>({})
  const getLwchachongHandle = async () => {
    try {
      const { result } = await getLwchachong(userInfo.studentInfo?.id!)
      setData(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { getLwchachongHandle() }, [])

  const clipboardHandle = (data) => {
    Taro.setClipboardData({
      data,
      success: () => {
        Taro.showToast({ title: '内容已复制到剪切板' })
      }
    })
  }

  const toWebViewHandle = (url) => {
    Taro.navigateTo({
      url: '/pages/webview/index?url=' + url,
    })
  }

  return (
    <View className="result">
      <Cell onClick={() => clipboardHandle(data.duplicatepercentage)} title="复写率">{data.duplicatepercentage}</Cell>
      <Cell title="报告下载地址">
        <Text onClick={() => toWebViewHandle(data.paperdownurl)} className="link-down">{data.paperdownurl}</Text>
      </Cell>
      <Cell onClick={() => clipboardHandle(data.paperword)} title="论文字数">{data.paperword}</Cell>
      <Cell onClick={() => clipboardHandle(data.paichupercentage)} title="他引率">{data.paichupercentage}</Cell>
      <Cell title="在线报告地址">
        <Text onClick={() => toWebViewHandle(data.paperviewurl)} className="link-down">{data.paperviewurl}</Text>
      </Cell>
      <Cell onClick={() => clipboardHandle(data.ownpercentage)} title="自写率">{data.ownpercentage}</Cell>
      <Cell onClick={() => clipboardHandle(data.percentage)} title="相似率">{data.percentage}</Cell>
      <Cell onClick={() => clipboardHandle(data.paperguid)} title="报告编号">{data.paperguid}</Cell>
      <Cell onClick={() => clipboardHandle(data.quotepercentage)} title="引用率">{data.quotepercentage}</Cell>
      <Cell onClick={() => clipboardHandle(data.selfyypercentage)} title="自引率">{data.selfyypercentage}</Cell>
      <Cell onClick={() => clipboardHandle(data.authorpercentage)} title="专业术语率">{data.authorpercentage}</Cell>
    </View>
  )
}

export default Result