<!--
 * @Author: Chenxu
 * @Date: 2022-12-29 17:00:50
 * @LastEditTime: 2023-02-14 16:02:32
 * @Msg: Nothing
-->
项目启动

yarn dev:lark

坑：

1. 飞书小程序不能使用 Taro v3.5+ 和 react18 https://github.com/NervJS/taro/issues/12950（已解决）
2. 使用 tt.removeTabBarItem 移除 TabbarItem 后，IOS可以正常使用 Taro.navgationTo 跳转页面，Android不行。
   解决办法是，复制了一份一模一样的 Tabbar 页面当做普通页面，使用 Taro.navgationTo 跳转copy后的页面。
   其他的办法都试了，不行，只能这样了。
   所以，修改了 pages/progress/index、pages/index/replay/index 两个页面后，记得复制一下。

BUG:

1. 就是没登陆（或者token失效）的时候，通用接口不会返回401或者特殊的状态表示(通过判断 errMsg 完成)
2. userInfo 接口中没有表示用户角色的字段