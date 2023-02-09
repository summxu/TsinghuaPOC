/*
 * @Author: Chenxu
 * @Date: 2022-12-28 13:26:25
 * @LastEditTime: 2023-02-09 10:32:16
 * @Msg: Nothing
 */
import { View, WebView } from '@tarojs/components'
import { useRouter } from '@tarojs/taro'
import { FC, useEffect, useState } from 'react'

import './index.scss'

const WebViewPage: FC = () => {
  const [url, setUrl] = useState('')
  const { params } = useRouter()
  useEffect(() => { setUrl(params.url!) }, [params])
  return (
    <View className='webview-box'>
      <WebView src={url} />
    </View>
  )
}

export default WebViewPage
