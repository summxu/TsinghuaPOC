/*
 * @Author: Chenxu
 * @Date: 2022-12-29 10:44:32
 * @LastEditTime: 2023-01-30 16:11:27
 * @Msg: Nothing
 */
import Taro from "@tarojs/taro";
/**
 * @description 获取当前页url
 */
export const getCurrentPageUrl = () => {
  let pages = Taro.getCurrentPages()
  let currentPage = pages[pages.length - 1]
  let url = currentPage.route
  return url
}

export const pageToLogin = () => {
  let path = getCurrentPageUrl() as string
  if (!path.includes('login')) {
    Taro.navigateTo({
      url: "/pages/login/index"
    });
  }
}

export const pageToIndex = () => {
  let path = getCurrentPageUrl() as string
  if (!path.includes('pages/index/index')) {
    Taro.switchTab({
      url: "/pages/index/index"
    });
  }
}

export const pageToReplay = () => {
  let path = getCurrentPageUrl() as string
  if (!path.includes('pages/index/replay/index')) {
    Taro.switchTab({
      url: "/pages/index/replay/index"
    });
  }
}
