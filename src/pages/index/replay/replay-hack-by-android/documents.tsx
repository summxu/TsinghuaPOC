/*
 * @Author: Chenxu
 * @Date: 2023-01-12 17:30:24
 * @LastEditTime: 2023-02-08 10:46:14
 * @Msg: Nothing
 */
import { delDocs, getDocs, saveDocument } from "@/apis/index";
import { baseApiUrl, envVersion } from "@/apis/request";
import { useUserReduce } from "@/src/provider/user-provider";
import { getFileNameExt, getSubFileName } from "@/utils/index";
import { Button, Empty, Image, SwipeCell } from "@taroify/core";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { FC, useEffect, useState } from "react";
import "./index.scss";

export const IndexDocuments: FC<{ lx: '1' | '2' }> = ({ lx }) => {

  const { state: userInfo } = useUserReduce()
  const [dataList, setDataList] = useState<{ data: any }[]>([])

  const uploadHandle = async (path) => {
    return Taro.uploadFile({
      url: `${baseApiUrl[envVersion]}/blobs/fileupload`,
      filePath: path,
      name: 'file',
      formData: { public: 'true' },
    });
  }

  // 新建答辩表数据
  const saveDocumentsHandle = async (resData) => {
    try {
      const datas = resData.map(item => JSON.parse(item.data))
      const uploadQueue: Promise<any>[] = []
      datas.forEach(item => {
        uploadQueue.push(saveDocument({
          student_id: userInfo.studentInfo?.id!,
          lx,
          code: String(item.id),
          name: getSubFileName(item.name) + '.' + getFileNameExt(item.name),
          uploaded_file_public_id: item.id
        }))
      })
      return Promise.all(uploadQueue)
    } catch (error) {
      console.log(error)
    }
  }

  const getDocsHandle = async () => {
    try {
      const { result } = await getDocs(lx, userInfo.studentInfo?.id!)
      setDataList(result.items)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDocsHandle()
  }, [userInfo.studentInfo])

  const delDocsHandle = (id: number) => {
    Taro.showModal({
      content: '确定要删除吗？',
      showCancel: true,
      success: async ({ confirm }) => {
        if (confirm) {
          await delDocs(id)
          getDocsHandle()
        }
      }
    })
  }

  const openDocument = (url: string) => {
    Taro.showLoading({ title: '正在打开文档...', mask: true })
    Taro.downloadFile({
      url: baseApiUrl[envVersion] + url,
      success: function (res) {
        Taro.hideLoading()
        var filePath = res.tempFilePath
        Taro.openDocument({
          filePath: filePath,
          fail(res) {
            Taro.showToast({ icon: 'none', title: '不支持的文件格式' })
          },
        })
      },
      fail(res) {
        Taro.showToast({ icon: 'none', title: '不支持的文件格式' })
      },
    })
  }

  const chooseFileHandle = () => {
    tt.filePicker({
      maxNum: 1,
      async success(res) {
        const uploadQueue: Promise<any>[] = []
        res.list.forEach(item => {
          uploadQueue.push(uploadHandle(item.path))
        })
        Taro.showLoading({ title: '上传中...', mask: true })
        try {
          const fileRes = await Promise.all(uploadQueue)
          await saveDocumentsHandle(fileRes)
          Taro.showToast({ icon: 'success', title: '上传成功' })
          getDocsHandle()
        } catch (error) {
          Taro.showToast({ icon: 'error', title: '上传失败' })
          console.log(error)
        }
        // Taro.hideLoading()
      }
    })
  }

  return (
    <View className="index-documents">
      <View className="title">相关文档</View>

      {
        dataList.length ?
          dataList.map(item => (
            <SwipeCell catchMove={false} onClick={() => openDocument(item.data['uploaded_file_public_id.download_url'])} key={item.data.id}>
              <View className="mumber-items">
                <View className="doc-tag">{getFileNameExt(item.data['uploaded_file_public_id.origin_filename'])}</View>
                <View className="doc-name">{getSubFileName(item.data['uploaded_file_public_id.origin_filename'])}</View>
              </View>
              {
                userInfo.role === 'teacher' &&
                <SwipeCell.Actions side="right">
                  <Button onClick={() => delDocsHandle(item.data.id)} style={{ height: '100%' }} variant="contained" shape="square" color="danger">删除</Button>
                </SwipeCell.Actions>
              }
            </SwipeCell>
          )) :
          <Empty >
            <Empty.Image style={{ width: '107px', height: '70px' }} src={require('@/static/empty.png')} />
            <Empty.Description>内容为空</Empty.Description>
          </Empty>
      }

      {userInfo.role === 'teacher' && <Image onClick={chooseFileHandle} className="fab-btn" src={require('@/static/fab.png')}></Image>}

    </View>
  )

}