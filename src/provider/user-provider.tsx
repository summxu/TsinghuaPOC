/*
 * @Author: Chenxu
 * @Date: 2022-12-29 13:30:27
 * @LastEditTime: 2023-02-01 17:26:16
 * @Msg: Nothing
 */
import { pageToIndex, pageToLogin, pageToReplay } from "@/utils/pages";
import Taro from "@tarojs/taro";
import { createContext, Dispatch, FC, PropsWithChildren, useContext, useEffect, useReducer } from "react";
import { feishuOpenIDLogin, getStudentInfo, getTeacherInfo, userInfo, userInfoDetail } from "../apis";

export interface UserState {
  uid: number
  email: string
  name: string
  is_dev: boolean
  avatar: string
  can_code_examples: boolean
  default_identity_id: number
  display_name: string
  guest: boolean
  impersonator_uid: number
  is_impersonating: boolean
  nickname: string
  reset_password: { need: boolean, reason: string }
  user_name: string
  role: 'student' | 'teacher'
  fsopen_id: string
  studentInfo: {
    id: number
    pycc: '01' | '02'
    code: number
    'yuanxi_id.name': string
    'dsxx_id.name': string
    dbsj: string
    dbwy_id: string
    gyxxjd: string
    sfyyhy: string
    sfzh: string
    name: string
  }
  teacherInfo: {
    sfzh: string
    id: number
    'yuanxi_id.name': string
  }
}

interface UserDispatch {
  INIT
  CLEAR
}

interface UserContext {
  state: Partial<UserState>;
  dispatch: Dispatch<{
    type: keyof UserDispatch;
    payload?: Partial<UserState>;
  }>;
}

interface UserReduce {
  isRefresh?: boolean
}

const userState: Partial<UserState> = {}

const userContext = createContext<UserContext>({
  state: userState,
  dispatch: () => { },
});

export const UserProvider: FC<PropsWithChildren> = (props) => {

  const reducer = (preState: UserState, action: {
    type: keyof UserDispatch;
    payload: Partial<UserState>;
  }) => {
    const { type, payload } = action;
    switch (type) {
      default:
        return preState;
      case 'INIT':
        return { ...preState, ...payload }
      case 'CLEAR':
        return {};
    }
  }

  const [state, dispatch] = useReducer(reducer, userState);

  return <userContext.Provider value={{ state, dispatch }}>
    {props.children}
  </userContext.Provider>
}

// isRefresh 是否刷新 userInfo 请求
export const useUserReduce = ({ isRefresh = false }: UserReduce = {}) => {

  const { state, dispatch } = useContext(userContext)

  const flushUserInfo = async () => {
    try {
      const { data } = await userInfo()
      dispatch({ type: 'INIT', payload: data })
      flushUserInfoDetailBefore(data.uid)
    } catch (error) {
      console.log(error)
    }
  }

  const flushUserInfoDetail = async (stuidortecid: number, type?: 'studentInfo' | 'teacherInfo') => {
    if (type === 'studentInfo') {
      const { result: studentData } = await getStudentInfo(stuidortecid)
      dispatch({ type: 'INIT', payload: { [type]: studentData.data as any } })
    }

    if (type === 'teacherInfo') {
      const { result: teacherData } = await getTeacherInfo(stuidortecid)
      dispatch({ type: 'INIT', payload: { [type]: teacherData.data as any } })
    }
  }

  const flushUserInfoDetailBefore = async (uid: number) => {
    const { result } = await userInfoDetail(uid)
    const data = result.data
    if (data) {
      const role = data['teacher_id.id'] ? 'teacher' : 'student'
      const type = role + 'Info' as 'studentInfo' | 'teacherInfo'
      dispatch({
        type: 'INIT', payload: {
          role,
          fsopen_id: data.fsopen_id
        }
      })
      flushUserInfoDetail(data['teacher_id.id'] || data['student_id.id'], type)
    }
    return data
  }

  // 统一登录后的操作
  const loginInitHandle = async (token: string) => {
    Taro.setStorageSync('Authorization', token)
    tt.showTabBar()

    // 再次同步请求一遍 userInfo
    const { data } = await userInfo()
    const userInfoData = await flushUserInfoDetailBefore(data.uid)
    if (userInfoData) {
      const role = userInfoData['teacher_id.id'] ? 'teacher' : 'student'
      console.log(role)
      if (role === 'teacher') {
        pageToIndex()
        tt.removeTabBarItem({ tag: 'pages/progress/index' })
        tt.removeTabBarItem({ tag: 'pages/index/replay/index' })
      } else {
        pageToReplay()
        tt.removeTabBarItem({ tag: 'pages/students/index' })
        tt.removeTabBarItem({ tag: 'pages/index/index' })
      }
    }

  }

  const InitLogin = () => {
    const localToken = Taro.getStorageSync('Authorization')
    if (localToken) {
      flushUserInfo()
      loginInitHandle(localToken)
      return
    }
    tt.login({
      async success({ code }) {
        try {
          const { token } = await feishuOpenIDLogin({ code })
          loginInitHandle(token)
        } catch (error) {
          logoutHandle()
        }
      },
      fail(res) {
        console.log(`login fail: ${JSON.stringify(res)}`);
      }
    });
  }

  const logoutHandle = () => {
    tt.hideTabBar()
    dispatch({ type: 'CLEAR' })
    Taro.removeStorageSync('Authorization')
    pageToLogin()
  }

  if (isRefresh) {
    useEffect(() => { flushUserInfo() }, [])
  }

  return { state, dispatch, logoutHandle, InitLogin, loginInitHandle, flushUserInfoDetail }
};