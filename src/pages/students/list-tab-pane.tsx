/*
 * @Author: Chenxu
 * @Date: 2023-01-12 09:44:26
 * @LastEditTime: 2023-01-12 14:15:01
 * @Msg: Nothing
 */
import { getAllYanXi } from "@/apis/index";
import { DataList, useDataList } from "@/components/data-list";
import { TimeLine } from "@/components/time-line";
import { Button, Image, View } from "@tarojs/components";
import { FC, useMemo } from "react";

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

export default ListTabPane