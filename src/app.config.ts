/*
 * @Author: Chenxu
 * @Date: 2022-12-28 13:26:25
 * @LastEditTime: 2023-01-10 13:46:55
 * @Msg: Nothing
 */
export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/login/index',
    'pages/office/index',
    'pages/mine/index'
  ],
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#3723B9',
    backgroundColor: '#F6F7F9',
    navigationBarTitleText: '清华SIGS答辩助手',
    navigationBarTextStyle: 'white',
    enablePullDownRefresh: false
  },
  tabBar: {
    backgroundColor: '#ffffff',
    selectedColor: '#418CFF',
    color: '#666666',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './static/index.png',
        selectedIconPath: './static/index-selected.png'
      },
      {
        pagePath: 'pages/office/index',
        text: '办事',
        iconPath: './static/office.png',
        selectedIconPath: './static/office-selected.png'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: './static/my.png',
        selectedIconPath: './static/my-selected.png'
      }]

  },
})
