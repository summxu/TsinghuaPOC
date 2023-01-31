/*
 * @Author: Chenxu
 * @Date: 2022-12-29 13:30:27
 * @LastEditTime: 2023-01-31 17:01:27
 * @Msg: Nothing
 */
import { pageToIndex, pageToLogin, pageToReplay } from "@/utils/pages";
import Taro, { useRouter } from "@tarojs/taro";
import { createContext, Dispatch, FC, PropsWithChildren, useContext, useEffect, useReducer } from "react";
import { feishuOpenIDLogin, userInfo, userInfoDetail } from "../apis";

export interface UserState {
  uid: number | undefined
  stuid: number | undefined
  tecid: number | undefined
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
  sfzh: string
  pycc: '01' | '02'
  fsopen_id: string
  code: number
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
    payload?: Partial<UserState>;
  }) => {
    const { type, payload } = action;
    switch (type) {
      default:
        return preState;
      case 'INIT':
        return payload as Partial<UserState> // 断言 init 的情况下一定会传 payload
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
      const { result } = await userInfoDetail(data.uid!)
      dispatch({
        type: 'INIT', payload: {
          ...data,
          email: result.data!.email,
          stuid: result.data!['student_id.id'] as unknown as number | undefined,
          tecid: result.data!['teacher_id.id'] as unknown as number | undefined,
          role: result.data!['teacher_id.id'] ? 'teacher' : 'student',
          sfzh: result.data!['student_id.sfzh'],
          code: result.data!['student_id.code'],
          pycc: result.data!['student_id.pycc'] as '01' | '02',
          fsopen_id: result.data!.fsopen_id,
        }
      })
      return data
    } catch (error) {
      console.log(error)
    }
  }

  // 统一登录后的操作
  const loginInitHandle = async (token: string) => {
    Taro.setStorageSync('Authorization', token)
    tt.showTabBar()
    if (state.role === 'teacher') {
      pageToIndex()
      tt.removeTabBarItem({ tag: 'pages/progress/index' })
    } else {
      pageToReplay()
      tt.removeTabBarItem({ tag: 'pages/students/index' })
      tt.removeTabBarItem({ tag: 'pages/index/index' })
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

  return { state, dispatch, logoutHandle, InitLogin, loginInitHandle }
};