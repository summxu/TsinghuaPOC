/*
 * @Author: Chenxu
 * @Date: 2022-12-29 13:30:27
 * @LastEditTime: 2022-12-29 16:29:20
 * @Msg: Nothing
 */
import { createContext, Dispatch, FC, useContext, useReducer } from "react";

interface UserState {
  username: string
  userid: number
  avatar: string
}

interface UserDispatch {
  FLUSH
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
      case 'FLUSH':
        return {
          ...preState,
          ...payload
        };
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

export const useUserReduce = () => {
  return useContext(userContext)
};


export const hahaha = 123