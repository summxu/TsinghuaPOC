/*
 * @Author: Chenxu
 * @Date: 2022-12-29 13:30:27
 * @LastEditTime: 2023-01-11 17:45:35
 * @Msg: Nothing
 */
import Taro from "@tarojs/taro";
import { createContext, Dispatch, FC, useContext, useEffect, useReducer } from "react";
import { feishuOpenIDLogin, userInfo } from "../apis";

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
  initLogin?: boolean
}

const userState: Partial<UserState> = {}

const userContext = createContext<UserContext>({
  state: userState,
  dispatch: () => { },
});

export const UserProvider: FC = (props) => {

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
export const useUserReduce = ({ isRefresh = false, initLogin = false }: UserReduce = {}) => {

  const { state, dispatch } = useContext(userContext)

  const flushUserInfo = async () => {
    try {
      const { data } = await userInfo()
      dispatch({ type: 'INIT', payload: data })
      return data
    } catch (error) {
      console.log(error)
    }
  }

  // 统一登录后的操作
  const loginInitHandle = async (token: string) => {
    Taro.setStorageSync('Authorization', token)
    Taro.redirectTo({ url: '/pages/index/index' })
  }

  const loginHandle = () => {
    if (Taro.getStorageSync('Authorization')) {
      flushUserInfo()
      return
    }
    tt.login({
      async success({ code }) {
        try {
          const { token } = await feishuOpenIDLogin({ code })
          loginInitHandle(token)
        } catch (error) {
          Taro.redirectTo({ url: '/pages/login/index' })
        }
      },
      fail(res) {
        console.log(`login fail: ${JSON.stringify(res)}`);
      }
    });
  }

  const logoutHandle = () => {
    dispatch({ type: 'CLEAR' })
    Taro.removeStorageSync('Authorization')
    Taro.redirectTo({ url: '/pages/login/index' })
  }

  if (isRefresh) {
    useEffect(() => { flushUserInfo() }, [])
  }

  if (initLogin) {
    useEffect(() => { loginHandle() }, [])
  }

  return { state, dispatch, logoutHandle, loginHandle, loginInitHandle }
};