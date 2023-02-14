/*
 * @Author: Chenxu
 * @Date: 2023-02-14 12:21:20
 * @LastEditTime: 2023-02-14 12:22:04
 * @Msg: Nothing
 */
export const teacherTabList = [{
  index: 0,
  pagePath: 'pages/index/index',
  text: '答辩',
  light: {
    iconPath: './static/index.png',
    selectedIconPath: './static/index-selected.png',
  },
  dark: {
    iconPath: './static/index.png',
    selectedIconPath: './static/index-selected.png',
  },
  success(res) {
    console.log(JSON.stringify(res));
  },
  fail(res) {
    console.log(`addTabBarItem fail: ${JSON.stringify(res)}`);
  }
}, {
  index: 1,
  pagePath: 'pages/students/index',
  text: '我的学生',
  light: {
    iconPath: './static/students.png',
    selectedIconPath: './static/students-selected.png',
  },
  dark: {
    iconPath: './static/students.png',
    selectedIconPath: './static/students-selected.png',
  },
  success(res) {
    console.log(JSON.stringify(res));
  },
  fail(res) {
    console.log(`addTabBarItem fail: ${JSON.stringify(res)}`);
  }
}]

export const studentTabList = [{
  index: 0,
  pagePath: 'pages/index/replay/index',
  text: '答辩',
  light: {
    iconPath: './static/index.png',
    selectedIconPath: './static/index-selected.png',
  },
  dark: {
    iconPath: './static/index.png',
    selectedIconPath: './static/index-selected.png',
  },
  success(res) {
    console.log(JSON.stringify(res));
  },
  fail(res) {
    console.log(`addTabBarItem fail: ${JSON.stringify(res)}`);
  }
}, {
  index: 1,
  pagePath: 'pages/progress/index',
  text: '学习进度',
  light: {
    iconPath: './static/progress.png',
    selectedIconPath: './static/progress-selected.png',
  },
  dark: {
    iconPath: './static/progress.png',
    selectedIconPath: './static/progress-selected.png',
  },
  success(res) {
    console.log(JSON.stringify(res));
  },
  fail(res) {
    console.log(`addTabBarItem fail: ${JSON.stringify(res)}`);
  }
}]

export const addTeacherTabs = () => {
  teacherTabList.forEach(item => {
    tt.addTabBarItem(item)
  })
}

export const addStudentTabs = () => {
  studentTabList.forEach(item => {
    tt.addTabBarItem(item)
  })
}